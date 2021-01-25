import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'

//Functions
import { removeAuth, removeUid } from '../Functions/Auth_Func'
import { signOutFB } from '../Functions/Firebase_Func';

//Components
import SettingItem from '../Components/SettingItem'

type Props = {}
export default class SettingScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    signOutButton = async () => {
        try {
            await signOutFB()
            console.log('sign out from firebase success!')
            await removeAuth()
            console.log('remove auth key from asyn storage success!')
            await removeUid()
            console.log('remove uid key from asyn storage success!')
            this.props.navigation.navigate('Auth')

        } catch (err) {
            alert(err.toString())
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <SettingItem iconName='book' iconTitle='Guide'onPress={()=>{this.props.navigation.navigate("Guide")}}/>
                <SettingItem iconName='question' iconTitle='Help' onPress={()=>{this.props.navigation.navigate("Help")}}/>
                <SettingItem iconName='sign-out' iconTitle='Sign Out' onPress={()=>this.signOutButton()}/>
            </ScrollView>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F8F8",
    },
})