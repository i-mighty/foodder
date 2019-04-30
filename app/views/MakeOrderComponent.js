import React, { Component } from 'react';
import { ListView, Image } from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, StyleProvider, Text, Button, Icon, List, ListItem, Thumbnail, Card, CardItem, H3, Grid, Col} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
AnimatableContainer = Animatable.createAnimatableComponent(Container);

class MakeOrder extends Component {
    constructor(props) {
        super(props);
        let nav = this.props.navigation;
        this.state = {
            count: 1,
            item: nav.getParam('item', ''),
            itemId: nav.getParam('itemId', ''),
            price: 350,
        };
    }

    render(){
        let s = this.state;
        return(
            <StyleProvider style={getTheme(platform)}>
                <AnimatableContainer animation='fadeIn'>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                My Order
                            </Title>
                        </Body>
                        <Right>
                            
                        </Right>
                    </Header>
                    <Content style={{paddingHorizontal: widthPercentageToDP('9%')}}>
                        <Card style={{width: widthPercentageToDP('80%')}}>
                            <CardItem>
                                <Body>
                                    <H3>
                                        Ewa Agonyin
                                    </H3>
                                </Body>
                                <Right>
                                    <Text>
                                        Price: ₦{this.state.price * this.state.count}
                                    </Text>
                                </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/jollof1.jpeg')} style={{width: widthPercentageToDP('80%'), height: heightPercentageToDP('30%')}} resizeMode='center'/>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button light onPress={() => {
                                        var count = this.state.count-1;
                                        if(count >=1){
                                            this.setState({count})
                                        }
                                    }}>
                                        <Icon name='minus' type='AntDesign' />
                                    </Button>
                                </Left>
                                <Body style={{alignItems:'stretch', justifyContent: 'center'}}>
                                    <Text style={{textAlign: 'center', alignSelf:'stretch'}}>Quantity:</Text>
                                    <Text style={{textAlign: 'center', alignSelf:'stretch'}}>{this.state.count}</Text>
                                </Body>
                                <Right>
                                    <Button light onPress={() => {
                                        var count = this.state.count+1;
                                        this.setState({count})
                                    }}>
                                        <Icon name='plus' type='AntDesign' />
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>
                        <Button
                            success block
                            onPress={() => this.props.navigation.navigate('Payment', {
                                price: this.state.price * this.state.count,
                                description: 'Payment for '+s.count+' quantities of '+this.state.item.name+'.',
                                item: this.state.item,
                                itemId: this.state.itemId
                            })}
                        >
                            <Text>
                                Proceed
                            </Text>
                        </Button>
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

export default MakeOrder;