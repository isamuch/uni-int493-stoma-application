import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay';

//Function
import { signInFB, getUid, singUp } from '../Functions/Firebase_Func'
import { saveAuth, saveUid } from '../Functions/Auth_Func'

type Props = {}
export default class SingUp extends Component<Props> {

    static navigationOptions = { header: null }

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            password2: '',
            visible: false
        }
    }

    submitButton = async () => {
        this.setState({ visible: true })
        try {
            let { email, password, password2 } = this.state

            if (password == password2) {

                await singUp(email, password)
                console.log('sign up succress')
                
                await signInFB(email, password)
                console.log('sign in to firebase success!')
                let uid = await getUid();
                console.log('get uid success ', uid)
                await saveAuth()
                console.log('save key auth to asyn storage success!')
                await saveUid(uid)
                console.log('save uid key to asyn storage success!')
                this.setState({ visible: false })
                this.props.navigation.navigate('App')
            } else {
                alert("Password does not match ")
                this.setState({ visible: false })
            }

        } catch (err) {
            this.setState({ visible: false })
            alert(err.toString())
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                {/* <View> */}
                <Text style={styles.title}>Sing up</Text>
                <TextInput
                    placeholder='Email'
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder='Re enter password'
                    onChangeText={(password2) => this.setState({ password2 })}
                    value={this.state.password2}
                    secureTextEntry={true}
                />
                <Button
                    title='SUBMIT'
                    onPress={this.submitButton}
                    color='orange'
                />
                {/* </View> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 7,
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontFamily: 'Kanit-Regular',
    }
})