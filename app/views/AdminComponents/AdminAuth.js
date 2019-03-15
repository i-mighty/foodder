import React, { Component } from 'react';
import { Text as RNText } from 'react-native';
import { Content, Left, Icon, Container, Header, StyleProvider, View, Text, Tab, Tabs, Title, TabHeading, Body, Footer, Button, Form, Item, Input, Label, DatePicker } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import * as Animatable from 'react-native-animatable';
import {withNavigationFocus} from 'react-navigation';
import styles from '../../styles/AdminAuth'
AnimatableContainer = Animatable.createAnimatableComponent(Container);

class AdminAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            this.props.isFocused &&
            <AnimatableContainer animation='fadeInLeftBig' duration={300}>
                <StyleProvider style={getTheme(platform)}>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                Restaurant Admin
                            </Title>
                        </Body>
                    </Header>
                </StyleProvider>
                <StyleProvider style={getTheme(platform)}>
                    <Content>
                        <Tabs>
                            <Tab heading={<TabHeading>
                                <Title>Login</Title>
                            </TabHeading>}>
                                <View style={styles.tab}>
                                    <RNText style={styles.text}>
                                        Login to your restaurant's admin dashboard
                                    </RNText>
                                    <Form style={styles.form}>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='mail' />
                                            <Input placeholder='Email address'/>
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='lock' />
                                            <Input placeholder='Password'/>
                                        </Item>
                                        <Button block success style={styles.formItem}>
                                            <Text>
                                                Login
                                            </Text>
                                        </Button>
                                    </Form>
                                </View>
                            </Tab>
                            <Tab heading={<TabHeading>
                                <Title>Register</Title>
                            </TabHeading>}>
                                <View style={styles.tab}>
                                    <RNText style={styles.text}>
                                        Login to your restaurant's admin dashboard
                                    </RNText>
                                    <Form style={styles.form}>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='contact' />
                                            <Input placeholder='Full name'/>
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='mail' />
                                            <Input placeholder='Email address'/>
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <Icon name='lock' />
                                            <Input placeholder='Password' />
                                        </Item>
                                        <Item regular style={styles.formItem}>
                                            <DatePicker
                                                placeHolderText='Date of birth'
                                            />
                                        </Item>
                                        <Button block success style={styles.formItem}>
                                            <Text>
                                                Login
                                            </Text>
                                        </Button>
                                    </Form>
                                </View>
                            </Tab>
                        </Tabs>
                    </Content>
                </StyleProvider>
                <StyleProvider>
                    <Footer>

                    </Footer>
                </StyleProvider>
            </AnimatableContainer>
        );
    }

    navigate(route) {
        this.props.navigation.navigate(route);
    }

    navigateNested(navigator, route) {
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({
            routeName: route
        }));
    }

}

export default withNavigationFocus(AdminAuth);
