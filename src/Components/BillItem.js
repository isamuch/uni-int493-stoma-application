import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

type Props = {};
export default class BillItem extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.layout}>
          <Text style={styles.title}>{this.props.item.date}</Text>
        </View>
        <View style={styles.layout}>
          <Text style={styles.title}>{this.props.item.time}</Text>
        </View>
        <View style={styles.layout}>
          <Text style={styles.title}>{this.props.item.total}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    height:60,
    marginBottom:2
    // padding: 5,
  },
  title: {
    // color: 'white',
    fontSize: 12,
    fontFamily: "Kanit-Regular"
    // backgroundColor: 'green'
  },
  layout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
