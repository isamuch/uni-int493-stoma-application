import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'

type Props = {}
export default class Category extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.layout}>
                    <Text style={styles.title}>Pic</Text>
                </View>
                <View style={styles.layout2}>
                    <Text style={styles.title}>Name</Text>
                </View>
                <View style={styles.layout}>
                    <Text style={styles.title}>Price</Text>
                </View>
                <View style={styles.layout}>
                    <Text style={styles.title}>In Stock</Text>
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
        // paddingTop: 10,
        // paddingBottom: 10,
        paddingLeft: 7,
        paddingRight: 7,
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