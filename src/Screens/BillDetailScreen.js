import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";

//Functions

//Components
import Header from '../Components/Header'

var { height, width } = Dimensions.get("window");

type Props = {};
export default class BillDetailScreen extends Component<Props> {

  static navigationOptions = {
    header: ({navigation}) => (
      <Header title={'BILL DETAIL'} backBtn={true} onPress={() => { navigation.goBack(null)}}/>),
  };

  constructor(props) {
    super(props);
    this.state = { item: {}, data: [] };
  }

  componentDidMount() {
    var data = JSON.parse(this.props.navigation.state.params.item.item);
    this.setState({ item: this.props.navigation.state.params.item });
    this.setState({ data: data });
  }

  _render = ({ item }) => {

    console.log(item)

    return (
      <View 
      style={styles.layout1}>
        <View style={styles.layout2}>
          <Text style={styles.txt}>{item.amount}</Text>
        </View>
        <View style={[styles.layout2, {flex:2}]}>
          <Text style={styles.txt}>{item.name}</Text>
        </View>
        <View style={styles.layout2}>
          <Text style={styles.txt}>{item.price}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollStyle}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.layout1}>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>Amount</Text>
              </View>
              <View style={[styles.layout2, {flex:2}]}>
                <Text style={styles.txtHeader}>Item</Text>
              </View>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>Price</Text>
              </View>
            </View>
            {/* <View style={{ height: height/2 }}> */}
              <FlatList
                data={this.state.data}
                renderItem={this._render}
                style={{ backgroundColor: "white" }}
                keyExtractor={(item, index)=> item.name}
              />
            {/* </View> */}
            <View style={styles.layout1}>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>Date</Text>
              </View>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>{this.state.item.date}</Text>
              </View>
            </View>
            <View style={styles.layout1}>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>Time</Text>
              </View>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>{this.state.item.time}</Text>
              </View>
            </View>
            <View style={styles.layout1}>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>Total</Text>
              </View>
              <View style={styles.layout2}>
                <Text style={styles.txtHeader}>{this.state.item.total}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    flex: 1
  },
  scrollStyle: {
    backgroundColor: "white",
    margin: 7,
    // height: height/1.5
    flex: 1
  },
  layout1: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    // height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  layout2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  txtHeader: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Kanit-Bold',
  },
  txt: {
    fontSize: 16,
    fontFamily: 'Kanit-Regualar',
  }
});
