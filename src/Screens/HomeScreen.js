import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'

//Navigate
import { TabStack } from '../Navigate'

type Props = {}
export default class HomeScreen extends Component<Props> {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View styles={styles.container}>
                <TabStack/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})