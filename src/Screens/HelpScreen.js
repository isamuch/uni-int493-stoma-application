import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import email from "react-native-email";
import call from "react-native-phone-call";
//Functions

//Components
import Header from '../Components/Header'

const args = {
  number: "0959566983", // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};

var { height, width } = Dimensions.get("window");

type Props = {};
export default class HelpScreen extends Component<Props> {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  handleEmail = () => {
    const to = ["dummy@gmail.com"]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      //   cc: ["bazzy@moo.com", "doooo@daaa.com"], // string or array of email addresses
      //   bcc: "mee@mee.com", // string or array of email addresses
      //   subject: "Show how to use",
      //   body: "Some body right here"
    }).catch(console.error);
  };

  _alertEmail = () => {
    Alert.alert(
      "Send email",
      "Send email to dummy@gmail.com",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.handleEmail() }
      ],
      { cancelable: false }
    );
  };

  _alertCall = () => {
    Alert.alert(
      "Call",
      "Call 0959566983 ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => call(args) }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container2}
          showsVerticalScrollIndicator={false}          
        >
          <View style={styles.layout1}>
            <Image
              source={require("../Pictures/app_logo.png")}
              style={{ width: 150, height: 150 }}
            />
          </View>
          <View style={styles.layout2}>
            <Text style={styles.txt}>If you need help, contact us via ..</Text>
          </View>
          <View style={styles.layout2}>
            <Icon name={"phone"} size={35} />
          </View>
          <View style={styles.layout3}>
            <TouchableOpacity onPress={this._alertCall}>
              <Text style={styles.txt2}> 0959566958</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.layout2}>
            <Icon name={"email"} size={35} />
          </View>
          <View style={styles.layout3}>
            <TouchableOpacity onPress={this._alertEmail}>
              <Text style={styles.txt2}> dummy@gmail.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.layout4}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image
                source={require("../Pictures/back2.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  },
  container2: {
    backgroundColor: "white",
    justifyContent: "center",
    height: height
  },
  txt: {
    fontSize: 18
  },
  layout1: {
    height: 150,
    alignSelf: "center"
  },
  layout2: {
    height: 60,
    alignSelf: "center",
    justifyContent: "center"
  },
  layout3: {
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -20
  },
  txt2: {
    fontSize: 18,
    color: "#d69227",
    textDecorationLine: "underline"
  },
  layout4: {
    height: 100,
    alignSelf: "center",
    justifyContent: "center"
  }
});
