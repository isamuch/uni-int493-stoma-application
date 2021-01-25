import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    LayoutAnimation,
    ScrollView,
    Button,
    RefreshControl
} from 'react-native'

//Libarys
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

//Functions
import { getUid } from '../Functions/Auth_Func';
import { pushData, updateData, deleteItemFB } from '../Functions/Firebase_Func'

//Components
import ItemSubmit from '../Components/ItemSubmit'
import Category from '../Components/Category'

type Props = {}
export default class ScanScreen extends Component<Props> {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            isActionButtonVisible: true,
            submitItems: [],
            allPrice: 0,
            visible: false,
            refreshing: false,
        }

        this._listViewOffset = 0
    }

    getSelectItem = (datas) => {
        console.log(datas)
        this.setState({
            items: datas
        })
    }

    _onScroll = (event) => {
        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
            duration: 100,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up'
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up'
        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isActionButtonVisible })
        }
        // Update your scroll position
        this._listViewOffset = currentOffset
    }

    saveData = (item) => {
        let { submitItems } = this.state

        let index = submitItems.findIndex((data) => {
            // console.log('data',data.name)
            // console.log('item', item.name)
            return data.name === item.name
        })

        if (index === -1) {
            console.log('push data submitItem')
            submitItems.push(item)
        } else {
            console.log('splice data submitItem')
            submitItems.splice(index, 1)
            submitItems.push(item)
        }

        this.setState({
            submitItems: submitItems
        })
        console.log(this.state.submitItems)
        this.calculate(submitItems)

    }

    calculate = (submitItem) => {
        let priceAll = 0

        submitItem.forEach(item => {
            let priceItem = (+item.quantity) * (+item.price)
            priceAll += priceItem
        });
        console.log(priceAll)
        this.setState({
            allPrice: priceAll
        })

    }

    funcSaveFB = async (data, items) => {
        try {
            this.setState({ visible: true })
            let uid = await getUid()
            await pushData('history/' + uid, data)

            console.log(items)
            await items.forEach(item => {
                let amount = (+item.amountStock) - (+item.amount)
                if (amount == 0) {
                    deleteItemFB('items/' + uid, item.key)
                } else {
                    console.log(amount)
                    updateData('items/' + uid, item.key, {
                        amount: amount + ''
                    })
                }
            })

            this.setState({
                visible: false,
                items: [],
                submitItems: [],
                allPrice: 0,

            })
        } catch (err) {
            alert(err.toString())
        }
    }

    saveDataToFB = () => {

        let { submitItems } = this.state
        console.log(submitItems)

        if (submitItems.length > 0) {
            let day = new Date().getDate();
            let month = new Date().getMonth() + 1;
            let year = new Date().getFullYear();

            let date = day + '-' + month + '-' + year
            // console.log(day + '-' + month + '-' + year);

            let hours = new Date().getHours();
            let min = new Date().getMinutes();
            let sec = new Date().getSeconds();

            let time = hours + ':' + min + ':' + sec
            // console.log(time)

            let { allPrice } = this.state

            let items = []
            submitItems.forEach((item) => {
                if (item.quantity !== '' && item.quantity !== '0') {
                    items.push({
                        name: item.name,
                        price: item.price,
                        amount: item.quantity,
                        key: item.key,
                        amountStock: item.amount
                    })
                }
            })
            let stringItems = JSON.stringify(items)

            let data = {
                date: date,
                item: stringItems,
                time: time,
                total: allPrice
            }

            // console.log(data)
            this.funcSaveFB(data, items)
        }
    }

    _render = ({ item }) => {
        return (
            <ItemSubmit item={item} saveData={(item) => this.saveData(item)} />
        )
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.setState({
            refreshing: false,
            items: [],
            submitItems: [],
            allPrice: 0,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.visible} textContent={"Uploading..."} textStyle={{ color: '#FFF' }} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={this._onScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <FlatList
                        data={this.state.items}
                        renderItem={this._render}
                        keyExtractor={(item) => item.key}
                    />
                </ScrollView>
                {
                    this.state.isActionButtonVisible ?
                        <ActionButton
                            buttonColor="rgba(231,76,60,1)"
                            onPress={() => { this.props.navigation.navigate('SelectItem', { select: (datas) => this.getSelectItem(datas) }) }}
                            size={55}
                            offsetY={110}
                            offsetX={20}
                        /> :
                        null
                }
                <View style={{ backgroundColor: 'white', padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>Total</Text>
                        </View>
                        <Text style={styles.textStyle}>{this.state.allPrice} ฿</Text>
                    </View>
                    <Button
                        title={'SAVE'}
                        onPress={() => { this.saveDataToFB() }}
                        color={'orange'}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#F8F8F8',
        flex: 1,
        padding: 7,
    },
    textStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 20,
    }
})