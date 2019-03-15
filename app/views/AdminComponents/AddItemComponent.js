import React, { Component } from 'react';
import { Image, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Thumbnail, Text, Right, Button, Icon, Switch, Row, Fab, StyleProvider, Form, Item, H2, Input, Textarea, Toast, View } from 'native-base';
import platform from '../../native-base-theme/variables/platform';
import { CustomCachedImage } from 'react-native-img-cache';
import PhotoGrid from 'react-native-photo-grid';
import { TextInput } from 'react-native-paper';
import styles from '../../styles/AddItemStyle'
import update from 'immutability-helper';
import AnimatedComponent from '../AnimatedComponent';
import ImagePicker from 'react-native-image-crop-picker';

class AddItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:[]
        };
    }

    renderGridHeader(){
        return(
            <Text style={styles.text}>Images preview </Text>
        )
    }

    removeImage(){
        var arr = this.state.images;
        arr.splice(id, 1);
        this.setState({images: arr})
        Toast.show({
            text: 'Picture removed.',
        })
    }

    clearImages(){
        this.setState({images: []})
    }

    renderGridImages(item, itemSize){
        var that = this;
        var id = item.id;
        return(
            <ImageBackground
                style = {{ width: itemSize, height: itemSize, flex: 1}}
                key = { item.id }
                resizeMode = "cover"
                source = {{ uri: `data:${item.mime};base64,${item.src}`}}
            >
                <TouchableOpacity 
                    style={{backgroundColor: '#2226', width: itemSize, height: itemSize, justifyContent: 'center', alignItems: 'center'}} 
                    onPress={() => { that.removeImage(id)
                        // Alert.alert('Remove picture', 'Are you sure you want to remove this picture?', [
                        //     {
                        //         text: 'Remove',
                        //         onPress: () => this.removeImage(item.id),
                        //         style: 'cancel'
                        //     },
                        //     {
                        //         text: 'Cancel',
                        //         onPress: () => console.log('Cancel Pressed'),
                        //     },
                        // ])
                    }}
                >
                    {/* <Icon name='trash' style={{color: platform.brandLight}}/> */}
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    newUpload(){
        var arr = this.state.images;
        var that = this;
        ImagePicker.openPicker({
            includeBase64: true
        }).then(image => {
            arr.push({
                id: arr.length,
                src: image.data,
                mime: image.mime
            })
            that.setState({images: arr})
        })
    }

    render() {
        return (
        <AnimatedComponent >
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Add a new item
                        </Title>
                    </Body>
                </Header>
                <Content style={styles.body} contentContainerStyle={styles.container}>
                    <H2 style={styles.text}>
                        Add a new food
                    </H2>
                        <Item regular style={[styles.formItem, {borderColor: platform.brandPrimary}]}>
                            <Input placeholder='Name'/>
                        </Item>
                        <Textarea rowSpan={5} bordered placeholder="Description" style={[styles.formItem, {borderColor: platform.brandPrimary}]} />
                        <Button block info style={styles.formItem} onPress={() => this.newUpload()}>
                            <Text>
                                Add photos
                            </Text>
                        </Button>
                        {
                            this.state.images.length > 0 ?(
                                <PhotoGrid
                                    style={styles.formItem}
                                    data = { this.state.images }
                                    itemsPerRow = { 3 }
                                    itemMargin = { 1 }
                                    renderHeader = { this.renderGridHeader }
                                    renderItem = { this.renderGridImages }
                                />
                            ): (null)
                        }
                        {
                            this.state.images.length > 0 ?(
                                <Button block danger style={styles.formItem} onPress={() => this.clearImages()}>
                                    <Text>
                                        Clear all photos
                                    </Text>
                                </Button>
                            ): (null)
                        }
                        <Button block style={styles.formItem}>
                            <Text>
                                Submit
                            </Text>
                        </Button>
                </Content>
            </Container>
        </AnimatedComponent>
        );
    }
}

export default AddItemComponent;
