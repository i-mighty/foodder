import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Content } from 'native-base';

export class HomeView extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Content>
                
            </Content>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
