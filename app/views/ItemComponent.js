import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Content, Container, StyleProvider, H1, Button, Text, H2, H3, Footer, Card, FooterTab } from 'native-base';
import { Avatar, Badge } from 'react-native-elements';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import styles from '../styles/ItemStyle'
import Carousel from 'react-native-snap-carousel';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP
} from 'react-native-responsive-screen';
import ViewMoreText from 'react-native-view-more-text';

export class HomeView extends Component {

    constructor(props){
        super(props);
        this.state = {
            item:{
                images:[
                    'http://www.ourperfectpalette.com/wp-content/uploads/2017/09/IMG_0140.jpg',
                    'http://www.ourperfectpalette.com/wp-content/uploads/2017/10/IMG_0163.jpg',
                    'http://sisijemimah.com/wp-content/uploads/2015/08/IMG_8335.jpg',
                    'http://foodies.waiter.com.ng/wp-content/uploads/2018/01/FB_IMG_1515921887191-720x400.jpg'
                ]
            }
        };
    }

    _renderItem ({item, index}) {
        return (
            <Avatar
                rounded
                size='large'
                source={{uri: item}}
                containerStyle={{borderColor: platform.brandLight, borderWidth: 2}}
            />
        );
    }

    renderViewMore(onPress){
        return(
            <Text style={{color: platform.brandLight, fontSize: 12,}}
            onPress={onPress}>More</Text>
        )
    }

    renderViewLess(onPress){
        return(
            <Text style={{color: platform.brandDanger, fontSize: 12,}}
            onPress={onPress}>Less</Text>
        )
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container>
                    <Content>
                        <Card style={styles.topPane}>
                            <Avatar
                                rounded
                                size='xlarge'
                                source={require('../assets/jollof1.jpeg')}
                                containerStyle={styles.lAvatar}
                            />
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.item.images}
                                renderItem={this._renderItem}
                                sliderWidth={wp('80%')}
                                itemWidth={90}
                            />
                            <H1 style={styles.name}>
                                Ewa Agonyin
                            </H1>
                        </Card>
                        <View style={styles.bodyPane}>
                            <View style={styles.hView}>
                                <H3 style={styles.name}>
                                    Price: 
                                </H3>
                                <H3 style={styles.name}>
                                    ₦ 1000
                                </H3>
                            </View>
                            
                            <View style={styles.hView}>
                                <H3 style={styles.name}>
                                    Total number of orders: 
                                </H3>
                                <H3 style={styles.name}>
                                    1000
                                </H3>
                            </View>

                            <View style={styles.hView}>
                                <H3 style={[styles.name, widthPercentageToDP('40%')]}>
                                    Description:
                                </H3>
                                <View style={styles.descContainer}>
                                    <ViewMoreText
                                        numberOfLines={2}
                                        renderViewMore={this.renderViewMore}
                                        renderViewLess={this.renderViewLess}
                                    >
                                        <Text style={styles.desc}>
                                            A very lengthy description of the restaurant in question so that the user can have a brief understanding of what to expect should they find themselves there.
                                        </Text>
                                    </ViewMoreText>
                                </View>
                            </View>
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button success>
                                <Text>Order now</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
