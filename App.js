import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native'
import { Root, Footer, FooterTab, Text, Icon, Button } from 'native-base';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './app/data/index';
import platform from './app/native-base-theme/variables/platform';
import LoginComponent from './app/views/LoginComponent'
import SearchComponent from './app/views/SearchComponent';
import HomeComponent from './app/views/HomeComponent';
import AdminHome from './app/views/AdminComponents/HomeComponents'
import ProfileComponent from './app/views/ProfileComponent'
import PlacesComponent from './app/views/PlacesComponent';
import PlaceComponent from './app/views/PlaceComponent'
import OrderComponent from './app/views/OrderComponent';
import ItemComponent from './app/views/ItemComponent'
import AddItems from './app/views/AdminComponents/AddItemComponent';
import Orientation from 'react-native-orientation-locker';
import SettingsComponent from './app/views/SettingsComponent';
import ActiveOrders from './app/views/AdminComponents/ActiveOrdersComponent';
import CustomersComponent from './app/views/AdminComponents/CustomersComponent'
import AdminAuth from './app/views/AdminComponents/AdminAuth';
import { heightPercentageToDP } from 'react-native-responsive-screen';

// CODE SYNC API TOKEN: e7bbac4a9730947730e67aed1ca605a586c12be9
const Profile = createSwitchNavigator({
  Profile: {
    screen: ProfileComponent
  },
  Settings:{
    screen: SettingsComponent
  }
})
const AppStack = createBottomTabNavigator({
  Home: {
    screen: HomeComponent,
    navigationOptions: {
      //xtics is an object containing { focused: boolean, horizontal: boolean, tintColor: string }
      tabBarIcon: function (xtics) {
        if(xtics.focused){
          return <Icon name='home' style={styles.activeTab}/>
        }else{
          return <Icon name='home' style={styles.inactiveTab}/>
        }
      }
    }
  },
  Places: {
    screen: PlacesComponent,
    navigationOptions: {
      tabBarIcon: function (xtics) {
        if(xtics.focused){
          return <Icon name='pizza' style={styles.activeTab}/>
        }else{
          return <Icon name='pizza' style={styles.inactiveTab}/>
        }
      }
    }
  },
  Order: {
    screen: OrderComponent,
    navigationOptions: {
      tabBarIcon: function (xtics) {
        if(xtics.focused){
          return <Icon name='clipboard' style={styles.activeTab}/>
        }else{
          return <Icon name='clipboard' style={styles.inactiveTab}/>
        }
      }
    }
  },
  Search: {
    screen: SearchComponent,
    navigationOptions: {
      tabBarIcon: function (xtics) {
        if(xtics.focused){
          return <Icon name='search' style={styles.activeTab}/>
        }else{
          return <Icon name='search' style={styles.inactiveTab}/>
        }
      }
    }
  },
  Profile:{
    screen: Profile,
    navigationOptions: {
      tabBarIcon: function (xtics) {
        if(xtics.focused){
          return <Icon name='contact' style={styles.activeTab}/>
        }else{
          return <Icon name='contact' style={styles.inactiveTab}/>
        }
      }
    }
  },
}, {
  initialRouteName:'Home',
  tabBarOptions:{
    activeTintColor: platform.brandDark,
    inactiveTintColor: '#eee',
    style: {
      backgroundColor: platform.brandLight,
      paddingVertical: heightPercentageToDP('1%')
    }
  },
});

const AuthStack = createSwitchNavigator({
  Login:{
    screen: LoginComponent,
  },
  Admin:{
    screen: AdminAuth
  }
}, {
  initialRouteName: 'Admin'
})

const RootStack = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  App:{
    screen: AppStack
  }
}, {
  initialRouteName: 'Auth'
})

const AppContainer = createAppContainer(RootStack)

export default class App extends Component{
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Root>
            <AppContainer/>
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  activeTab:{
    fontSize: 25,
    color: platform.brandDark
  },
  inactiveTab:{
    fontSize: 22,
    color: '#fff'
  }
})
