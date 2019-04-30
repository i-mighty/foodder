import React, { Component } from 'react';
import { Text as RNText, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Content, Left, Icon, Container, Header, StyleProvider, H2, Col ,Textarea, View, Text, Tab, Tabs, Title, TabHeading, Body, Footer, Button, Form, Item, Input, Label, DatePicker, Toast, Row } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import * as Animatable from 'react-native-animatable';
import {withNavigationFocus} from 'react-navigation';
import PhotoGrid from 'react-native-photo-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../../data/Actions';
import styles from '../../styles/AddItemStyle'
import firebase from 'react-native-firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';
import validator from 'validator'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import Display from 'react-native-display';
import Tags from "react-native-tags";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';


AnimatableContainer = Animatable.createAnimatableComponent(Container);

var db = firebase.database();
var storage = firebase.storage();
const fs = firebase.firestore();

class AddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            tags: [],
            images:[],
            address: '',
            page1: true,
            page2: false,
            lat: 9,
            lng: 4,
            mLat: null,
            mLng: null,
            progressDialog: false,
            progressText: 'Saving Information...',
            key: '',
            errorText:'',
            error: null,
            ownerId: this.props.navigation.getParams('ownerId', '')
        };
    }

    componentWillMount(){
        Geolocation.getCurrentPosition((res) => {
            this.setState({
                lat: res.coords.latitude,
                lng: res.coords.longitude,
                mLat: res.coords.latitude,
                mLng: res.coords.longitude
            })
        }, (err) =>{
            Toast.show({
                text: 'Could not get current location: '+err.message,
                type: 'danger'
            })
        },{ enableHighAccuracy: true, timeout: 20000 })
    }

    renderGridHeader(){
        return(
            <Text style={[styles.text, styles.formItem]}>Images preview </Text>
        )
    }

    removeImage(id){
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
                    onPress={() => that.removeImage()}
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
        return(
            this.props.isFocused &&
            <AnimatableContainer animation='fadeInLeftBig' duration={1000}>
                <StyleProvider style={getTheme(platform)}>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name={'menu'}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                Add Restaurant
                            </Title>
                        </Body>
                    </Header>
                </StyleProvider>
                <StyleProvider style={getTheme(platform)}>
                    <Content style={styles.body}>
                        <Display enable={this.state.page1} enter='fadeIn' exit='zoomOut'>
                            <H2 style={styles.text}>
                                Add a new restaurant
                            </H2>
                            <Item regular style={[styles.formItem, {borderColor: platform.brandPrimary}]}>
                                <Input placeholder='Name' value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                            </Item>
                            <Textarea rowSpan={5} bordered placeholder="Description" value={this.state.description} style={[styles.formItem, {borderColor: platform.brandPrimary}]} onChangeText={(text) => this.setState({description: text})} />
                            <Text style={styles.text}>#tags</Text>
                            <Tags
                                textInputProps={{
                                    placeholder: "Add a service tag"
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
                            <Button block style={styles.formItem} onPress={() => this.switchToMap()}>
                                <Text>
                                    Next
                                </Text>
                            </Button>
                        </Display>
                        <Display enable={this.state.page2} enter='zoomIn' exit='zoomOut'>
                            <MapView
                                style={ styles.map }
                                onLongPress={(res) => this.changeLocation(res)}
                                initialRegion={{
                                    latitude: this.state.lat,
                                    longitude: this.state.lng,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                    }}
                                showsUserLocation={true}
                                provider='google'
                                >
                                <Marker draggable
                                    coordinate = {{
                                        latitude: this.state.mLat,
                                        longitude: this.state.mLng,
                                    }}
                                    pinColor={platform.brandLight}
                                />
                            </MapView>
                            <Text style={[styles.text, {position: 'absolute', top: 50}]}>
                                Long Press on a map location to save it as your restaurant location.
                            </Text>
                            <Row>
                                <Col style={styles.buttonRowMargin}>
                                    <Button block info style={styles.formItem} onPress={() => this.switchToForm()}>
                                        <Text>
                                            Go back
                                        </Text>
                                    </Button>
                                </Col>
                                <Col style={styles.buttonRowMargin}>
                                    <Button block success style={styles.formItem} onPress={() => this.verify()}>
                                        <Text>
                                            Proceed
                                        </Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Display>
                        <ProgressDialog
                            visible={this.state.progressDialog}
                            title="Saving restaurant details"
                            message={this.state.progressText}
                        />
                    </Content>
                </StyleProvider>
            </AnimatableContainer>
        );
    }

    switchToMap(){
        this.setState({page1: false, page2: true})
    }

    switchToForm(){
        this.setState({page1: true, page2: false})
    }

    changeLocation(res) {
        this.setState({
            mLat: res.nativeEvent.coordinate.latitude,
            mLng: res.nativeEvent.coordinate.longitude
        })
        Geocoder.getFromLatLng({
            lat: this.state.mLat,
            lng: this.state.mLng
        }).then(json => {
            var addr = json.results[0].formatted_address
            this.setState({address: addr})
        })
        Toast.show({
            text: 'New location captured',
            buttonText: 'Okay',
            type: 'success'
        })
    }

    proceed(){
        var s = this.state;
        var that = this;
        var imageArr = [];
        var val = {
            name: s.name,
            description: s.description,
            location:{
                latitude: s.mLat,
                longitude: s.mLng
            },
            tags: s.tags,
            address: s.address,
            ownerId: s.ownerId,
            open: true
            //TODO: Add owner id
        }
        var images = this.state.images

        fs.collection('restaurants').add(val).then(res => {
            that.setState({key: res.id, progressText: 'Uploading images...'})
            images.forEach((item, index, arr) => {
                storage.ref('restaurants/' + this.state.key + '/image_' + index).putFile(item.path).then(file => {
                    imageArr.push(file.downloadURL);
                    res.update({images: imageArr}).then(upd => {
                        if (index === images.length-1) {
                            this.uploadSuccess()
                        }
                    }).catch(err => {

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
        // db.ref('restaurants').push(val).then(res =>{
        //     that.setState({key: res.key, progressText: 'Uploading images...'})
        //     images.forEach((item, index, arr) => {
        //         storage.ref('restaurants/'+this.state.key+'/image_'+index).putFile(item.path).then(file =>{
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
    errorToast(text){
        Toast.show({
            text: 'Error: '+text,
            type:'danger'
        })
    }

    verify(){
        var s = this.state;
        if (s.name === '' || s.description === '' || s.tags.length === 0 || s.images.length === 0) {
            Toast.show({
                text: 'Name, description, a tag and a picture are compulsory',
                duration: 3000
            })
        } else {
            this.setState({progressDialog: true})
            this.proceed()
        }
    }

    cleanUpUpload(){
        db.ref('restaurants/'+this.state.key).remove();
        this.uploadDone()
    }

    uploadSuccess(){
        this.uploadDone()
        Toast.show({
            text: 'Details saved successfully',
            type: 'success',
            buttonText: 'Okay',
            duration: 4000
        })
    }

    uploadDone(){
        this.setState({progressDialog: false})
        this.props.navigation.navigate('Restaurants', {ownerId: this.state.ownerId})
    }
}


export default withNavigationFocus(AddRestaurant);
