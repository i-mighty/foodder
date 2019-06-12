import React from "react";
import { AppRegistry, Image, ImageBackground, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, H3, Left, Body, Icon } from "native-base";
const routes = [
    {
        value: 'Restaurant',
        title: 'My Restaurants',
        icon: 'restaurant'
    },
    {
        value:'ActiveOrders',
        title: 'Active Orders', 
        icon: 'clipboard'
    },
    // {
    //     value:'AddItems',
    //     title: 'Add Item'
    // },
    // {
    //     value:'AddRestaurant',
    //     title: 'Add Restaurant',
    // },
    {
        value:'Customers',
        title: 'Customers',
        icon: 'people'
    },
    {
        value: 'Profile',
        title: 'Profile', 
        icon: 'contact'
    },
];
export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <ImageBackground
                        source={require('../assets/38-material-design.jpg')}
                        style={{
                            height: 250,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Image
                            square
                            style={{ height: 150, width: 150, borderRadius: 75 }}
                            source={require('../assets/logo.png')}
                        />
                    </ImageBackground>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    icon
                                    button
                                    onPress={() => this.props.navigation.navigate(data.value)}
                                    style={{paddingVertical: 30}}>
                                    <Left>
                                        <Icon name={data.icon} style={style}/>
                                    </Left>
                                    <Body>
                                        <H3 style={style}>{data.title}</H3>
                                    </Body>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}
const style = {color: '#555'};