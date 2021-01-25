import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'

//Navigate
import { TabStack } from '../Navigate'

//Functions
import { getData } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'

//Libarys
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {}
export default class ItemSelect extends Component<Props> {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            check: '',
            amount: '',
            price: '',
            image: '',
            key: ''
        }
    }

    componentDidMount() {
        console.log('name is', this.props.item)
        this.setState({
            name: this.props.item.name,
            check: this.props.item.check,
            amount: this.props.item.amount,
            price: this.props.item.price,
            image: this.props.item.image,
            key: this.props.item.key
        })
        // console.log(this.state)
    }

    checkItem = () => {
        let { check, name, amount, price, image, key } = this.state
        let item = {
            name: name,
            price: price,
            amount: amount,
            image: image,
            key: key
        }
        if (check === false) {
            this.props.pushData(item)
            this.setState({ check: true })
        } else {
            this.props.spiteData(item)
            this.setState({ check: false })
        }
    }


    render() {
        let { name, check, amount, price, image } = this.state

        return (
            <TouchableOpacity
                style={styles.itemStyle}
                onPress={() => this.checkItem()}
            >
                <Image
                    source={{ uri: 'data:image/jpeg;base64,' + image }}

                    style={{ width: 70, height: 70 }}
                />
                <View style={styles.textStyle}>
                    <Text style={styles.nameStyle}>{name}</Text>
                    <Text style={styles.nameStyle}>{price} Baht</Text>
                </View>
                {this.state.check ? <Icon name={'check'} size={25} color={'orange'} /> : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        // height: 50,
        // backgroundColor: 'blue',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    textStyle: {
        marginLeft: 10,
        flex: 1
    },
    nameStyle: {
        flex: 1,
        fontFamily: 'Kanit-Regular',
    }
})