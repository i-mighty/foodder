import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import platform from '../../native-base-theme/variables/platform';

class GreenIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Icon type={this.props.type?this.props.type:'Ionicons'} name={this.props.name}
                style={
                    {
                        color: platform.brandSuccess,
                    }
                }
            />
        );
    }
}

export default GreenIcon;
