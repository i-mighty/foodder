import React, { Component } from 'react';
import { View, ListView, LayoutAnimation } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Thumbnail, Text, Right, Button, Icon, Switch, Row, Fab, StyleProvider, Toast } from 'native-base';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {withNavigationFocus} from 'react-navigation'
import {bindActionCreators} from 'redux';
import {saveUser, saveAdmin} from '../../data/Actions';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';
import styles from '../../styles/AdminHomeStyle'
import update from 'immutability-helper';
import firebase from 'react-native-firebase';

AnimatableContainer = Animatable.createAnimatableComponent(Container);

const db = firebase.database();
const fs = firebase.firestore();
const datas = [
    {
        name: 'alalalalala',
        images: ['https://www.errenskitchen.com/wp-content/uploads/2015/02/Quick-Easy-Spaghetti-Bolognese2-1.jpg', 'https://www.recipes.co.nz/ic/3858989205/Spaghetti-Bolognese-or-Pasta.1.1.jpg'],
        open: true,
        description: 'whqweuihq0ohfqhfqofhofqjdfolqkndosdvjwovmwopfiwlekvnwlf  w wfwkfwoojgkwkpfgoijwkefwpfjowfwpogfwnfwpfjwfpwgjwfwpofljwpfowejlf wpfwjjefwpgfwjftwmeofjwpefoofjjop'
    },
    {
        name: 'babababababababa',
        images: ['https://www.errenskitchen.com/wp-content/uploads/2015/02/Quick-Easy-Spaghetti-Bolognese2-1.jpg', 'https://www.recipes.co.nz/ic/3858989205/Spaghetti-Bolognese-or-Pasta.1.1.jpg'],
        open: false,
        description: 'whqweuihq0ohfqhfqofhofqjdfolqkndosdvjwovmwopfiwlekvnwlf  w wfwkfwoojgkwkpfgoijwkefwpfjowfwpogfwnfwpfjwfpwgjwfwpofljwpfowejlf wpfwjjefwpgfwjftwmeofjwpefoofjjop'
    }
];
class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            ownerId: this.props.navigation.getParam('ownerId', ''),
            owner: this.props.navigation.getParam('owner', {}),
            resList: [],
            resIdList: [],
            fabActive: true,
            isActionButtonVisible: true
        };
    }

    async componentDidMount(){
        await this.updateResList();
    }

    async updateResList(){
        var s = this.state;
        var resList = [];
        var resIdList = [];
        fs.collection('restaurants').where('ownerId', '==', s.ownerId).limit(50).get().then(res =>{
            res.docs.forEach((val) =>{
                resIdList.push(val.id);
                resList.push(val.data());
                this.setState({resList, resIdList})
            })
        }).catch(err => {
            Toast.show({
                text: 'An error occurred'+err.message,
                type: 'danger'
            })
        })
    }

    _listViewOffset = 0;

    async deleteItem(secId, rowId, rowMap) {
        try {
            await fs.collection('restaurants').doc(this.state.resIdList[rowId]).delete();
            /*DONE: Delete from DB and update the list*/
            rowMap[`${secId}${rowId}`].props.closeRow();
            const newData = [...this.state.menuListData];
            newData.splice(rowId, 1);
            this.setState({
                resList: newData
            });
            await this.updateResList();
            Toast.show({
                text: 'Restaurant deleted successfully.'
            })
        } catch (err) {
            Toast.show({
                type: 'danger',
                text: 'Could not delete the restaurant.\nPlease check your network connection.'
            })
        }
    }

    editItem(secId, rowId, rowMap){
        Toast.show({
            text: 'This is service is currently not available',
            duration: 7000
        })
    }

    switchItemAvailable(secId, rowId, rowMap) {
        //TODO:  Update db: Switch on success or just chill on failure

        var arr = this.state.resList;
        var item = arr[rowId];
        var oldValue = item.open;

        fs.collection("restaurants").doc(this.state.resIdList[rowId]).update({open: !oldValue}).then(res => {
            item['open'] = !oldValue;
            arr[rowId] = item;
            this.setState({
                resList: arr
            });
        }).catch(err => {
            Toast.show({
                type: 'danger', 
                text: 'Could not update your restaurant.'
            })
        })
    }

    navigate(route, params){
        params===undefined?
        this.props.navigation.navigate(route):
        this.props.navigation.navigate(route, params)
    }

    navigateNested(navigator, route){
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({ routeName: route }));
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name={'menu'}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                My Restaurants
                            </Title>
                        </Body>
                    </Header>
                    <View style={{flex: 1}}>
                        {
                            this.state.resList.length>0?(
                                <List
                                    leftOpenValue={70}
                                    rightOpenValue={-70}
                                    dataSource={this.ds.cloneWithRows(this.state.resList)}
                                    renderRow={(item, secId, rowId, rowMap) =>
                                        <ListItem thumbnail button onPress={() => this.navigate('Home', {resId: this.state.resIdList[rowId]})}>
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
                                                    <Switch value={item.open} onValueChange={()=> this.switchItemAvailable(secId, rowId, rowMap)}/>
                                                </Row>
                                            </Right>
                                        </ListItem>
                                    }
                                    renderLeftHiddenRow={data =>
                                        <Button full info onPress={() => this.editItem(secId, rowId, rowMap)}>
                                            <Icon active name="edit" type='Entypo' />
                                        </Button>
                                    }
                                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger onPress={_ => this.deleteItem(secId, rowId, rowMap)}>
                                            <Icon active name="trash" />
                                        </Button>
                                    }
                                />
                            ):(<View style={styles.noFollowersView}>
                                    <Icon name={'pizza'} style={styles.noFollowersIcon}/>
                                    <Text style={styles.noFollowersText}>
                                        Build your business right away
                                    </Text>
                                    <Text note>
                                        Add a restaurant
                                    </Text>
                                    <Button transparent full larges iconRight onPress={() => {
                                        this.navigate('AddRestaurant', {ownerId: this.state.ownerId})//TODO: 
                                    }}>
                                        <Text>
                                            Add
                                        </Text>
                                        <Icon name={'plus'} type={'AntDesign'}/>
                                    </Button>
                                </View>
                            )
                        }
                        <Fab
                            active={this.state.fabActive}
                            position='bottomRight'
                            style={{backgroundColor: platform.brandPrimary}}
                            onPress={() => {
                                this.navigate('AddRestaurant', {ownerId: this.state.ownerId})//TODO: 
                            }}>
                            <Icon name='add'/>
                        </Fab>
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}
const mapStateToProps = ({admin}) =>{
    return {admin}
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveAdmin
    }, dispatch)
);
const view = withNavigationFocus(RestaurantList)
export default connect(mapStateToProps, mapDispatchToProps)(view);