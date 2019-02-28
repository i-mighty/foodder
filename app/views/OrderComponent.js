import React, { Component } from 'react';
import { ListView } from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Body, Title, Left, Right, StyleProvider, Text, Button, Icon, List, ListItem, Thumbnail} from 'native-base'
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUser} from '../data/Actions';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';
AnimatableContainer = Animatable.createAnimatableComponent(Container);
const datas=[
    // 'Simon Mignolet',
    // 'Nathaniel Clyne',
    // 'Dejan Lovren',
    // 'Mama Sakho',
    // 'Alberto Moreno',
    // 'Emre Can',
    // 'Joe Allen',
    // 'Phil Coutinho',
];
class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
        };
    }

    componentWillMount(){
        //load the data
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({
            listViewData: newData
        });
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
                this.props.navigation.isFocused &&
            <StyleProvider style={getTheme(platform)}>
                <AnimatableContainer animation='fadeIn'>
                    <Header>
                        <Left>
                            
                        </Left>
                        <Body>
                            <Title>
                                My Order
                            </Title>
                        </Body>
                        <Right>
                            
                        </Right>
                    </Header>
                    <Content>
                        <List
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        source={{ uri: "https://pbs.twimg.com/profile_images/1093487464113676288/zKSPK3PR_400x400.jpg"}}
                                        square large
                                    />
                                </Left>
                                <Body>
                                    <Text> {data} </Text>
                                    <Text note numberOfLines={2}>This is a sample text that I am trying to make as long as possible so as to be able to test the text overflow of react Native. Now we are making it a bit longer to see how it would hold up with three lines</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                    <Text>View</Text>
                                    </Button>
                                </Right>
                            </ListItem>}
                            renderLeftHiddenRow={data =>
                            <Button full onPress={() => alert(data)}>
                                <Icon active name="checkmark" />
                            </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>}
                        />
                    </Content>
                </AnimatableContainer>
            </StyleProvider>
        );
    }
}
const mapStateToProps = ({user}) =>{
    return {user}
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUser
    }, dispatch)
);
const view = withNavigation(OrderComponent);
export default connect(mapStateToProps, mapDispatchToProps)(view);