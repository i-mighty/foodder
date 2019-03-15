import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleProvider, Footer } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

class StyledFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Footer>
                    {this.props.children}
                </Footer>
            </StyleProvider>
        );
    }
}

export default StyledFooter;
