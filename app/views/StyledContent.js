import React, { Component } from 'react';
import { StyleProvider, Content } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

class StyledContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Content contentContainerStyle={this.props.contentContainerStyle} style={this.props.style}>
                    {this.props.children}
                </Content>
            </StyleProvider>
        );
    }
    
}

export default StyledContent;
