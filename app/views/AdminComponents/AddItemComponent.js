import React, { Component } from 'react';
import { Image, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Thumbnail, Text, Right, Button, Icon, Switch, Row, Fab, StyleProvider, Form, Item, H2, Input, Textarea, Toast, View } from 'native-base';
import platform from '../../native-base-theme/variables/platform';
import getTheme from '../../native-base-theme/components';
import { CustomCachedImage } from 'react-native-img-cache';
import PhotoGrid from 'react-native-photo-grid';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import styles from '../../styles/AddItemStyle'
import firebase from 'react-native-firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';
import update from 'immutability-helper';
import Tags from "react-native-tags";
import AnimatedComponent from '../AnimatedComponent';
import ImagePicker from 'react-native-image-crop-picker';

AnimatableContainer = Animatable.createAnimatableComponent(Container);

var db = firebase.database();
var storage = firebase.storage();
const fs = firebase.firestore();

class AddItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            tags:[],
            images:[],
            progressDialog: false,
            progressText: 'Saving Information...',
            key: '',
            errorText: '',
            error: null,
            resId: this.props.naviagtion.getParam('resId', '')
        };
    }

    renderGridHeader(){
        return(
            <Text style={styles.text}>Images preview </Text>
        )
    }

    removeImage(){
        var arr = this.state.images;
        arr.splice(id, 1);
        this.setState({images: arr})
        Toast.show({
            text: 'Picture removed.',
        })
    }

    clearImages(){
        this.setState({images: []})
    }

    renderGridImages(item, itemSize){
        var that = this;
        var id = item.id;
        return(
            <ImageBackground
                style = {{ width: itemSize, height: itemSize, flex: 1}}
                key = { item.id }
                resizeMode = "cover"
                source = {{ uri: `data:${item.mime};base64,${item.src}`}}
            >
                <TouchableOpacity 
                    style={{backgroundColor: '#2226', width: itemSize, height: itemSize, justifyContent: 'center', alignItems: 'center'}} 
                    onPress={() => { that.removeImage(id)
                        // Alert.alert('Remove picture', 'Are you sure you want to remove this picture?', [
                        //     {
                        //         text: 'Remove',
                        //         onPress: () => this.removeImage(item.id),
                        //         style: 'cancel'
                        //     },
                        //     {
                        //         text: 'Cancel',
                        //         onPress: () => console.log('Cancel Pressed'),
                        //     },
                        // ])
                    }}
                >
                    {/* <Icon name='trash' style={{color: platform.brandLight}}/> */}
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    newUpload(){
        var arr = this.state.images;
        var that = this;
        ImagePicker.openPicker({
            includeBase64: true
        }).then(image => {
            arr.push({
                id: arr.length,
                src: image.data,
                mime: image.mime,
                path: image.path
            })
            that.setState({images: arr})
        })
    }

    render() {
        return (
        <AnimatableContainer animation='fadeInLeftBig' duration={1000} >
            <StyleProvider style={getTheme(platform)}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name={'menu'}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Add a new item
                        </Title>
                    </Body>
                </Header>
            </StyleProvider>
            <StyleProvider style={getTheme(platform)}>
                <Content style={styles.body} contentContainerStyle={styles.container}>
                    <H2 style={styles.text}>
                        Add a new food
                    </H2>
                    <Item regular style={[styles.formItem, {borderColor: platform.brandPrimary}]}>
                        <Input placeholder='Name'/>
                    </Item>
                    <Textarea rowSpan={5} bordered placeholder="Description" style={[styles.formItem, {borderColor: platform.brandPrimary}]} />
                    <Text style={styles.text}>#tags</Text>
                    <Tags
                        textInputProps={{
                            placeholder: "Add a tag"
                        }}
                        initialTags={this.state.tags}
                        createTagOnString={[',', '.', ';']}
                        onChangeTags={tags => this.setState({tags: tags})}
                        onTagPress = {
                            (index, tagLabel, event, deleted) =>
                            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                        }
                        containerStyle = {{
                            justifyContent: "center"
                        }}
                        tagTextStyle={styles.tagText}
                        tagContainerStyle={styles.tagContainer}
                        inputStyle={styles.tagContainer}
                    />
                    <Button block info style={styles.formItem} onPress={() => this.newUpload()}>
                        <Text>
                            Add photos
                        </Text>
                    </Button>
                    {
                        this.state.images.length > 0 ?(
                            <PhotoGrid
                                style={styles.formItem}
                                data = { this.state.images }
                                itemsPerRow = { 3 }
                                itemMargin = { 1 }
                                renderHeader = { this.renderGridHeader }
                                renderItem = { this.renderGridImages }
                            />
                        ): (null)
                    }
                    {
                        this.state.images.length > 0 ?(
                            <Button block danger style={styles.formItem} onPress={() => this.clearImages()}>
                                <Text>
                                    Clear all photos
                                </Text>
                            </Button>
                        ): (null)
                    }
                    <Button success block style={styles.formItem} onPress={() => this.verify()}>
                        <Text>
                            Submit
                        </Text>
                    </Button>
                    <ProgressDialog
                        visible={this.state.progressDialog}
                        title="Saving item details"
                        message={this.state.progressText}
                    />
                </Content>
            </StyleProvider>
        </AnimatableContainer>
        );
    }
    verify() {
        var s = this.state;
        if (s.name === '' || s.description === '' || s.tags.length === 0 || s.images.length === 0) {
            Toast.show({
                text: 'Name, description, a tag and a picture are compulsory',
                duration: 3000
            })
        } else {
            this.setState({
                progressDialog: true
            })
            this.proceed()
        }
    }

    proceed(){
        var s = this.state;
        var that = this;
        var imageArr = [];
        var val = {
            name: s.name,
            description: s.description,
            tags: s.tags,
            available: true,
            resId: s.resId
            //TODO: Add restaurant id
        }
        var images = this.state.images
        fs.collection('items').add(val).then(res => {
            that.setState({key: res.id, progressText: 'Uploading images...'})
            images.forEach((item, index, arr) =>{
                storage.ref('items/'+this.state.key+'/image_'+index).putFile(item.path).then(file =>{
                    imageArr.push(file.downloadURL);
                    res.update({images: imageArr}).then(upd => {
                        if (index === images.length-1) {
                            this.uploadSuccess()
                        }
                    })
                }).catch(err => {
                    that.setState({errorText: 'Storage failed\nCheck your connection and try again', error: true})
                    // break;
                    return;
                })
            })
        }).catch(err => {
            that.errorToast(err.message)
        })
        // db.ref('items').push(val).then(res =>{
        //     that.setState({key: res.key, progressText: 'Uploading images...'})
        //     images.forEach((item, index, arr) => {
        //         storage.ref('items/'+this.state.key+'/image_'+index).putFile(item.path).then(file =>{
        //             imageArr.push(file.downloadURL);
        //             res.update({images: imageArr}).then(upd => {
        //                 if (index === images.length-1) {
        //                     this.uploadSuccess()
        //                 }
        //             }).catch(err => {

        //             })
        //         }).catch(err => {
        //             that.setState({errorText: 'Storage failed\nCheck your connection and try again', error: true})
        //             // break;
        //             return;
        //         })
        //     })
        // }).catch(err =>{
        //     that.errorToast(err.message)
        // })
    }

    cleanUpUpload() {
        db.ref('items/' + this.state.key).remove();
        this.uploadDone()
    }

    uploadSuccess() {
        this.uploadDone()
        Toast.show({
            text: 'Details saved successfully',
            type: 'success',
            buttonText: 'Okay',
            duration: 4000
        })
    }

    uploadDone() {
        this.setState({
            progressDialog: false
        })
        this.props.navigation.navigate('Home', {resId: this.state.resId})
    }
}

export default AddItemComponent;
