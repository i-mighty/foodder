import React, { Component } from 'react'
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";
import AnimatedContainer from "./AnimatedComponent"
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.user.name !== '') {
                this.props.navigation.navigate("App");
            } else {
                this.props.navigation.navigate("Auth");
            }
        }, 4000)
    }
    
    
    render() {
        return (
            <AnimatedContainer animation="fadeIn">
                <View 
                    style={{
                        width: widthPercentageToDP('100%'), height: heightPercentageToDP('100%'), backgroundColor: '#54A254',
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={{borderRadius: 50, width: 100, height: 100}}
                        source={require('../assets/logo.png')}
                    />
                </View>
            </AnimatedContainer>
        )
        // return <Text>Hello</Text>
    }
}
const mapStateToProps = ({user}) =>{
    return {user}
}
export default connect(mapStateToProps)(SplashScreen)
