import React, { Component } from 'react';
import { Text as RNText } from 'react-native';
import { Content, Left, Icon, Container, Header, StyleProvider, View, Text, Tab, Tabs, Title, TabHeading, Body, Footer, Button, Form, Item, Input, Label, DatePicker, Toast } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import * as Animatable from 'react-native-animatable';
import {withNavigationFocus} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveAdmin} from '../../data/Actions';
import styles from '../../styles/AdminAuth'
import firebase from 'react-native-firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';
import validator from 'validator'
AnimatableContainer = Animatable.createAnimatableComponent(Container);

var db = firebase.database();
var auth = firebase.auth();
var fs = firebase.firestore()

class AdminAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regEmail:'',
            regPass:'',
            name:'',
            dob:'',
            loading: false,
            lEmail:'',
            lPass:''
        };
    }

    render() {
        return (
            this.props.isFocused &&
            <AnimatableContainer animation='fadeInLeftBig' duration={1000}>
                <StyleProvider style={getTheme(platform)}>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                                <Icon name={'arrow-back'}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                Restaurant Admin
                            </Title>
                        </Body>
                    </Header>
                </StyleProvider>
                <StyleProvider style={getTheme(platform)}>
                    <Content>
                        <Tabs ref={tab => this.tab = tab}>
                            <Tab heading={<TabHeading>
                                <Title>Login</Title>
                            </TabHeading>}>
                                <View style={styles.tab}>
                                    <RNText style={styles.text}>
                                        Login to your restaurant's admin dashboard
                                    </RNText>
                                    <Form style={styles.form}>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='mail' />
                                            <Input placeholder='Email address' onChangeText={(text) => this.setState({lEmail: text})}/>
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='lock' />
                                            <Input placeholder='Password' secureTextEntry onChangeText={(text) => this.setState({lPass: text})}/>
                                        </Item>
                                        <Button block success style={styles.formItem} onPress={() => this.login()}>
                                            <Text>
                                                Login
                                            </Text>
                                        </Button>
                                    </Form>
                                </View>
                            </Tab>
                            <Tab heading={<TabHeading>
                                <Title>Register</Title>
                            </TabHeading>}>
                                <View style={styles.tab}>
                                    <RNText style={styles.text}>
                                        Login to your restaurant's admin dashboard
                                    </RNText>
                                    <Form style={styles.form}>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='contact' />
                                            <Input placeholder='Full name' onChangeText={(text) => this.setState({name: text})} />
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='mail' />
                                            <Input placeholder='Email address' onChangeText={(text) => this.setState({regEmail: text})} />
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='lock' />
                                            <Input placeholder='Password' secureTextEntry onChangeText={(text) => this.setState({regPass: text})}  />
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='calendar' />
                                            <DatePicker
                                                placeHolderText='Date of birth'
                                                onDateChange={(text) => this.setState({dob: text})}
                                            />
                                        </Item>
                                        <Button block success style={styles.formItem} onPress={() => this.register()}>
                                            <Text>
                                                Register
                                            </Text>
                                        </Button>
                                    </Form>
                                </View>
                            </Tab>
                        </Tabs>
                        <ProgressDialog
                            visible={this.state.loading}
                            title="Loading"
                            message="Please, wait..."
                        />
                    </Content>
                </StyleProvider>
            </AnimatableContainer>
        );
    }

    showLoading(){
        this.setState({loading: true})
    }

    hideLoading(){
        this.setState({loading: false})
    }

    register(){
        var that = this;
        var s = this.state;
        if(s.dob === '' || s.name === '' || s.regEmail === '' || s.regPass === ''){
            Toast.show({
                text: 'All fields are required.',
                type: 'danger'
            })
        }else if(!validator.isEmail(s.regEmail)){
            Toast.show({
                text: "That's not a valid email address",
                type: 'danger'
            })
        }else{
            this.showLoading()
            var usr = {
                email: s.regEmail,
                name: s.name,
                dob: s.dob
            }
            auth.createUserWithEmailAndPassword(s.regEmail, s.regPass).then(val =>{
                fs.collection('restaurant_owners').doc(val.user.uid).set(usr).then(() =>{
                    val.user.sendEmailVerification().then(() => {
                        this.hideLoading()
                        Toast.show({
                            text: 'Registration successful. \nA verification email has been sent to your email.\n Please verify your email address and login.',
                        })
                    }).catch(err => {
                        this.hideLoading()
                        Toast.show({
                            text: 'Could not sign in: ' + err.message,
                            type: 'danger'
                        })
                    })
                }).catch(() => {
                    this.hideLoading()
                    Toast.show({
                        text: 'Could not sign in: ' + err.message,
                        type: 'danger'
                    })
                })
                // db.ref('restaurant_owners/'+val.user.uid).set(usr).then(refVal =>{
                //     val.user.sendEmailVerification().then(() =>{
                //         this.hideLoading()
                //         Toast.show({
                //             text: 'Registration successful. \nA verification email has been sent to your email.\n Please verify your email address and login.',
                //         })
                //     }).catch(err => {
                //         this.hideLoading()
                //         Toast.show({
                //             text: 'Could not sign in: ' + err.message,
                //             type: 'danger'
                //         })
                //     })
                // }).catch(err => {
                //     this.hideLoading()
                //     Toast.show({
                //         text: 'Could not sign in: ' + err.message,
                //         type: 'danger'
                //     })
                // })
            }).catch(err => {
                this.hideLoading()
                Toast.show({
                    text: 'Could not sign in: ' + err.message,
                    type: 'danger'
                })
            })
        }
    }

    login(){
        var that = this;
        var s = this.state;
        if(s.lEmail === '' || s.lPass === ''){
            Toast.show({
                text: 'All fields are required.',
                type: 'danger'
            })
        }else if(!validator.isEmail(s.lEmail)){
            Toast.show({
                text: "That's not a valid email address",
                type: 'danger'
            })
        }else{
            this.showLoading()
            auth.signInWithEmailAndPassword(s.lEmail, s.lEmail).then(val =>{
                fs.collection('restaurant_owners').doc(val.user.uid).get().then(val => {
                    that.props.saveUser(val.data())
                    Toast.show({
                        text: 'Signing in...'
                    })
                }).catch(err => {
                    this.hideLoading()
                    Toast.show({
                        text: 'Could not sign in: ' + err.message,
                        type: 'danger'
                    })
                })
                // db.ref('restaurant_owners/'+val.user.uid).once('value').then(val =>{
                //     that.props.saveUser(val.toJSON());
                //     Toast.show({
                //         text: 'Signing in...'
                //     })
                // }).catch(err => {
                //     this.hideLoading()
                //     Toast.show({
                //         text: 'Could not sign in: ' + err.message,
                //         type: 'danger'
                //     })
                // })
            }).catch(err => {
                this.hideLoading()
                Toast.show({
                    text: 'Could not sign in: '+err.message,
                    type: 'danger'
                })
            })
        }
    }

    navigate(route) {
        this.props.navigation.navigate(route);
    }

    navigateNested(navigator, route) {
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({
            routeName: route
        }));
    }

}
const mapStateToProps = ({admin}) =>{
    return {admin}
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveAdmin
    }, dispatch)
);

const view = withNavigationFocus(AdminAuth);
// export default view;
export default connect(mapStateToProps, mapDispatchToProps)(view);
