import React, { Component } from 'react';
import { Image, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Thumbnail, Text, Right, Button, Icon, Switch, Row, Fab, StyleProvider, Form, Item, H2, Input, Textarea, Toast, View } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import { CustomCachedImage } from 'react-native-img-cache';
import PhotoGrid from 'react-native-photo-grid';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import styles from '../styles/AddItemStyle'
import firebase from 'react-native-firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';
import update from 'immutability-helper';
import Tags from "react-native-tags";
import AnimatedComponent from './AnimatedComponent';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveUser } from "../data/Actions";
import { withNavigationFocus } from "react-navigation";

AnimatableContainer = Animatable.createAnimatableComponent(Container);

var db = firebase.database();
var storage = firebase.storage();
const fs = firebase.firestore();

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            imgSrc: {},
            progressDialog: false,
            progressText: 'Saving Information...',
            key: '',
            errorText: '',
            error: null,
            userId: this.props.navigation.getParam('userId', ''),
        };
    }

    newUpload(){
        var that = this;
        ImagePicker.openPicker({
            includeBase64: true
        }).then(image => {
            img = {
                src: image.data,
                mime: image.mime,
                path: image.path
            };
            that.setState({imgSrc: img})
        })
    }

    render() {
        return (
        <AnimatableContainer animation='fadeInLeftBig' duration={1000} >
            <StyleProvider style={getTheme(platform)}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={'arrow-back'}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Edit Profile
                        </Title>
                    </Body>
                </Header>
            </StyleProvider>
            <StyleProvider style={getTheme(platform)}>
                <Content style={styles.body} contentContainerStyle={styles.container}>
                    <H2 style={styles.text}>
                        Edit Profile
                    </H2>
                    {
                        this.state.imgSrc !== {} ?(
                            <Avatar
                                size='large'
                                containerStyle={styles.formItem}
                                source = {{uri: `data:${this.state.imgSrc.mime};base64,${this.state.imgSrc.src}`}}
                                showEditButton
                                onEditPress={() => this.newUpload()}
                            />
                        ): (
                            <Avatar
                                title='AV'
                                containerStyle={styles.formItem}
                                source={{uri: this.props.user.avatar}}
                                showEditButton
                                onEditPress={() => this.newUpload()}
                            />
                        )
                    }
                    <Item regular style={[styles.formItem, {borderColor: platform.brandPrimary}]}>
                        <Input placeholder='Name' onChangeText={(name) => this.setState({name})} />
                    </Item>
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
        if (s.name === '') {
            Toast.show({
                text: 'Name cannot be empty',
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
        }
        var images = this.state.images
        fs.collection('users').doc(s.userId).update(val).then(res => {
            that.setState({progressText: 'Uploading image...'})
            storage.ref('users/'+this.state.userId+'/avatar').putFile(s.imgSrc.path).then(file => {
                fs.collection('users').doc(s.userId).update({
                    avatar: file.downloadURL,
                    name: this.state.name
                }).then(() =>{
                    this.uploadSuccess
                })
            }).catch(err => {
                that.setState({errorText: 'Storage failed\nCheck your connection and try again', error: true})
            })
        }).catch(err => {

        })
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
        this.props.navigation.goBack()
    }
}
const mapStateToProps = ({user}) =>{
    return {user}
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUser
    }, dispatch)
);

const view = withNavigationFocus(EditProfile);
export default connect(mapStateToProps, mapDispatchToProps)(view)
