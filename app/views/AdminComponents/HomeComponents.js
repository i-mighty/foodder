import React, { Component } from 'react';
import { View, ListView, LayoutAnimation } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Thumbnail, Text, Right, Button, Icon, Switch, Row, Fab, StyleProvider } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../../data/Actions';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';
import styles from '../../styles/AdminHomeStyle'
import update from 'immutability-helper';

AnimatableContainer = Animatable.createAnimatableComponent(Container);
const datas = [
    {
        name: 'alalalalala',
        images: ['https://www.errenskitchen.com/wp-content/uploads/2015/02/Quick-Easy-Spaghetti-Bolognese2-1.jpg', 'https://www.recipes.co.nz/ic/3858989205/Spaghetti-Bolognese-or-Pasta.1.1.jpg'],
        available: true,
        description: 'whqweuihq0ohfqhfqofhofqjdfolqkndosdvjwovmwopfiwlekvnwlf  w wfwkfwoojgkwkpfgoijwkefwpfjowfwpogfwnfwpfjwfpwgjwfwpofljwpfowejlf wpfwjjefwpgfwjftwmeofjwpefoofjjop'
    },
    {
        name: 'babababababababa',
        images: ['https://www.errenskitchen.com/wp-content/uploads/2015/02/Quick-Easy-Spaghetti-Bolognese2-1.jpg', 'https://www.recipes.co.nz/ic/3858989205/Spaghetti-Bolognese-or-Pasta.1.1.jpg'],
        available: false,
        description: 'whqweuihq0ohfqhfqofhofqjdfolqkndosdvjwovmwopfiwlekvnwlf  w wfwkfwoojgkwkpfgoijwkefwpfjowfwpogfwnfwpfjwfpwgjwfwpofljwpfowejlf wpfwjjefwpgfwjftwmeofjwpefoofjjop'
    }
];
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            menuListData: datas,
            fabActive: true,
            isActionButtonVisible: true
        };
    }

    _listViewOffset = 0;

    deleteItem(secId, rowId, rowMap) {
        //TODO: Delete from DB and update the list
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.menuListData];
        newData.splice(rowId, 1);
        this.setState({
            menuListData: newData
        });
    }

    switchItemAvailable(secId, rowId, rowMap){
        //TODO:  Update db: Switch on success or just chill on failure
        
        alert(rowId)
        var item = this.state.menuListData[rowId];
        var newItem = !item.available;
        this.setState({
            menuListData: update(this.state.menuListData[rowId], {$set: newItem})
        });
    }

    navigate(route){
        this.props.navigation.navigate(route);
    }

    navigateNested(navigator, route){
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({ routeName: route }));
    }

    _onScroll = (event) => {
        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
            duration: 100,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            delete: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            }
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset) ?
            'down' :
            'up'
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up'
        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({
                isActionButtonVisible
            })
        }
        // Update your scroll position
        this._listViewOffset = currentOffset
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container>
                    <Header>
                        <Body>
                            <Title>
                                Menu
                            </Title>
                        </Body>
                    </Header>
                    <View style={{flex: 1}}>
                        <List
                            leftOpenValue={70}
                            rightOpenValue={-70}
                            dataSource={this.ds.cloneWithRows(this.state.menuListData)}
                            renderRow={(item, secId, rowId, rowMap) =>
                                <ListItem thumbnail>
                                    <Left>
                                        <CustomCachedImage
                                            component={Thumbnail}
                                            source={{uri: item.images[0]}}
                                            square
                                        />
                                    </Left>
                                    <Body>
                                        <Text>{item.name}</Text>
                                        <Text note numberOfLines={2}>{item.description}</Text>
                                    </Body>
                                    <Right>
                                        <Row>
                                            <Switch value={item.available} onValueChange={()=> this.switchItemAvailable(secId, rowId, rowMap)}/>
                                        </Row>
                                    </Right>
                                </ListItem>
                            }
                            renderLeftHiddenRow={data =>
                                <Button full info onPress={() => alert(data)}>
                                    <Icon active name="edit" type='Entypo' />
                                </Button>
                            }
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => this.deleteItem(secId, rowId, rowMap)}>
                                    <Icon active name="trash" />
                                </Button>
                            }
                        />
                        <Fab
                            active={this.state.fabActive}
                            position='bottomRight'
                            style={{backgroundColor: platform.brandPrimary}}
                            onPress={() => {
                                
                            }}>
                            <Icon name='add'/>
                        </Fab>
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}

export default HomeView;