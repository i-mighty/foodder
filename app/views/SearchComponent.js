import React, { Component } from 'react';
import Image from 'react-native-image-progress';
import {Image as RNImg} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {Container, Content, Footer, FooterTab, Header, StyleProvider, Text, Button, Icon, Item, Input, Spinner, List, View, Card, CardItem, Left, Body, Right, Badge} from 'native-base'
import * as Animatable from 'react-native-animatable';
import Display from 'react-native-display';
import Carousel from 'react-native-snap-carousel';
import { CustomCachedImage } from 'react-native-img-cache';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import SectionLabel from './SubComponents/SectionLabel';
import styles from '../styles/SearchStyle'
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';

AnimatableContainer = Animatable.createAnimatableComponent(Container);

const db = firebase.database();
const fs = firebase.firestore();

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: true,
            searchText:'',
            results:{
                places:[
                    // {
                    //     id: 'xyz',
                    //     address:'Lalalalalalalal',
                    //     open: false,
                    //     image: 'http://www.ourperfectpalette.com/wp-content/uploads/2017/09/IMG_0140.jpg'
                    // },
                    // {
                    //     id: 'abc',
                    //     address: 'Afdikevcb wcwbwbcwbcwe',
                    //     open: true,
                    //     image: 'http://www.ourperfectpalette.com/wp-content/uploads/2017/10/IMG_0163.jpg'
                    // },
                    // {
                    //     id: 'def',
                    //     address: 'Ppeleoanaxofinadcnacpacacapd',
                    //     open: true,
                    //     image: 'http://sisijemimah.com/wp-content/uploads/2015/08/IMG_8335.jpg'
                    // },
                    // {
                    //     id: 'jkl',
                    //     address: 'The higher plabe',
                    //     open: false,
                    //     image:'http://foodies.waiter.com.ng/wp-content/uploads/2018/01/FB_IMG_1515921887191-720x400.jpg'
                    // }
                ],
                items:[]
            },
            history:[],
            searchDone: false,
        };
    }

    render() {
        return (
                    this.props.isFocused &&
                <AnimatableContainer animation='fadeIn' ref={(ref) =>  this.animation = ref}>
                    <StyleProvider style={getTheme(platform)} >
                        <Header searchBar>
                            <Item>
                                <Icon name='search'/>
                                <Input placeholder='Search' onChangeText={(text) => {
                                    this.setState({searchText: text, searchDone: false})
                                    this.search()
                                }}/>
                            </Item>
                        </Header>
                    </StyleProvider>
                    <Content contentContainerStyle={styles.body} style={styles.bodyStyle}>
                        <Display enable={this.state.searchText.length === 0}>
                            <SectionLabel text="Recent searches"/>
                        </Display>
                        <Display enable={this.state.searchText.length >= 1} style={styles.body}>
                            <SectionLabel text="Search results"/>
                            <Display enable={!this.state.searchDone}>
                                <Spinner color={platform.brandLight}/>
                            </Display>
                            <Display enable={this.state.searchDone} style={styles.resultSection}>
                                <View style={styles.resultSection}>
                                    <SectionLabel text='Restaurants'/>
                                    {
                                        this.state.results.places.length===0 && this.state.searchDone?(
                                            <View styles={styles.notFoundView}>
                                                <RNImg
                                                    source={require('../assets/404img2.jpg')}
                                                    style={styles.notFoundImage}
                                                    resizeMode='center'
                                                />
                                                <Text style={{textAlign: 'center'}}>
                                                    No results
                                                </Text>
                                            </View>
                                        ):(
                                            <Carousel
                                                ref={(c) => this._placesCarousel = c}
                                                data={this.state.results.places}
                                                renderItem={this._placeCardRender}
                                                sliderWidth={widthPercentageToDP('96%')}
                                                itemWidth={widthPercentageToDP('60%')}
                                            />
                                        )
                                    }
                                </View>
                                <View style={styles.resultSection}>
                                    <SectionLabel text='Foods and Drinks'/>
                                    {
                                        this.state.results.items.length===0&& this.state.searchDone?(
                                            <View styles={styles.notFoundView}>
                                                <RNImg
                                                    source={require('../assets/404img2.jpg')}
                                                    style={styles.notFoundImage}
                                                    resizeMode='center'
                                                />
                                                <Text style={{textAlign: 'center'}}>
                                                    No results
                                                </Text>
                                            </View>
                                        ):(
                                            <Carousel
                                                ref={(c) => this._foodCarousel = c}
                                                data={this.state.results.places}
                                                renderItem={this._foodCardRender}
                                                sliderWidth={widthPercentageToDP('96%')}
                                                itemWidth={widthPercentageToDP('60%')}
                                            />
                                        )
                                    }
                                </View>
                            </Display>
                        </Display>
                    </Content>
                </AnimatableContainer>
        );
    }

    search(){
        var that = this
        var s = this.state
        var place = [];
        var results = {... this.state.results};
        var items = [];
        
        var rQuery1 = fs.collection('restaurants').where("name", "==", s.searchText);
        var rQuery2 = fs.collection('restaurants').where("tags", "array-contains", s.searchText);
        var iQuery1 = fs.collection('items').where("name", "==", s.searchText)
        var iQuery2 = fs.collection('items').where("tags", "array-contains", s.searchText)
        rQuery1.get().then(res => {
            res.docs.forEach(value =>{
                place.push(value.data());
            })
            rQuery2.get().then(res2 => {
                res2.docs.forEach(val => {
                    place.push(val.data())
                })
                iQuery1.get().then(ires =>{
                    ires.docs.forEach(ival =>{
                        items.push(ival.data())
                    })
                    iQuery2.get().then(ires2 => {
                        ires2.forEach(ival2 =>{
                            items.push(ival2.data())
                        })
                        results.items= items;
                        results.places = place;
                        that.setState({results: results, searchDone: true})
                    })
                })
            })
        })

        // db.ref('restaurants').orderByChild('name').equalTo(s.searchText).once('value').then(snap =>{
        //     place.concat(snap.toJSON());
        //     db.ref('restaurants').orderByValue
        // }).catch(err =>{

        // })
        // db.ref('restaurants').orderByChild('name').equalTo(s.searchText)
    }

    _foodCardRender({item, index}){
        var app = this;
        return(
            <Card>
                <CardItem cardBody button onPress={() => alert(item.id) }>
                    <CustomCachedImage
                        component={Image}
                        source={{uri: item.image}}
                        style={{height: heightPercentageToDP('25%'), flex: 1}}
                    />
                </CardItem>
                <CardItem style={styles.carouselCardBase}>
                    <Body>
                        <Text style={styles.carouselCardBaseTexts}>
                            Price: 1000
                        </Text>
                    </Body>
                    <Right>
                        <Button success small>
                            <Text>
                                Order
                            </Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        )
    }

    _placeCardRender({item, index}){
        var app = this;
        return(
            <Card>
                <CardItem cardBody button onPress={() => app._showItem(item.id)}>
                    <CustomCachedImage
                        component={Image}
                        source={{uri: item.image}}
                        style={{height: heightPercentageToDP('25%'), flex: 1}}
                    />
                </CardItem>
                <CardItem style={styles.carouselCardBase}>
                    <Body>
                        <Icon type='EvilIcons' name='location' style={styles.carouselCardBaseText}/>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.carouselCardBaseText}>
                            {item.address}
                        </Text>
                    </Body>
                    <Right>
                        <Text style={{color: item.open?platform.brandSuccess:platform.brandDanger}}>
                            {
                                item.open?'Open':'Closed'
                            }
                        </Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
    _showPlace(id) {
        alert(id)
    }
    _showItem(id){
        alert(id)
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
const view = withNavigationFocus(SearchComponent)
export default connect(mapStateToProps, mapDispatchToProps)(view);