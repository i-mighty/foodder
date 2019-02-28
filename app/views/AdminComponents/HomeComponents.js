import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Thumbnail, Text, Right, Button, Icon, Switch, Row, Fab } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../../data/Actions';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';

AnimatableContainer = Animatable.createAnimatableComponent(Container);

class HomeView extends Component {
    constructor(props) {
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        super(props);
        this.state = {
            menuListData: [],
            fabActive: true,
        };
    }

    deleteItem(secId, rowId, rowMap) {
        //TODO: Delete from DB and update the list
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({
            menuListData: newData
        });
    }

    switchItemAvailable(rowId){
        //TODO:  Update db: Switch on success or just chill on failure
        var item = this.state.menuListData[rowId];
        item.available = !item.available;
        this.setState({
            items: update(this.state.menuListData, {[rowId]: {available: {$set: item.available}}})
        });
    }

    navigate(route){
        this.props.navigation.navigate(route);
    }

    navigateNested(navigator, route){
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({ routeName: route }));
    }

    render() {
        return (
        <Container>
            <Header>
                <Body>
                    <Title>
                        Menu
                    </Title>
                </Body>
            </Header>
            <Content>
                <List
                    dataSource={this.ds.cloneWithRows(this.state.menuListData)}
                    renderRow={item =>
                        <ListItem thumbnail>
                            <Left>
                                <CustomCachedImage
                                    component={Thumbnail}
                                    source={{uri: item.images[0]}}
                                    large square
                                />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.description}</Text>
                            </Body>
                            <Right>
                                <Row>
                                    <Button transparent onPress={() => this.deleteItem(secId, rowId, rowMap)}>
                                        <Icon name='trash'/>
                                    </Button>
                                    <Switch value={item.available} onMagicTap={ this.switchItemAvailable(rowId)}/>
                                </Row>
                            </Right>
                        </ListItem>
                    }
                />
                <Fab
                    active={this.state.fabActive}
                    position='bottomRight'
                    onPress={() => {
                        //navigate to new item form
                        alert('new Item')
                    }}>
                    <Icon name='add-circle'/>
                </Fab>
            </Content>
        </Container>
        );
    }
}

export default HomeView;