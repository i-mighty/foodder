import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import AnimatedComponent from '../AnimatedComponent';
import moment from 'moment';
import { Container, Header, Left, Right, Icon, Body, Text, Content, List, Button, Thumbnail, ListItem, Title } from 'native-base';
import { CustomCachedImage } from 'react-native-img-cache';

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

    render() {
        return (
            <AnimatedComponent>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back'/>
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
                                    <Icon active name="trash" />
                                </Button>}
                            />
                    </Content>
                </Container>
            </AnimatedComponent>
        );
    }
}

export default ActiveOrdersComponent;
