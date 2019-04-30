import React, { Component } from 'react';
import {Text as RNText} from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, StyleProvider, Text, Button, Icon, Col, H2, H3, List, Separator, ListItem, Switch} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { Avatar, Icon as RNEIcon } from 'react-native-elements';
import styles from '../styles/SettingsStyle'
AnimatableContainer = Animatable.createAnimatableComponent(Container);

class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications:false,
            orderNotifications: false,
            availabilityNotification: false
        };
    }

    render() {
        return (
                this.props.navigation.isFocused &&
            <StyleProvider style={getTheme(platform)}>
                <AnimatableContainer animation='fadeInRight'>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                Settings
                            </Title>
                        </Body>
                    </Header>
                    <Content style={styles.body}>
                        <List>
                            <ListItem itemDivider style={styles.listHeaders} >
                                <H2 style={styles.sectionHeader}>
                                    Notifications
                                </H2>
                            </ListItem>
                            <ListItem icon>
                                <Body>
                                    <Text>
                                        Receive Push Notifications
                                    </Text>
                                    <RNText>
                                        Toggle Push Notifications
                                    </RNText>
                                </Body>
                                <Right>
                                    <Switch value={this.state.notifications} onValueChange={() => this.setState({notifications: !this.state.notifications})}/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Body>
                                    <RNText>
                                        Order Status
                                    </RNText>
                                </Body>
                                <Right>
                                    <Switch  
                                        disabled={!this.state.notifications}
                                        value={this.state.orderNotifications} 
                                        onValueChange={() => this.setState({orderNotifications: !this.state.orderNotifications})}/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Body>
                                    <RNText>
                                        Food Availability
                                    </RNText>
                                </Body>
                                <Right>
                                    <Switch  
                                        disabled={!this.state.notifications}
                                        value={this.state.availabilityNotification} 
                                        onValueChange={() => this.setState({availabilityNotification: !this.state.availabilityNotification})}/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Body>
                                    <RNText>
                                        
                                    </RNText>
                                </Body>
                                <Right>
                                    <Switch  
                                        disabled={!this.state.notifications}
                                        value={this.state.availabilityNotification} 
                                        onValueChange={() => this.setState({availabilityNotification: !this.state.availabilityNotification})}/>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </AnimatableContainer>
            </StyleProvider>
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
const view = withNavigation(SettingsComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view);