import React, { Component } from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native'
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, StyleProvider, Text, Button, Icon, H3, Row, Col} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import styles from '../styles/HomeStyle'
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import OverlayTile from './SubComponents/OverlayTile';
import FoodTile from './SubComponents/FoodTile';
import SectionLabel from './SubComponents/SectionLabel'
AnimatableContainer = Animatable.createAnimatableComponent(Container);
class HomeComponent extends Component {
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
                    <Header>
                        <Left>
                            
                        </Left>
                        <Body>
                            <Title>
                                Home
                            </Title>
                        </Body>
                        <Right>
                            
                        </Right>
                    </Header>
                    <Content contentContainerStyle={styles.body}>
                        <Row>
                            <FoodTile 
                                backgroundStyle={styles.bannerTile}
                                iconViewStyle={styles.bannerTileIcon}
                                iconStyle={styles.tileIcon}
                                iconName='contact'
                                type='banner'
                                onPress={() => {}}
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
                                    onPress={() => {}}
                                />
                            </Col>
                            <Col>
                                <FoodTile 
                                    backgroundStyle={styles.smallerTile}
                                    iconStyle={styles.tileIcon}
                                    iconViewStyle={styles.smallerTileIcon}
                                    iconName='contact'
                                    type='tile'
                                    onPress={() => {}}
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
                                    onPress={() => { }}
                                />
                            </Col>
                            <Col>
                                <FoodTile
                                    backgroundStyle={styles.smallerTile}
                                    iconStyle={styles.tileIcon}
                                    iconViewStyle={styles.smallerTileIcon}
                                    iconName='contact'
                                    type='tile'
                                    onPress={() => { }}
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
                                    onPress={() => { }}
                                />
                            </Col>
                            <Col>
                                <FoodTile
                                    backgroundStyle={styles.smallerTile}
                                    iconStyle={styles.tileIcon}
                                    iconViewStyle={styles.smallerTileIcon}
                                    iconName='contact'
                                    type='tile'
                                    onPress={() => { }}
                                />
                            </Col>
                        </Row>
                        <SectionLabel text='Bars and Lounges'/>
                        <Row style={styles.tileRow}>
                            <Col>
                                <FoodTile
                                    backgroundStyle={styles.smallerTile}
                                    iconStyle={styles.tileIcon}
                                    iconViewStyle={styles.smallerTileIcon}
                                    iconName='contact'
                                    type='tile'
                                    onPress={() => { }}
                                />
                            </Col>
                            <Col>
                                <FoodTile
                                    backgroundStyle={styles.smallerTile}
                                    iconStyle={styles.tileIcon}
                                    iconViewStyle={styles.smallerTileIcon}
                                    iconName='contact'
                                    type='tile'
                                    onPress={() => { }}
                                />
                            </Col>
                        </Row>
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
const view = withNavigation(HomeComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view);