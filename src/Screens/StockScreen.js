import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    LayoutAnimation,
    FlatList,
    RefreshControl,
    // ActivityIndicator
} from 'react-native'

//Libarys
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

//Functions
import { listenerData } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'


//Components
import Category from '../Components/Category'
import Item from '../Components/Item'

type Props = {}
export default class StockScreen extends Component<Props> {

    static navigationOptions = { header: null }

    constructor(props) {
        super(props)

        this.state = {
            isActionButtonVisible: true,
            items: [],
            refreshing: false,
        }

        this._listViewOffset = 0
    }

    componentDidMount() {

        this.getDataFromFB()
    }

    getDataFromFB = async () => {
        this.setState({ refreshing: true });

        try {
            let uid = await getUid()
            // let data = await listenerData('items/'+uid)
            // console.log('data=',data)
            let stackItem = []
            listenerData('items/' + uid, (datas) => {
                stackItem = []
                datas.forEach(data => {
                    stackItem.push({
                        qrcode: data.key,
                        name: data.val().name,
                        price: data.val().price,
                        amount: data.val().amount,
                        image: data.val().image
                    })
                })
                this.setState({ items: stackItem, refreshing: false })
                console.log(this.state.items)
            })
        }
        catch (err) {
            alert(err.toString())
            this.setState({ refreshing: false });
        }
    }

    // _onPress = () => {
    //     this.props.navigation.navigate("ProductDetail")
    // }

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

    _onPressWithItem = (item) => {
        this.props.navigation.navigate("ProductDetail", { item: item })
    }

    _render = ({ item }) => {
        return (
            <Item item={item} onPress={() => this._onPressWithItem(item)} />
        )
    }

    _onRefresh() {
        this.getDataFromFB()
    }


    render() {
        return (
            <View style={styles.container}>
                <Category />
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
                        keyExtractor={(item, index) => item.qrcode}
                    />

                </ScrollView>

                {
                    this.state.isActionButtonVisible ?
                        <ActionButton
                            buttonColor="rgba(231,76,60,1)"
                            onPress={() => { this.props.navigation.navigate('AddProduct', { item: null }) }}
                            size={55}
                        /> :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // backgroundColor: '#F8F8F8',
        flex: 1,
        margin: 7,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})
