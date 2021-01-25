import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native'

//Navigate
import { TabStack } from '../Navigate'

//Functions
import { getData } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'

//Components
import ItemSelect from '../Components/ItemSelect'
import Header from '../Components/Header'

type Props = {}
export default class SelectItemScreen extends Component<Props> {

    static navigationOptions = {
        header: ({navigation}) => (
          <Header title={'SELECT PRODUCT'} backBtn={true} onPress={() => { navigation.goBack(null)}}/>),
      };    

    constructor(props) {
        super(props)

        this.state = {
            items: [],
            datas: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        let uid = await getUid()
        let items = await getData('items/' + uid)
        let itemStack = []
        items.forEach(item => {
            itemStack.push({
                key: item.key,
                name: item.val().name,
                price: item.val().price,
                amount: item.val().amount,
                image: item.val().image,
                check: false
            })
        })
        this.setState({ items: itemStack })
        console.log('loadData = ',this.state.items)
    }

    pushData = (item) => {
        let _datas = this.state.datas
        _datas.push(item)
        this.setState({ datas: _datas })
        console.log(this.state.datas)
    }

    spiteData = (item) => {
        let _datas = this.state.datas
        let index = _datas.findIndex((data)=>{
            // console.log('data',data.name)
            // console.log('item', item.name)
            return data.name === item.name
        })
        console.log('index', index)
        _datas.splice(index, 1)
        console.log('after splice', _datas)
        // splice
    }

    _render = ({ item }) => {
        // console.log('_render selectScreen',item)
        return (
            <ItemSelect
                item={item}
                pushData={this.pushData}
                spiteData={this.spiteData}
            />
        )
    }

    selectBtn = () => {
        let { datas } = this.state
        if(datas.length > 0) {
            this.props.navigation.state.params.select(datas)
            this.props.navigation.goBack()
        } else {
            alert('Please select product')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    renderItem={this._render}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                />
                <Button
                    title='SELECT'
                    style={styles.btnStyle}
                    onPress={()=>this.selectBtn()}
                    color='orange'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 7,
        // backgroundColor: 'red',
    },btnStyle: {
        // marginTop: 15,
        // marginLeft: 30,
        // marginRight: 30,
    },
})