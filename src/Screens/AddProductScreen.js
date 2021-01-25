import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'

//Functions
import { getRef, pushData, updateData } from '../Functions/Firebase_Func'
import { getUid } from '../Functions/Auth_Func'

//Components
import InputAddProduct from '../Components/InputAddProduct'
import Header from '../Components/Header'

//Libary
// import ImgToBase64 from 'react-native-image-base64';
import Spinner from 'react-native-loading-spinner-overlay';

var ImagePicker = require('react-native-image-picker');

//Option Image Picker
var options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    maxWidth: 150,
    maxHeight: 150,
    mediaType: 'photo'
};

type Props = {}
export default class AddProductScreen extends Component<Props> {

    static navigationOptions = {
        header: ({navigation}) => (
          <Header title={'ADD PRODUCT'} backBtn={true} onPress={() => { navigation.goBack(null)}}/>),
      };    

    constructor(props) {
        super(props)

        this.state = {
            productName: '',
            price: '',
            amount: '',
            avatarSource: null,
            base64Img: null,
            visible: false,
            uid: ''
        }
    }

    componentDidMount() {
        this.getUIDFunction()

        if(this.props.navigation.state.params.item !== null) {
            this.loadData()
        }
    }

    loadData = () => {
        let item = this.props.navigation.state.params.item
        console.log(item)
        this.setState({
            productName: item.name,
            price: item.price,
            amount: item.amount,
            base64Img: item.image
        })
    }

    getUIDFunction = async () => {
        let uid = await getUid();
        this.setState({uid: uid})
        console.log(this.state.uid)
    }

    saveButton = async () => {
        let { base64Img, productName, price, amount, uid } = this.state
        let item = this.props.navigation.state.params.item
        console.log('uid = ',uid)
        console.log('item = ',item)
        let data = {
            name: productName,
            price: price,
            amount: amount,
            image: base64Img
        }
        if (base64Img !== null && productName !== '' && price > 0 && amount > 0) {
            this.setState({visible:true})
            try {
                if(item === null){
                    console.log('upload')
                    await pushData('items/'+uid, data)
                    console.log('finish')
                    this.setState({visible:false})
                    this.props.navigation.popToTop() 
                } else {
                    console.log('upload')
                    await updateData('items/'+uid, item.qrcode, data)
                    console.log('finish')
                    this.setState({visible:false})
                    this.props.navigation.popToTop() 
                }
            } catch (err) {
                alert(err.toString())
                this.setState({visible:false})
            }
        } else {
            alert('Invalid input')
        }
    }

    setValue = (state, data) => {
        this.setState({ [state]: data })
    }

    uploadImg = () => {
        console.log('upload Image')

        ImagePicker.showImagePicker(options, (response) => {
            console.log(response)
            if (response.didCancel) { console.log('User cancelled image picker'); }
            else if (response.error) { console.log('ImagePicker Error: ', response.error); }
            else {
                let source = { uri: response.uri };
                let base64Data = response.data;
                this.setState({
                    avatarSource: source,
                    base64Img: base64Data,
                });
            }
        })
    }

    render() {
        return (
            <ScrollView 
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Spinner visible={this.state.visible} textContent={"Uploading..."} textStyle={{ color: '#FFF' }} />
                {
                    this.state.base64Img
                        ?
                        <TouchableOpacity
                            style={styles.uploadStyle}
                            onPress={this.uploadImg}
                        >
                            <Image
                                // source={this.state.avatarSource}
                                source={{ uri: 'data:image/jpeg;base64,' + this.state.base64Img }}
                                style={{ width: 150, height: 150 }}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.uploadStyle}
                            onPress={this.uploadImg}
                        >
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={require('../Pictures/upload.png')}
                            />
                            <Text style={styles.txtUploadStyle}>Add Image</Text>
                        </TouchableOpacity>
                }


                <View>
                    <InputAddProduct
                        setValue={this.setValue}
                        name={this.state.productName}
                        price={this.state.price}
                        amount={this.state.amount}
                    />
                </View>
                <View style={styles.btnStyle}>
                    <Button
                        title='SAVE'
                        onPress={this.saveButton}
                        style={styles.btnStyle}
                        color='orange'
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 7,
    },
    btnStyle: {
        marginLeft: 20,
        marginRight: 20,
    },
    uploadStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 2,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    txtUploadStyle: {
        fontFamily: 'Kanit-Regular',
    }
})