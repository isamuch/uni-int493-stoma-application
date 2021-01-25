import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    CameraRoll,
    Button,
    Image
} from 'react-native'

//Libary
import QRCode from 'react-native-qrcode'
//Functions

//Components

type Props = {}
export default class GetQRScreen extends Component<Props> {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            name: '',
            price: '',
        }
    }

    componentDidMount() {
        let qrcode = this.props.navigation.state.params.item.qrcode
        let name = this.props.navigation.state.params.item.name
        let price = this.props.navigation.state.params.item.price

        this.setState({
            text: qrcode,
            name: name,
            price: price
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={this.state.text}
                    size={250}
                    bgColor='black'
                    fgColor='white' />
                <Text style={[styles.textStyle, { paddingTop: 20 }]}>{this.state.name}</Text>
                <Text style={styles.textStyle}>{this.state.price} Baht</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 20,
    }
})