import React, { Component } from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native'
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, Text, Button, Icon, H3, Row, Col, StyleProvider} from 'native-base'
import { withNavigationFocus } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import styles from '../styles/HomeStyle'
import OverlayTile from './SubComponents/OverlayTile';
import FoodTile from './SubComponents/FoodTile';
import SectionLabel from './SubComponents/SectionLabel'
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
AnimatableContainer = Animatable.createAnimatableComponent(Container);

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            this.props.isFocused &&
                <AnimatableContainer animation='fadeIn'>
                    <StyleProvider style={getTheme(platform)}>
                        <Header>
                            <Body>
                                <Title>
                                    Menu
                                </Title>
                            </Body>
                        </Header>
                    </StyleProvider>
                    <StyleProvider style={getTheme(platform)}>
                        <Content contentContainerStyle={styles.body}>
                            <Row>
                                <FoodTile 
                                    backgroundStyle={styles.bannerTile}
                                    iconViewStyle={styles.bannerTileIcon}
                                    iconStyle={styles.tileIcon}
                                    iconName='contact'
                                    type='banner'
                                    onPress={() => {this.navigate('Place')}}
                                />
                            </Row>
                            <SectionLabel text='Foods'/>
                            <Row style={styles.tileRow}>
                                <Col>
                                    <FoodTile 
                                        backgroundStyle={styles.smallerTile}
                                        iconStyle={styles.tileIcon}
                                        iconViewStyle={styles.smallerTileIcon}
                                        iconName='contact'
                                        type='tile'
                                        onPress={() => {this.navigate('Item')}}
                                    />
                                </Col>
                                <Col>
                                    <FoodTile 
                                        backgroundStyle={styles.smallerTile}
                                        iconStyle={styles.tileIcon}
                                        iconViewStyle={styles.smallerTileIcon}
                                        iconName='contact'
                                        type='tile'
                                        onPress={() => {this.navigate('Item')}}
                                    />
                                </Col>
                            </Row>
                            <SectionLabel text='Drinks and Beverages'/>
                            <Row style={styles.tileRow}>
                                <Col>
                                    <FoodTile
                                        backgroundStyle={styles.smallerTile}
                                        iconStyle={styles.tileIcon}
                                        iconViewStyle={styles.smallerTileIcon}
                                        iconName='contact'
                                        type='tile'
                                        onPress={() => {this.navigate('Item')}}
                                    />
                                </Col>
                                <Col>
                                    <FoodTile
                                        backgroundStyle={styles.smallerTile}
                                        iconStyle={styles.tileIcon}
                                        iconViewStyle={styles.smallerTileIcon}
                                        iconName='contact'
                                        type='tile'
                                        onPress={() => {this.navigate('Item')}}
                                    />
                                </Col>
                            </Row>
                            <SectionLabel text='Special Diets'/>
                            <Row style={styles.tileRow}>
                                <Col>
                                    <FoodTile
                                        backgroundStyle={styles.smallerTile}
                                        iconStyle={styles.tileIcon}
                                        iconViewStyle={styles.smallerTileIcon}
                                        iconName='contact'
                                        type='tile'
                                        onPress={() => {this.navigate('Item')}}
                                    />
                                </Col>
                                <Col>
                                    <FoodTile
                                        backgroundStyle={styles.smallerTile}
                                        iconStyle={styles.tileIcon}
                                        iconViewStyle={styles.smallerTileIcon}
                                        iconName='contact'
                                        type='tile'
                                        onPress={() => {this.navigate('Item')}}
                                    />
                                </Col>
                            </Row>
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
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUser
    }, dispatch)
);
const view = withNavigationFocus(HomeComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view);