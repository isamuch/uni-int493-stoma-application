import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'

type Props = {}
export default class BillHeader extends Component<Props> {

    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.layout}>
                    <Text style={styles.title}>Date</Text>
                </View>
                <View style={styles.layout}>
                    <Text style={styles.title}>Time</Text>
                </View>
                <View style={styles.layout}>
                    <Text style={styles.title}>Total</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 30,
        marginBottom: 3,
    },
    title: {
        // color: 'white',
        fontSize: 15,
        fontFamily: 'Kanit-Regular',
        // backgroundColor: 'green'
    },
    layout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    layout2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
})