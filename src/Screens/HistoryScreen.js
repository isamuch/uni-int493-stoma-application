import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native'

//Functions
import { listenerData } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'

//Components
import BillHeader from '../Components/BillHeader'
import Item from '../Components/Item'
import BillItem from '../Components/BillItem'

type Props = {}
export default class HistoryScreen extends Component<Props> {

    constructor(props) {
        super(props)

        this.state = {
            items: [],
            loadAnimation: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getDataFromFB()
    }

    getDataFromFB = async () => {

        this.setState({refreshing: true})

        try {
            let uid = await getUid()
            // let data = await listenerData('items/'+uid)
            // console.log('data=',data)
            let stackItem = []
            listenerData('history/' + uid, (datas) => {
                stackItem = []
                datas.forEach(data => {
                    stackItem.push({
                        key: data.key,
                        date: data.val().date,
                        billNo: data.val().billNo,
                        total: data.val().total,
                        item: data.val().item,
                        time: data.val().time,
                    })
                })
                this.setState({ items: stackItem, loadAnimation: false, refreshing: false })
                console.log(this.state.items)
            })
        }
        catch (err) {
            alert(err.toString())
            this.setState({ refreshing: false })
        }
    }

    _onPressWithItem = (item) => {
        this.props.navigation.navigate("BillDetail", { item: item })
    }

    _render = ({ item }) => {
        return (
            <BillItem item={item} onPress={() => this._onPressWithItem(item)} />
        )
    }

    _onRefresh() {
        this.getDataFromFB()
    }

    render() {
        return (
            <View style={styles.container}>
                <BillHeader />
                {this.state.loadAnimation ? <ActivityIndicator size="small" color="#d69227" hidesWhenStopped={true} animating={this.state.loadAnimation} /> : null}
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
                        keyExtractor={(item, index) => item.key}
                    />

                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#F8F8F8',
        flex: 1,
        padding: 7,
    }
})