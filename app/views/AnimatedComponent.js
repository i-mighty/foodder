import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Container } from 'native-base';
import { withNavigationFocus } from 'react-navigation';


AnimatableContainer = Animatable.createAnimatableComponent(Container);

class AnimatedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            this.props.isFocused &&
            <AnimatableContainer animation={this.props.animation} ref={(ref) =>  this.animatedView = ref}>
                {this.props.children}
            </AnimatableContainer>
        );
    }
}

const view = withNavigationFocus(AnimatedComponent);

export default view;
