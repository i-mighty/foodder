import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Tabs, Tab, TabHeading, Icon, StyleProvider, Text, H2, H1, List, Separator, ListItem, Left, Body, Right } from 'native-base';
import { Avatar, Badge } from 'react-native-elements';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { CachedImageBackground } from 'react-native-img-cache';
import styles from '../styles/PlaceStyle'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GreenIcon from './SubComponents/GreenIcon';

class PlaceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu:[],
            followers: []
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container>
                    <Content>
                        <View style={styles.topPane}>
                                <Avatar 
                                    rounded
                                    size='large'
                                    title="MD"
                                    containerStyle={styles.avatar}
                                />
                                <Badge
                                    status='success'
                                    value={<Text style={styles.badgeText}>Open</Text>}
                                    badgeStyle={styles.badgeContainer}
                                />
                            <H1 style={{marginVertical: heightPercentageToDP('1%'), marginHorizontal: heightPercentageToDP('1%')}}>
                                The Restaurant Name
                            </H1>
                            <Text style={{marginVertical: heightPercentageToDP('1%'), marginHorizontal: heightPercentageToDP('1%')}} numberOfLines={2}>
                                A very lengthy description of the restaurant in question so that the user can have a brief understanding of what to expect should they find themselves there.
                            </Text>
                        </View>
                        <Tabs>
                            <Tab heading={
                                <TabHeading>
                                    <Icon name='information-circle'/>
                                    <Text>Infos</Text>
                                </TabHeading>
                            }>
                                <List>
                                    <Separator bordered>
                                        <Text>Basic Information</Text>
                                    </Separator>
                                    <ListItem icon>
                                        <Left>
                                            <GreenIcon name='person'/>
                                        </Left>
                                        <Body>
                                            <Text>Restaurant Owner</Text>
                                        </Body>
                                        <Right>
                                            <Text>
                                                James Abdul
                                            </Text>
                                        </Right>
                                    </ListItem>
                                    <ListItem icon>
                                        <Left>
                                            <GreenIcon type='FontAwesome5' name='door-open'/>
                                        </Left>
                                        <Body>
                                            <Text>
                                                Opens Daily at
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text>
                                                8:00 AM
                                            </Text>
                                        </Right>
                                    </ListItem>
                                    <ListItem icon>
                                        <Left>
                                            <GreenIcon type='FontAwesome5' name='door-closed'/>
                                        </Left>
                                        <Body>
                                            <Text>
                                                Closes Daily at
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text>
                                                8:00 PM
                                            </Text>
                                        </Right>
                                    </ListItem>
                                    <Separator bordered>
                                        <Text>Menu</Text>
                                    </Separator>
                                </List>
                            </Tab>
                            <Tab heading={
                                <TabHeading>
                                    <Icon name='people' />
                                    <Text>Followers</Text>
                                </TabHeading>
                            }>
                                
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
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                    }}
                                >
                                    <Marker draggable
                                        coordinate = {
                                            {
                                                latitude: 37.78825,
                                                longitude: -122.4324,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            }
                                        }
                                        pinColor={platform.brandLight}
                                    />
                                </MapView>
                            </Tab>
                        </Tabs>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

export default PlaceView;