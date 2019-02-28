import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

var backgroundStyle = {
    justifyContent: 'center',
    marginHorizontal: wp('1%')
};
var iconViewStyle={
    backgroundColor: '#2226',
    alignItems: 'center',
    justifyContent: 'center'
};
var iconStyle = {

}

export default class FoodTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        var bg = this.props.type === 'banner' ? require('../../assets/resPlaceholder.jpg') : require('../../assets/foodPlaceholder.jpeg');
        return (
            <ImageBackground source={bg} style={this.props.backgroundStyle}>
                <TouchableOpacity onPress={this.props.onPress} style={this.props.iconViewStyle}>
                    <Icon name={this.props.iconName} style={this.props.iconStyle}  />
                    {
                        this.props.view != null?
                        (this.props.view):
                        (null)
                    }
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}
