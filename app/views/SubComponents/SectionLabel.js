import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles  from '../../styles/HomeStyle';
export default class SectionLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Text style={styles.sectionLabel}>
                {this.props.text}
            </Text>
        );
    }
}
