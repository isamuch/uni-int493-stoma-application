import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native'

//Functions
import { deleteItemFB } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'

//Components
import ItemDetail from '../Components/ItemDetail'
import Header from '../Components/Header'

type Props = {}
export default class ProductDetailScreen extends Component<Props> {

    static navigationOptions = {
        header: ({ navigation }) => (
            <Header title={'PRODUCT DETAIL'} backBtn={true} onPress={() => { navigation.goBack(null) }} />),
    };

    constructor(props) {
        super(props)
    }

    editItem = () => {
        this.props.navigation.navigate('AddProduct', { item: this.props.navigation.state.params.item })
    }

    getQR = () => {
        let item = this.props.navigation.state.params.item
        this.props.navigation.navigate('GetQR', { item: item })
    }

    deleteItem = () => {

        let name = this.props.navigation.state.params.item.name

        Alert.alert(
            'Delete ?',
            'Are you sure to delete ' + name + ' !',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Sure', onPress: () => {
                        console.log('Hello')
                        this.deleteFB()
                    }
                },
            ],
            { cancelable: false }
        )
    }

    deleteFB = async () => {
        let keyItem = this.props.navigation.state.params.item.qrcode
        try {
            let uid = await getUid()
            await deleteItemFB('items/' + uid, keyItem)
            this.props.navigation.popToTop()
        } catch (err) {
            alert(err.toString())
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={styles.imgStyle}
                >
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={{ uri: 'data:image/jpeg;base64,' + this.props.navigation.state.params.item.image }}
                    />
                </View>

                
                    <ItemDetail
                        title={'Name'}
                        value={this.props.navigation.state.params.item.name}
                    />
                    <ItemDetail
                        title={'Price'}
                        value={this.props.navigation.state.params.item.price}
                    />
                    <ItemDetail
                        title={'Amount'}
                        value={this.props.navigation.state.params.item.amount}
                    />
                

                {/* <TouchableOpacity style={styles.trashStyle}
                    onPress={this.getQR}
                >
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../Pictures/qr-code.png')}
                    />
                    <Text style={{ fontSize: 10, fontFamily: 'Kanit-Regular' }}>Get QR Code</Text>
                </TouchableOpacity> */}
                {/* <View style={{height: 60}}/> */}

                <View style={styles.btnStyle}>
                    <Button
                        title='EDIT'
                        style={styles.btnStyle}
                        onPress={this.editItem}
                        color='orange'
                    />
                </View>
                <TouchableOpacity
                    style={[styles.trashStyle, { paddingBottom: 10 }]}
                    onPress={this.deleteItem}
                >
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={require('../Pictures/waste-bin.png')}
                    />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
    btnStyle: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
    },
    imgStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderWidth: 2,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    trashStyle: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})