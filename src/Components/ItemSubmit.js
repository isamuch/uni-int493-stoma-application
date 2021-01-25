import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
    // Picker
} from 'react-native'

//Navigate
import { TabStack } from '../Navigate'

//Functions
import { getData } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'

//Libarys
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {}
export default class itemSubmit extends Component<Props> {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            check: '',
            amount: '',
            price: '',
            image: '',
            key: '',
            quantity: '1',
            colorLine: 'orange'
        }
    }

    componentDidMount() {
        // console.log('name is', this.props.item)
        this.setState({
            name: this.props.item.name,
            check: this.props.item.check,
            amount: this.props.item.amount,
            price: this.props.item.price,
            image: this.props.item.image,
            key: this.props.item.key
        })
        // console.log(this.state)
        let data = {
            name: this.props.item.name,
            check: this.props.item.check,
            amount: this.props.item.amount,
            price: this.props.item.price,
            image: this.props.item.image,
            key: this.props.item.key,
            quantity: '1',
        }
        this.props.saveData(data)
    }

    _render = () => {
        return <Picker.Item label="1" value="1" />
    }

    setQuantity = (num) => {
        
        let numQuntity = +num+0
        let amount = +this.state.amount

        // console.log('numQ',numQuntity)
        // console.log('amount', amount)

        if(numQuntity>0 && numQuntity<= amount) {
            this.setState({
                quantity: numQuntity+'',
                colorLine: 'orange'
            })

            let data = {
                name: this.state.name,
                check: this.state.check,
                amount: this.state.amount,
                price: this.state.price,
                image: this.state.image,
                key: this.state.key,
                quantity: num,
            }

            this.props.saveData(data)
        }
        else {
            this.setState({
                quantity: '',
                colorLine: 'red'
            })
            let data = {
                name: this.state.name,
                check: this.state.check,
                amount: this.state.amount,
                price: this.state.price,
                image: this.state.image,
                key: this.state.key,
                quantity: '',
            }

            this.props.saveData(data)
        }
    }

    render() {
        let { name, check, amount, price, image } = this.state

        return (
            <View
                style={styles.itemStyle}
            >
                <Image
                    source={{ uri: 'data:image/jpeg;base64,' + image }}

                    style={{ width: 70, height: 70 }}
                />
                <View style={styles.textStyle}>
                    <Text style={styles.nameStyle}>{name}</Text>
                    <Text style={styles.nameStyle}>{price} Baht</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text) => this.setQuantity(text)}
                        value={this.state.quantity}
                        underlineColorAndroid={this.state.colorLine}
                        keyboardType={'numeric'}
                    />
                    <Text style={{fontFamily: 'Kanit-Regular',fontSize: 20,}}>/{amount}</Text>
                </View>
            </View>
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
        paddingLeft: 10,
        paddingRight: 10,
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
    },
    inputStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 20,
    }
})