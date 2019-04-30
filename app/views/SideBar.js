import React from "react";
import { AppRegistry, Image, ImageBackground, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = [
    {
        value: 'Restaurants',
        title: 'My Restaurants'
    },
    {
        value:'ActiveOrders',
        title: 'Active Orders'
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
        title: 'Customers'
    },
    {
        value: 'Profile',
        title: 'Profile'
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
                            style={{ height: 80, width: 70 }}
                            source={{
                                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
                            }}
                        />
                    </ImageBackground>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data.value)}>
                                    <Text>{data.title}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}