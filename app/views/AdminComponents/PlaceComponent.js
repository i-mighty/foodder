import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import { Container, Content, Tabs, Tab, TabHeading, Icon, StyleProvider, Text, H2, H1, List, Separator, ListItem, Thumbnail, Left, Body, Button, Right, Toast } from 'native-base';
import { Avatar, Badge } from 'react-native-elements';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { CachedImageBackground } from 'react-native-img-cache';
import styles from '../../styles/PlaceStyle'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GreenIcon from '../SubComponents/GreenIcon';
import ViewMoreText from 'react-native-view-more-text';
import Dialog from "react-native-dialog";
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'react-native-firebase';
import Placeholder from 'rn-placeholder';

const db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore();
class PlaceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            placeId: 'Fv8seorjV4JvIyd86sjN', //TODO: Update to value from navigation props
            place:{},
            menu:[],
            menuIds:[],
            followers: [],
            origin: {},
            destination:{},
            directionDialog: true,
            getDirections: false,
            marker: {},
            lat: 9,
            lng: 4,
            mLat: null,
            mLng: null,
            firstChar:'',
            img:''
        };
    }

    componentDidMount(){
        let origin = {};
        Geolocation.getCurrentPosition((res) => {
            origin['latitude'] = res.coords.latitude;
            origin['longitude'] = res.coords.longitude;
            this.setState({
                lat: res.coords.latitude, 
                lng: res.coords.longitude, 
                mLat: res.coords.latitude, 
                mLng: res.coords.longitude,
                origin
            });
        }, (err) =>{
            Toast.show({
                text: 'Could not get current location: '+err.message,
                type: 'danger'
            })
        },{ enableHighAccuracy: true, timeout: 20000 });
        let menu = [];
        let menuIds = [];
        let followers = [];
        fs.collection('restaurants').doc(this.state.placeId).get().then(value => {
            let res = value.data();
            let destination = {};
            destination['latitude'] = res.location.latitude;
            destination['longitude'] = res.location.longitude;
            this.setState({place: res, ready: true, firstChar: res.name.charAt(0), img: res.images[0]});
            this.setState({
                lat: res.location.latitude,
                lng: res.location.longitude,
                mLat: res.location.latitude,
                mLng: res.location.longitude,
                destination
            });
            fs.collection('items').where('restaurant', '==', this.state.placeId).get().then(res => {
                res.docs.forEach((value, index, arr) =>{
                    menuIds.push(value.id);
                    menu.push(value.data());
                });
                this.setState({menu, menuIds})
            });
        });

        fs.collection('restaurants/'+this.state.placeId+'/followers').limit(50).get().then(res =>{
            res.docs.map((value) =>{
                followers.push(value.data())
            });
            this.setState({followers})
        })
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
                        <View style={styles.topPane}>
                            <Placeholder.Box
                                height={100}
                                width={100}
                                radius={50}
                                color="teal"
                                animation='shine'
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 20}}
                                onReady={this.state.ready}
                            >
                                <Avatar
                                    rounded
                                    size={100}
                                    title={this.state.firstChar}
                                    source={{uri: this.state.img}}
                                    containerStyle={styles.avatar}
                                />
                            </Placeholder.Box>
                            <Placeholder.Line
                                color="#aaa7"
                                width="30%"
                                animation='fade '
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 15}}
                                onReady={this.state.ready}
                            >
                                <Badge
                                    status='error'
                                    value={<Text style={styles.badgeText}>Closed</Text>}
                                    badgeStyle={styles.badgeContainer}
                                />
                            </Placeholder.Line>
                            <Placeholder.Line
                                color="#aaa7"
                                width="77%"
                                animation='fade '
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 15}}
                                onReady={this.state.ready}
                            >
                                <H1 style={{marginVertical: heightPercentageToDP('1%'), marginHorizontal: heightPercentageToDP('1%')}}>
                                    {this.state.place.name}
                                </H1>
                            </Placeholder.Line>
                            <Placeholder.Line
                                color="#aaa7"
                                width="77%"
                                animation='fade '
                                style={{alignItems: 'center', alignSelf: 'center', marginVertical: 15}}
                                onReady={this.state.ready}
                            >
                                <ViewMoreText
                                    numberOfLines={1}
                                    renderViewMore={PlaceView.renderViewMore}
                                    renderViewLess={PlaceView.renderViewLess}
                                >
                                    <Text style={styles.desc}>
                                        {this.state.place.description}
                                    </Text>
                                </ViewMoreText>
                            </Placeholder.Line>
                        </View>
                        <Tabs >
                            <Tab  heading={
                                <TabHeading>
                                    <Icon name='information-circle'/>
                                    <Text>Menu</Text>
                                </TabHeading>
                            }>
                                {
                                    this.state.menu.length > 0?(
                                        <List
                                            dataArray={this.state.menu}
                                            renderRow={(item, IDK, index) =>
                                                <ListItem avatar button onPress={this.goToItem(this.state.menuIds[index])}>
                                                    <Left>
                                                        <Thumbnail source={{ uri: item.images[0] }} />
                                                    </Left>
                                                    <Body>
                                                        <Text>
                                                            {item.name}
                                                        </Text>
                                                    </Body>
                                                    <Right>
                                                        <Badge>
                                                            <Text>Available</Text>
                                                        </Badge>
                                                    </Right>
                                                </ListItem>
                                            }
                                        />
                                    ):(
                                        <View style={styles.noFollowersView}>
                                            <Icon name={'list'} type={'Entypo'} style={styles.noFollowersIcon}/>
                                            <Text style={styles.noFollowersText}>
                                                Your menu is empty
                                            </Text>
                                            <Text note>
                                                Add an item to your menu now.
                                            </Text>
                                            <Button transparent full larges iconRight>
                                                <Text>
                                                    Add item
                                                </Text>
                                                <Icon name={'plus'} type={'AntDesign'}/>
                                            </Button>
                                        </View>
                                    )
                                }
                            </Tab>
                            <Tab heading={
                                <TabHeading>
                                    <Icon name='people' />
                                    <Text>Followers</Text>
                                </TabHeading>
                            }>
                                {
                                    this.state.followers.length>0?(null):(
                                        <View style={styles.noFollowersView}>
                                            <Icon name={'notifications-active'} type={'MaterialIcons'} style={styles.noFollowersIcon}/>
                                            <Text style={styles.noFollowersText}>
                                                No followers yet
                                            </Text>
                                            <Text note>
                                                Be the first person to follow us at {this.state.place.name}.
                                            </Text>
                                            <Button transparent full larges iconRight>
                                                <Text>
                                                    Follow
                                                </Text>
                                                <Icon name={'plus'} type={'AntDesign'}/>
                                            </Button>
                                        </View>
                                    )
                                }
                            </Tab>
                            <Tab heading={
                                <TabHeading>
                                    <Icon type='Entypo' name='location'/>
                                    <Text>Location</Text>
                                </TabHeading>
                            }>
                                <MapView
                                    style={ styles.map }
                                    initialRegion={{
                                        latitude: this.state.lat,
                                        longitude: this.state.lng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                        }}
                                    showsUserLocation={true}
                                    provider='google'
                                >
                                    <Marker
                                        coordinate={this.state.origin}
                                        pinColor={platform.brandLight}
                                    />
                                    {
                                        this.state.getDirections?(
                                            <Marker coordinate = {this.state.destination} pinColor={platform.brandDark}/>
                                        ):(null)
                                    }
                                    {
                                        this.state.getDirections?(
                                            <MapViewDirections
                                                origin={this.state.origin}
                                                destination={this.state.destination}
                                                apikey={'AIzaSyCkQ67hH1L5PYGkKHQwyshjdzGzfMM4grA'}
                                                strokeWidth={3}
                                                strokeColor={platform.brandPrimary}
                                            />
                                        ):(null)
                                    }
                                </MapView>
                            </Tab>
                        </Tabs>
                        <Dialog.Container visible={this.state.directionDialog}>
                            <Dialog.Title>Get Directions?</Dialog.Title>
                            <Dialog.Description>
                                Would you like to get directions from your current location
                            </Dialog.Description>
                            <Dialog.Button label="Cancel" onPress={() => this.setState({getDirections: false, directionDialog: false})}/>
                            <Dialog.Button label="Okay" onPress={() => this.setState({getDirections: true, directionDialog: false})}/>
                        </Dialog.Container>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    goToItem(id){
        this.navigation.navigate('Item', {
            itemId: id
        })
    }

    changeLocation(res){
        this.setState({
            mLat: res.nativeEvent.coordinate.latitude,
            mLng: res.nativeEvent.coordinate.longitude
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

export default PlaceView;
