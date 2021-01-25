import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native'

//Functions

//Components

type Props = {}
export default class InputAddProduct extends Component<Props> {
    constructor(props) {
        super(props)

        this.state = ({
            productName: '',
            price: 0,
            amount: 0
        })
    }

    setText = (state, data) => {
        // this.setState({ state: data })
        // console.log(state)
        // console.log(data)
        this.props.setValue(state, data)        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Product name'}
                    onChangeText={(data) => this.setText('productName', data)}
                    underlineColorAndroid={'orange'}
                    value={this.props.name}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Price'}
                    onChangeText={(data) => this.setText('price', data)}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'orange'}
                    value={this.props.price}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Amount'}
                    onChangeText={(data) => this.setText('amount', data)}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'orange'}
                    value={this.props.amount}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputStyle: {
        // borderWidth: 1,
        // padding: 10,
        // margin: 10,
        // borderRadius: 15,
        // borderColor: '#E1E1E1',
        fontFamily: 'Kanit-Regular',
    }
})