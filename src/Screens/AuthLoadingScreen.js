import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
} from 'react-native'

//Function
import { getCheckAuth } from '../Functions/Auth_Func'

type Props = {}
export default class AuthLoadingScreen extends Component<Props> {
    constructor(props) {
        super(props)

        this.checkAuth()
    }

    checkAuth = async () => {
        try {
            let auth_status = await getCheckAuth()
            console.log(auth_status)
            this.props.navigation.navigate(auth_status ? 'App' : 'Auth')
        } catch (err) {
            console.log(err.toString())
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }
}