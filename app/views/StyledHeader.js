import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleProvider, Header } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

class StyledHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Header>
                    {this.props.children}
                </Header>
            </StyleProvider>
        );
    }
}

export default StyledHeader;
