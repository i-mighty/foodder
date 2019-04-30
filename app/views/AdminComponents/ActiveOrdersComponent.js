import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import AnimatedComponent from '../AnimatedComponent';
import StyledHeader from '../StyledHeader';
import StyledContent from '../StyledContent';
import moment from 'moment';
import platform from '../../native-base-theme/variables/platform';
import getTheme from '../../native-base-theme/components';
import { Container, Header, Left, Right, Icon, Body, Text, Content, List, Button, Thumbnail, ListItem, Title } from 'native-base';
import { CustomCachedImage } from 'react-native-img-cache';
import firebase from 'react-native-firebase';
import {withNavigationFocus} from 'react-navigation'
import { Toast } from 'native-base';
import styles from '../../styles/AdminHomeStyle'
import { ProgressDialog } from 'react-native-simple-dialogs';
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
            listViewData: datas,
            restaurantId: this.props.navigation.getParam('restaurantId', ''),
            ordersId:[],
            orders:[],
            users:[],
            loading: false
        };
    }

    componentDidMount(){
        var orders = [];
        var ordersId= [];
        var users = [];
        fs.collection('orders').where('restaurantId', '==', this.state.restaurantId).where('completed', '==', false).onSnapshot((res) =>{
            res.docs.forEach((val, index, arr) =>{
                orders.push(val.data());
                ordersId.push(val.id);
                this.setState({orders, ordersId});
                fs.collection('users').doc(val.get('userId')).get().then(res => {
                    users.push(res.data());
                    this.setState({users})
                })
            })
        }, (err) =>{

        })
    }

    deleteRow(secId, rowId, rowMap) {
        //remote upload
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({
            listViewData: newData
        });
    }

    confirmDispatch(id){
        fs.collection('orders').doc(this.state.ordersId[id]).update({dispatch: true}).then(res =>{

        }).catch(err =>{

        })
    }

    render() {
        return (
            <AnimatedComponent>
                <Container>
                    <StyledHeader>
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
                    </StyledHeader>
                    <StyledContent>
                        {
                            this.state.orders.length>0?(
                                <List
                                    leftOpenValue={80}
                                    rightOpenValue={-80}
                                    dataSource={this.ds.cloneWithRows(this.state.orders)}
                                    renderRow={(data, secId, rowId, rowMap) =>
                                        <ListItem thumbnail>
                                            <Left>
                                                <CustomCachedImage
                                                    component={Thumbnail}
                                                    source={{ uri: this.state.users[rowId].avatar}}
                                                    square
                                                />
                                            </Left>
                                            <Body>
                                                <Text> {this.state.users[rowId].name} </Text>
                                                <Text note numberOfLines={2}>{data.time}</Text>
                                            </Body>
                                        </ListItem>
                                    }
                                    renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full success onPress={() => this.confirmDispatch(rowId)}>
                                            <Icon type='FontAwesome5' active name="dolly" />
                                        </Button>
                                    }
                                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger onPress={ () => this.deleteRow(secId, rowId, rowMap)}>
                                            <Icon active name="close" />
                                        </Button>
                                    }
                                />
                            ):(<View style={styles.noFollowersView}>
                                    <Icon name={'clipboard'} style={styles.noFollowersIcon}/>
                                    <Text style={styles.noFollowersText}>
                                        We couldn't find an order for you
                                    </Text>
                                    <Text note>
                                        Let's keep our fingers crossed.
                                    </Text>
                                </View>
                            )
                        }
                        <ProgressDialog
                            visible={this.state.loading}
                            title="Loading"
                            message="Please, wait..."
                        />
                    </StyledContent>
                </Container>
            </AnimatedComponent>
        );
    }
}

export default withNavigationFocus(ActiveOrdersComponent);
