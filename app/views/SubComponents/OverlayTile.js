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

export default class OverlayTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundStyle: this.props.backgroundStyle,
            iconName: this.props.iconName,
            iconStyle: this.props.icon
        };
    }

    render() {
        var bg = this.props.type === 'banner' ? require('../../assets/resPlaceholder.jpg') : require('../../assets/foodPlaceholder.jpeg');
        return (
            <ImageBackground source={bg} style={Object.assign(backgroundStyle, this.props.backgroundStyle)}>
                <TouchableOpacity onPress={this.props.onPress} style={Object.assign(iconViewStyle, this.props.backgroundStyle)}>
                    <Icon name={this.props.iconName} style={Object.assign(iconStyle, this.props.iconStyle)}  />
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
