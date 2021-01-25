import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

//Functions

//Components

type Props = {}
export default class ItemDetail extends Component<Props> {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleLayout}>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
                <View style={styles.textLayout}>
                    <Text style={styles.textStyle}>{this.props.value}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        // paddingBottom: 20,
        flexDirection: 'row',
    },
    titleLayout: {
        width: 80
    },
    titleStyle: {
        textAlign: 'left',
        fontFamily: 'Kanit-Regular',
    },
    textLayout: {
        flex: 1,
    },
    textStyle: {
        textAlign: 'right',
        fontFamily: 'Kanit-Regular',
    }
})