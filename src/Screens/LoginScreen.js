import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay';

//Function
import { signInFB, getUid } from '../Functions/Firebase_Func'
import { saveAuth, saveUid } from '../Functions/Auth_Func'

type Props = {}
export default class LoginScreen extends Component<Props> {

    static navigationOptions = { header: null }

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            visible: false
        }
    }

    submitButton = async () => {
        this.setState({ visible: true })
        try {
            let { email, password } = this.state
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

        } catch (err) {
            this.setState({ visible: false })
            alert(err.toString())
        }
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                <View style={styles.container}>

                    <Image
                        source={require("../Pictures/app_logo.png")}
                        style={{ width: 150, height: 150, resizeMode: 'contain', tintColor: 'orange' }}
                    />
                    <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 20, marginBottom: 10 }}>Store Management</Text>
                    <View style={{ width: 300 }}>
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
                        <View style={{marginTop: 15}}>
                        <Button
                            title='SUBMIT'
                            onPress={this.submitButton}
                            color='orange'
                        />
                        </View>

                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SingUp')}
                        >
                            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 15, paddingTop: 10 }}>
                                Register Now
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 7,
        
        paddingBottom: 50,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontFamily: 'Kanit-Regular',
    }
})