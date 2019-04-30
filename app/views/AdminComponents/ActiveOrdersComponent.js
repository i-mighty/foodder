import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import AnimatedComponent from '../AnimatedComponent';
import moment from 'moment';
import platform from '../../native-base-theme/variables/platform';
import getTheme from '../../native-base-theme/components';
import { Container, Header, Left, Right, Icon, Body, Text, Content, List, Button, Thumbnail, ListItem, Title } from 'native-base';
import { CustomCachedImage } from 'react-native-img-cache';
import firebase from 'react-native-firebase';
import { Toast } from 'native-base';

const db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore();

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
];
class ActiveOrdersComponent extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listViewData: datas
        };
    }

    componentDidMount(){
        fs.collection('orders').where('')
    }

    render() {
        return (
            <AnimatedComponent>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name={'menu'}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                Active Orders
                            </Title>
                        </Body>
                    </Header>
                    <Content>
                            <List
                                leftOpenValue={0}
                                rightOpenValue={0}
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                renderRow={data =>
                                <ListItem thumbnail>
                                    <Left>
                                        <CustomCachedImage
                                            component={Thumbnail}
                                            source={{ uri: "https://pbs.twimg.com/profile_images/1093487464113676288/zKSPK3PR_400x400.jpg"}}
                                            square
                                        />
                                    </Left>
                                    <Body>
                                        <Text> {data} </Text>
                                        <Text note numberOfLines={2}>{data}</Text>
                                    </Body>
                                    <Right>
                                        <Text note>
                                            {moment().format('L')}
                                        </Text>
                                        <Text note>
                                            {moment().format('LTS')}
                                        </Text>
                                    </Right>
                                </ListItem>}
                                renderLeftHiddenRow={data =>
                                <Button full onPress={() => alert(data)}>
                                    <Icon active name="checkmark" />
                                </Button>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={ () => this.deleteRow(secId, rowId, rowMap)}>
                                    <Icon type='FontAwesome5' active name="dolly" />
                                </Button>}
                            />
                    </Content>
                </Container>
            </AnimatedComponent>
        );
    }
}

export default ActiveOrdersComponent;
