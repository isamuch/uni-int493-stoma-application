import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

type Props = {};
export default class Header extends Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {

    // const { goBack } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ width: 40 }} onPress={this.props.onPress}>
          {this.props.backBtn?<Image
            style={{ width: 25, height: 25 }}
            source={require("../Pictures/backBtn.png")}
          />:null}
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems:'center', marginLeft:-40}}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginBottom: 2,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: "Kanit-Bold"
  }
});
