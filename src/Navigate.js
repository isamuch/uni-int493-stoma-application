import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createSwitchNavigator, createStackNavigator, TabNavigator } from 'react-navigation';

//Libarys
import Icon from 'react-native-vector-icons/FontAwesome';

//Components
import Header from './Components/Header'

//Auth Screens
import LoginScreen from './Screens/LoginScreen'

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    SingUp: SingUpScreen
})

//App Screens
import ScanScreen from './Screens/ScanScreen'
import StockScreen from './Screens/StockScreen'
import HistoryScreen from './Screens/HistoryScreen'
import SettingScreen from './Screens/SettingScreen'

import ProductDetailScreen from './Screens/ProductDetailScreen'
import AddProductScreen from './Screens/AddProductScreen'

import GetQRScreen from './Screens/GetQRScreen'
import SelectItemScreen from './Screens/SelectItemScreen'

import HeaderScreen from './Components/Header'
import BillDetailScreen from './Screens/BillDetailScreen'

import SingUpScreen from './Screens/SingUpScreen'

import GuideScreen from './Screens/GuideScreen'
import HelpScreen from './Screens/HelpScreen'

const TabStack = TabNavigator({
    Cart: ScanScreen,
    Stock: StockScreen,
    History: HistoryScreen,
    Setting: SettingScreen,
}, {
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: 'black',
            upperCaseLabel: false,
            labelStyle: {
                fontFamily: 'Kanit-Regular',
                fontSize: 15
            },
            tabStyle: {
                backgroundColor: '#F8F8F8'
            },
            style: {
                backgroundColor: 'white'
            },
            showIcon: true,
            
        },
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let color;
                if (routeName === 'Cart') {
                    iconName = 'shopping-basket';
                    color = `${focused ? '#ffa500' : '#444444'}`
                } else if (routeName === 'Stock') {
                    iconName = 'inbox';
                    color = `${focused ? '#ffa500' : '#444444'}`
                } else if (routeName === 'History') {
                    iconName = 'history';
                    color = `${focused ? '#ffa500' : '#444444'}`
                } else if (routeName === 'Setting') {
                    iconName = 'gear';
                    color = `${focused ? '#ffa500' : '#444444'}`
                }
                return <Icon name={iconName} size={25} color={color} />;
            },
        })

    })

const AppStack = createStackNavigator({
    Tab: {
        screen: TabStack,
        navigationOptions: {
            header: (<Header title={'STORE MANAGEMENT'} backBtn={false} onPres={()=>{navigation.goBack(null)}}/>)
        }
    },
    ProductDetail: {
        screen: ProductDetailScreen,
    },
    AddProduct: {
        screen: AddProductScreen,
    },
    GetQR: {
        screen: GetQRScreen,
        navigationOptions: {
            header: (null)
        }
    },
    SelectItem: {
        screen: SelectItemScreen,
    },
    BillDetail: {
        screen: BillDetailScreen,
    },
    Guide: {
        screen: GuideScreen
    },
    Help: {
        screen: HelpScreen
    }
    
})

//Switch Stack
import AuthLoadingScreen from './Screens/AuthLoadingScreen'

export default createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
)