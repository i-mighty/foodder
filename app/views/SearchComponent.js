import React, { Component } from 'react';
import Image from 'react-native-image-progress';
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
AnimatableContainer = Animatable.createAnimatableComponent(Container);
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: true,
            searchText:'',
            results:{
                places:[
                    {
                        id: 'xyz',
                        address:'Lalalalalalalal',
                        open: false,
                        image: 'http://www.ourperfectpalette.com/wp-content/uploads/2017/09/IMG_0140.jpg'
                    },
                    {
                        id: 'abc',
                        address: 'Afdikevcb wcwbwbcwbcwe',
                        open: true,
                        image: 'http://www.ourperfectpalette.com/wp-content/uploads/2017/10/IMG_0163.jpg'
                    },
                    {
                        id: 'def',
                        address: 'Ppeleoanaxofinadcnacpacacapd',
                        open: true,
                        image: 'http://sisijemimah.com/wp-content/uploads/2015/08/IMG_8335.jpg'
                    },
                    {
                        id: 'jkl',
                        address: 'The higher plabe',
                        open: false,
                        image:'http://foodies.waiter.com.ng/wp-content/uploads/2018/01/FB_IMG_1515921887191-720x400.jpg'
                    }
                ],
                foods:[],
                drinks:[],
            },
            history:[],
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
                                <Input placeholder='Search' onChangeText={(text) => this.setState({searchText: text})}/>
                            </Item>
                        </Header>
                    </StyleProvider>
                    <Content contentContainerStyle={styles.body} style={styles.bodyStyle}>
                        <Display enable={this.state.searchText.length === 0}>
                            <SectionLabel text="Your past searches"/>
                        </Display>
                        <Display enable={this.state.searchText.length >= 1} style={styles.body}>
                            <SectionLabel text="Your search results"/>
                            <Display enable={this.state.results.length === 0}>
                                <Spinner color={platform.brandLight}/>
                            </Display>
                            <Display enable={this.state.results !== {}} style={styles.resultSection}>
                                <View style={styles.resultSection}>
                                    <SectionLabel text='Restaurants'/>
                                    <Carousel
                                        ref={(c) => this._placesCarousel = c}
                                        data={this.state.results.places}
                                        renderItem={this._placeCardRender}
                                        sliderWidth={widthPercentageToDP('96%')}
                                        itemWidth={widthPercentageToDP('60%')}
                                    />
                                </View>
                                <View style={styles.resultSection}>
                                    <SectionLabel text='Foods'/>
                                    <Carousel
                                        ref={(c) => this._foodCarousel = c}
                                        data={this.state.results.places}
                                        renderItem={this._foodCardRender}
                                        sliderWidth={widthPercentageToDP('96%')}
                                        itemWidth={widthPercentageToDP('60%')}
                                    />
                                </View>
                                <View style={styles.resultSection}>
                                    <SectionLabel text='Drinks'/>
                                    <Carousel
                                        ref={(c) => this._foodCarousel = c}
                                        data={this.state.results.places}
                                        renderItem={this._foodCardRender}
                                        sliderWidth={widthPercentageToDP('96%')}
                                        itemWidth={widthPercentageToDP('60%')}
                                    />
                                </View>
                            </Display>
                        </Display>
                    </Content>
                </AnimatableContainer>
        );
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
                        <Text numberOfLines={2} ellipsizeMode='tail'>
                            
                        </Text>
                    </Body>
                    <Right>
                        <Text style={styles.carouselCardBaseTexts}>
                            Price: 
                        </Text>
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