import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, StyleProvider, Text, Button, Icon, List, ListItem, Thumbnail, Toast} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';
import firebase from "react-native-firebase";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    noFollowersIcon:{
        fontSize: wp('20%'),
        color: '#AAA7'
    },
    noFollowersView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: hp('50')
    },
    noFollowersText:{
        fontSize: wp('5%'),
        color: '#AAA7',
        marginVertical: hp('1%')
    },
})


AnimatableContainer = Animatable.createAnimatableComponent(Container);
const datas=[
    // 'Simon Mignolet',
    // 'Nathaniel Clyne',
    // 'Dejan Lovren',
    // 'Mama Sakho',
    // 'Alberto Moreno',
    // 'Emre Can',
    // 'Joe Allen',
    // 'Phil Coutinho',
];

const db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore();

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
            dialog: false,
            itemId: ''
        };
    }

    componentDidMount(){
        var orders = [];
        fs.collection('orders').doc(this.props.user.id).get().then(res => {
            res.docs.forEach(doc => orders.push(doc.data()))
            this.setState({listViewData: orders})
        }).catch(err => {
            Toast.show({
                type: 'danger', 
                text: 'Could not get your orders\nPlease check your internet connection.'
            })
        })
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({
            listViewData: newData
        });
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
                this.props.navigation.isFocused &&
            <StyleProvider style={getTheme(platform)}>
                <AnimatableContainer animation='fadeIn'>
                    <Header>
                        <Left>
                            
                        </Left>
                        <Body>
                            <Title>
                                My Order
                            </Title>
                        </Body>
                        <Right>
                            
                        </Right>
                    </Header>
                    <Content>
                        {
                            this.state.listViewData.length>0?(
                                <List
                                    leftOpenValue={75}
                                    rightOpenValue={-75}
                                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                    renderRow={data =>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail
                                                source={{ uri: data.item.images[0]}}
                                                square large
                                            />
                                        </Left>
                                        <Body>
                                            <Text> {data.item.name} </Text>
                                            <Text note numberOfLines={2}>{data.item.description}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent
                                                onPress={() => this.props.navigation.navigate('Item', {itemId: data.itemId})}
                                            >
                                                <Text>View</Text>
                                            </Button>
                                            <Button transparent danger>
                                                <Text>Cancel</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>}
                                    renderLeftHiddenRow={data =>
                                    <Button full onPress={() => alert(data)}>
                                        <Icon active name="checkmark" />
                                    </Button>}
                                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                        <Icon active name="trash" />
                                    </Button>}
                                />
                            ):(
                                <View style={styles.noFollowersView}>
                                    <Icon name='clipboard' style={styles.noFollowersIcon}/>
                                    <Text style={styles.noFollowersText}>
                                        You have no orders yet
                                    </Text>
                                    <Text note>
                                        They would appear here once you start making orders
                                    </Text>
                                </View>
                            )
                        }
                        
                    </Content>
                    <ConfirmDialog
                        title="Confirm order cancel"
                        message="Are you sure you want to cancel your order?"
                        visible={this.state.dialog}
                        positiveButton={{
                            title: "YES",
                            onPress: () => {this.cancelOrder}
                        }}
                        negativeButton={{
                            title: "NO",
                            onPress: () => {this.setState({dialog: false})}
                        }}
                    />
                </AnimatableContainer>
            </StyleProvider>
        );
    }

    confirmCancel(id){
        this.setState({itemId: id, dialog: true})
    }

    cancelOrder(){
        this.setState({dialog: false})
        fs.collection('orders').doc(this.state.itemId).update({
            completed: true
        }).then(res => {
            Toast.show({
                text: 'Your order was cancelled'
            })
        }).catch(err => {
            Toast.show({
                type: 'danger', 
                text: 'Could not cancel your order\nPlease check your internet connection.'
            })
        })
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
const mapStateToProps = ({user}) =>{
    return {user}
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUser
    }, dispatch)
);
const view = withNavigationFocus(OrderComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view);