import React, { Component } from 'react';
import {ImageBackground, Platform } from 'react-native';
import {Container, Content, Header, Form, Item, Input, Text, Icon, Button, Toast, Left} from 'native-base'
import CodeInput from 'react-native-confirmation-code-input';
import platform from '../native-base-theme/variables/platform';
import validator from 'validator';
import {withNavigation, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import styles from '../styles/LoginStyle';
import config from '../../app.json'
import Firebase from 'react-native-firebase';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import * as Animated from 'react-native-animatable';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const auth = Firebase.auth();
const db = Firebase.database();
const fs = firebase.firestore()

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber:'',
            verfCode:'',
            name:'',
            codeValid: false,
            verfDialog: false,
            spinner: false,
            confirmResult:null,
            fixedNo: '',
            noConfirm: false,
        };
    }

    
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            auth.signOut()
            if(user){
                this.authCompleteProceed(user);
            }
        });
    }

    componentWillUpdate(nextProps, nextState){
        const {confirmResult, verfCode } = nextState;
    }

    render() {
        return (
            <Content>
                <ImageBackground source={require('../assets/loginBG.png')} style={styles.bgImage}>
                    <Header style={styles.header} androidStatusBarColor={'#fff'} transparent/>
                    <Animated.Image 
                        animation='fadeInUpBig'
                        source={require('../assets/logo.png')} 
                        style={{
                            borderRadius: 50, width: 100, height: 100
                        }}
                    />
                </ImageBackground>
                <Form style={styles.form}>
                    <Item regular style={styles.input}>
                        <Text style={styles.inputLeft}>
                            +234
                        </Text>
                        <Input 
                            placeholder="Phone number" onChangeText={(text) => this.setState({phoneNumber: text})}/>
                    </Item>
                    <Item regular style={styles.input}>
                        <Icon name='contact'/>
                        <Input 
                            placeholder="Display name" onChangeText={(text) => this.setState({name: text})}/>
                    </Item>
                    <Button success block style={styles.input} onPress={() => this.verify()}>
                        <Text>
                            Continue
                        </Text>
                    </Button>
                    <Button transparent block style={styles.input} onPress={() => this.navigate('Admin')}>
                        <Text>
                            Sign in as restaurant admin
                        </Text>
                    </Button>
                </Form>
                <Dialog.Container 
                    visible={this.state.verfDialog}
                    >
                    <Dialog.Title>
                        Verify Your Phone Number
                    </Dialog.Title>
                    <Dialog.Description>
                        Enter the verification code sent by Google to your phone.
                        {Platform.OS === 'android'?'\nWe are waiting to auto detect a message sent to your phone':''}
                    </Dialog.Description>
                    <Dialog.Input 
                        placeholder='Verification code' 
                        onChangeText={(text) => this.setState({verfCode: text})}
                        />
                    <Dialog.Button label='Continue' onPress={() => this.confirm()}/>
                </Dialog.Container>
                <Dialog.Container 
                    visible={this.state.noConfirm}
                    >
                    <Dialog.Title>
                        Confirm your phone number
                    </Dialog.Title>
                    <Dialog.Description>
                        Your phone number is: {this.state.fixedNo}
                    </Dialog.Description>
                    <Dialog.Button label='Cancel' onPress={() => {this.setState({noConfirm: false})}} />
                    <Dialog.Button label='Continue' onPress={() => this.numberValid() }/>
                </Dialog.Container>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please wait...'}
                    color={platform.brandPrimary}
                    textStyle={styles.spinnerTextStyle}
                    />
            </Content>
        );
    }

    navigate(route){
        this.props.navigation.navigate(route);
    }

    navigateNested(navigator, route){
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({ routeName: route }));
    }

    verify(){
        if (this.state.phoneNumber.length >= 10) {
            if (this.state.name.length >= 1) {
                try {
                    var num = this.fixNumber()
                    this.validateNo();
                } catch (error) {
                    this._showToast(error.message, 'danger')
                }
            }else{
                this._showToast('Name cannot be blank', 'danger')
            }
        }
        else{
            this._showToast('Invalid phone number', 'danger')
        }
    }

    validateNo(){
        this.setState({noConfirm: true})
    }

    numberValid(){
        this.setState({noConfirm: false});
        this.login(this.state.fixedNo)
    }

    login(phone){
        this.setState({spinner: true})
        auth.signInWithPhoneNumber(phone).then(result =>{
            this.setState({ spinner: false, verfDialog: true, confirmResult: result });
            this._showToast('Verification code sent!', 'default');
        }).catch(err =>{
            this._showToast(err.message, 'danger')
        })
    }
    
    confirm(){
        const { confirmResult, verfCode } = this.state;
        this.setState({ spinner: true, verfDialog: false});
        confirmResult.confirm(verfCode).then(user => {
            this.authCompleteProceed(user);
        }).catch(error => {
            this._showToast(error.message, 'danger')
            this.setState({spinner: false})
        });
    }

    authCompleteProceed(user){
        var val;
        if (!this.props.user.name === '' && !this.state.phoneNumber === '') {
            val = {
              name: this.state.name,
              phoneNumber: this.state.fixedNo,
              uid: auth.currentUser.uid,
              avatar:
                "https://firebasestorage.googleapis.com/v0/b/foodder-sys.appspot.com/o/users%2Fblank-profile-picture-973460_1280.png?alt=media&token=e693c46f-f106-4be6-885d-f6c7edb7e265"
            };
        } else {
            val = this.props.user;
        }
            this.props.saveUser(val);
        var uid = auth.currentUser.uid;
        fs.collection('users').doc(uid).get().then(res =>{
            if(res.exists){
                this.props.saveUser(snap.val());
                this._showToast('Signing in...', 'default')
            }else{
                fs.collection('users').doc(uid).set(val).then(() => {
                    this.setState({ spinner: false });
                    this.navigateNested('App', 'Home');
                }).catch(err => this._showToast(err.message, 'danger'))
            }

        })
        // db.ref('users/'+uid).once('value').then(snap => {
        //     if(snap.val()){
        //         this.props.saveUser(snap.val());
        //         this._showToast('Signing in...', 'default')
        //     }else{
        //         db.ref('users/' + uid).set(val).then(() => {
        //             this.setState({ spinner: false });
        //             this.navigateNested('App', 'Home');
        //         }).catch(err => this._showToast(err.message, 'danger'))
        //     }
        //     this.setState({ spinner: false });
        //     this.navigateNested('App', 'Home');
        // })
    }

    _showToast(err, type){
        this.setState({ spinner: false })
        Toast.show({
            text: err,
            type: type,
            duration: 3000
        })
    }
    fixNumber(){
        var num = this.state.phoneNumber;
        num.substr(0,3);
        if (num.substr(0, 3) === '+234') {
            var newNum = num;
        } else if (num.substring(0, 1) === '0') {
            var newNum = '+234'+num.substr(1)
        } else {
            var newNum =  '+234'+num;
        }
        this.setState({fixedNo: newNum});
        return newNum;
    }
}
const mapStateToProps = ({user}) =>{
    return {user}
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUser
    }, dispatch)
);
const view = withNavigation(LoginView);
export default connect(mapStateToProps, mapDispatchToProps)(view);