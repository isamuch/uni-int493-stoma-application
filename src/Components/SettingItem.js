import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {}
export default class SettingItem extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>       
                <Icon style={{marginLeft:16, width:40}} name={this.props.iconName} size={30} color={'#6B6B6B'}/>
                <Text style={styles.title}>  {this.props.iconTitle}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        margin: 2,
    },
    title: {
        // color: 'white',
        fontSize: 15,
        fontFamily: 'Kanit-Regular',
        // backgroundColor: 'green'
    }
})