import React, { Component } from 'react';
import {Text as RNText} from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, List, ListItem, Right, StyleProvider, Text, Button, Icon, Col, H1, H3, List, Separator, ListItem, View, Toast} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { Avatar, Icon as RNEIcon } from 'react-native-elements';
import styles from '../styles/ProfileStyle'
import firebase from "react-native-firebase";

const db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore();

AnimatableContainer = Animatable.createAnimatableComponent(Container);
class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        };
    }

    componentDidMount(){
        var favorites = [];
        fs.collection('favorites').doc(this.props.user.uid).collection().get().then(res => {
            res.docs.forEach(doc => favorites.push(doc.data()))
            this.setState({favorites});
        }).catch(err => {
            Toast.show({
                type: 'danger', 
                text: 'Could not detect an internet connection.\nPlease check your internet connection'
            })
        })
    }

    render() {
        return (
            this.props.isFocused &&
            <AnimatableContainer animation='fadeIn'>
                <StyleProvider style={getTheme(platform)}>
                    <Header searchBar>
                        <Body>
                            <Title>
                                My Profile
                            </Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate('Settings')}>
                                <Icon name='settings'/>
                            </Button>
                        </Right>
                    </Header>
                </StyleProvider>
                <StyleProvider style={getTheme(platform)}>
                    <Content>
                        <Col style={styles.userPane}>
                            <Avatar
                                size="large"
                                source={{
                                    uri: ''
                                }}
                                editButton={<Icon name='camera'/>}
                                title="MD"
                                rounded
                                showEditButton
                                avatarStyle={styles.userPaneItems}
                            />   
                            <H1 style={styles.userPaneItems}>
                                {this.props.user.name}
                            </H1>
                            <H3 style={styles.userPaneItems}>
                                {this.props.user.phoneNumber}
                            </H3>                         
                        </Col>
                        <List>
                            <Separator>
                                <Text>
                                    Favorites
                                </Text>
                            </Separator>
                        </List>
                        {
                            this.state.favorites.length > 0?(
                                <List
                                    dataArray={this.state.favorites}
                                    renderRow={data =>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail
                                                source={{ uri: data.item.images[0]}}
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
                                            {/* <Button transparent danger>
                                                <Text>Remove</Text>
                                            </Button> */}
                                        </Right>
                                    </ListItem>}
                                />
                            ):(
                                <View style={styles.noFollowersView}>
                                    <Icon name={'list'} type={'Entypo'} style={styles.noFollowersIcon}/>
                                    <Text style={styles.noFollowersText}>
                                        No favorites yet
                                    </Text>
                                    <Text note>
                                        Food items you like would appear here
                                    </Text>
                                </View>
                            )
                        }
                    </Content>
                </StyleProvider>
            </AnimatableContainer>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(ProfileComponent));