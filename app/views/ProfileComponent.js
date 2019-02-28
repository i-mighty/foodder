import React, { Component } from 'react';
import {Text as RNText} from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, StyleProvider, Text, Button, Icon, Col, H1, H3, List, Separator, ListItem} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { Avatar, Icon as RNEIcon } from 'react-native-elements';
import styles from '../styles/ProfileStyle'
AnimatableContainer = Animatable.createAnimatableComponent(Container);
class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
                this.props.navigation.isFocused &&
            <StyleProvider style={getTheme(platform)}>
                <AnimatableContainer animation='fadeIn'>
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
                    <Content>
                        <Col style={styles.userPane}>
                            <Avatar
                                size="xlarge"
                                source={{
                                    uri: ''
                                }}
                                editButton={<RNEIcon name='camera'/>}
                                title="MD"
                                rounded
                                showEditButton
                                avatarStyle={styles.userPaneItems}
                            />   
                            <H1 style={styles.userPaneItems}>
                                Display Name
                            </H1>
                            <H3 style={styles.userPaneItems}>
                                Phone Number
                            </H3>                         
                        </Col>
                        <List>
                            <Separator/>
                            <ListItem icon>
                                <Left>
                                    <Button primary >
                                        <Icon name='card'/>
                                    </Button>
                                </Left>
                                <Body>
                                    <RNText>
                                        Manage Your Accounts
                                    </RNText>
                                </Body>
                                <Right>
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button light >
                                        <Icon name='clock'/>
                                    </Button>
                                </Left>
                                <Body>
                                    <RNText>
                                        Payment History
                                    </RNText>
                                </Body>
                                <Right>
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button info >
                                        <Icon name='person'/>
                                    </Button>
                                </Left>
                                <Body>
                                    <RNText>
                                        Edit Your Profile
                                    </RNText>
                                </Body>
                                <Right>
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button danger >
                                        <Icon name='log-out'/>
                                    </Button>
                                </Left>
                                <Body>
                                    <RNText>
                                        Log out
                                    </RNText>
                                </Body>
                                <Right>
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </AnimatableContainer>
            </StyleProvider>
        );
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
const view = withNavigation(ProfileComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view);