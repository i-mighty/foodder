import React, { Component } from 'react'
import { View } from 'react-native'
import { Content, Container, StyleProvider, H1, Button, Text, H2, H3, Footer, Card, FooterTab, Grid, Col, Icon, Toast } from 'native-base';
import { Avatar, Badge } from 'react-native-elements';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import styles from '../styles/ItemStyle'
import Carousel from 'react-native-snap-carousel';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP
} from 'react-native-responsive-screen';
import ViewMoreText from 'react-native-view-more-text';
import firebase from 'react-native-firebase';
import Placeholder from 'rn-placeholder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import { withNavigationFocus } from 'react-navigation';

const db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore();

export class ItemComponent extends Component {
    static navigationOptions = {
        tabBarVisible: false,
    };

    constructor(props){
        super(props);
        this.state = {
            itemId: this.props.navigation.getParam('itemId', ''),
            // itemId: 'xyzItem',
            ready: false,
            item:{},
            // images:[
            //     'http://www.ourperfectpalette.com/wp-content/uploads/2017/09/IMG_0140.jpg',
            //     'http://www.ourperfectpalette.com/wp-content/uploads/2017/10/IMG_0163.jpg',
            //     'http://sisijemimah.com/wp-content/uploads/2015/08/IMG_8335.jpg',
            //     'http://foodies.waiter.com.ng/wp-content/uploads/2018/01/FB_IMG_1515921887191-720x400.jpg'
            // ]
        };
    }

    componentDidMount(): void {
        let s = this.state;
        fs.collection('items').doc(s.itemId).get().then(value => {
            this.setState({item: value.data(), ready: true})
        }).catch(err => {

        })
    }

    addFavorite(){
        fs.collection('favorites').doc(this.props.user.id).collection().add({
            itemId: this.state.itemId, 
            item: this.state.item
        }).then(res => {
            Toast.show({
                type: 'success', 
                text: 'Added to favorites', 
            })
        }).catch(err => {
            Toast.show({
                text: 'Could not add to favorite.\nPlease try again'
            })
        })
    }

    static _renderItem ({item, index}) {
        return (
            <Avatar
                rounded
                size='large'
                source={{uri: item}}
                containerStyle={{borderColor: platform.brandLight, borderWidth: 2}}
            />
        );
    }

    static renderViewMore(onPress){
        return(
            <Text style={{color: platform.brandLight, fontSize: 12,}}
            onPress={onPress}>More</Text>
        )
    }

    static renderViewLess(onPress){
        return(
            <Text style={{color: platform.brandDanger, fontSize: 12,}}
            onPress={onPress}>Less</Text>
        )
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container>
                    <Content>
                        <Card style={styles.topPane}>
                            <Placeholder.Box
                                height={80}
                                width={80}
                                radius={75}
                                color='#aaa7'
                                animation='fade'
                                onReady={this.state.ready}
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 15}}
                            >
                                <Avatar
                                    rounded
                                    size={100}
                                    source={require('../assets/jollof1.jpeg')}
                                    containerStyle={styles.lAvatar}
                                />
                            </Placeholder.Box>
                            <Placeholder.Box
                                height={75}
                                width='80%'
                                color='#aaa7'
                                animation='fade'
                                onReady={this.state.ready}
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 15}}
                            >
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.item.images}
                                    renderItem={ItemComponent._renderItem}
                                    sliderWidth={wp('80%')}
                                    itemWidth={90}
                                />
                            </Placeholder.Box>
                            <Placeholder.Line
                                color="#aaa7"
                                width="77%"
                                animation='fade '
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 15}}
                                onReady={this.state.ready}
                            >
                                <H1 style={styles.name}>
                                    {this.state.item.name}
                                </H1>
                            </Placeholder.Line>
                            <Grid style={styles.buttonRow}>
                                <Col>
                                    <Button transparent icon info
                                        onPress={() => this.addFavorite()}
                                    >
                                        <Icon name='thumbs-up'/>
                                        <Text>
                                            Like
                                        </Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button icon transparent success
                                        onPress={() => this.navigate('Checkout', {itemId: this.state.itemId, item: this.state.item})}
                                    >
                                        <Icon name='cart'/>
                                        <Text>
                                            Order Now
                                        </Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </Card>
                        <View style={styles.bodyPane}>
                            <View style={styles.hView}>
                                <H3 style={styles.name}>
                                    Price: 
                                </H3>
                                <H3 style={styles.name}>
                                    ₦ 1000
                                </H3>
                            </View>
                            
                            <View style={styles.hView}>
                                <H3 style={styles.name}>
                                    Total number of orders: 
                                </H3>
                                <H3 style={styles.name}>
                                    1000
                                </H3>
                            </View>

                            <View style={styles.hView}>
                                <H3 style={[styles.name, widthPercentageToDP('40%')]}>
                                    Description:
                                </H3>
                                <View style={styles.descContainer}>
                                    <ViewMoreText
                                        numberOfLines={2}
                                        renderViewMore={ItemComponent.renderViewMore}
                                        renderViewLess={ItemComponent.renderViewLess}
                                    >
                                        <Text style={styles.desc}>
                                            A very lengthy description of the restaurant in question so that the user can have a brief understanding of what to expect should they find themselves there.
                                        </Text>
                                    </ViewMoreText>
                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
    navigate(route, params) {
        this.props.navigation.navigate(route, params);
    }

    navigateNested(navigator, route) {
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({
            routeName: route
        }));
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

const view = withNavigationFocus(ItemComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view)
