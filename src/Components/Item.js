import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'

type Props = {}
export default class Item extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}
            >
                <View style={styles.layout}>
                    <Image
                        source={{ uri: 'data:image/jpeg;base64,' + this.props.item.image }}
                        
                        style={{width: 70, height: 70}}
                    />
                </View>
                <View style={styles.layout2}>
                    <Text style={styles.title}>{this.props.item.name}</Text>
                </View>
                <View style={styles.layout}>
                    <Text style={styles.title}>{this.props.item.price}</Text>
                </View>
                <View style={styles.layout}>
                    <Text style={styles.title}>{this.props.item.amount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 7,
        paddingRight: 7,
    },
    title: {
        // color: 'white',
        fontSize: 12,
        fontFamily: 'Kanit-Regular',
        // backgroundColor: 'green'
    },
    layout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'pink'
    },
    layout2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
})