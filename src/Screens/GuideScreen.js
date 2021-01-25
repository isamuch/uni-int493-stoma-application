import React, { Component } from "react";
import { View, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

//Functions

//Components
import Header from '../Components/Header'

type Props = {};
export default class GuideScreen extends Component<Props> {

  static navigationOptions = {
    header: ({ navigation }) => (
      <Header title={'GUIDE'} backBtn={true} onPress={() => { navigation.goBack(null) }} />),
  };

  constructor(props) {
    super(props);
    this.state = {
      list1Show: false,
      list2Show: false,
      list3Show: false,
      iconname: "angle-right",
      iconname2: "angle-right",
      iconname3: "angle-right"
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.layout1}>
          <View style={styles.subLayout1}>
            <Text style={styles.txt}>1. การบันทึกการขาย</Text>
          </View>
          <View style={[styles.subLayout1, { alignItems: 'flex-end', flex: 0.5 }]}>
            <TouchableOpacity onPress={() => { this.state.list1Show ? this.setState({ list1Show: false, iconname: "angle-right" }) : this.setState({ list1Show: true, iconname: "angle-down" }) }}>
              <Icon
                style={{ marginLeft: 16, width: 40 }}
                name={this.state.iconname}
                size={35}
                color={"#6B6B6B"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.list1Show ? <View style={styles.layout2}>
          <Text style={styles.txt2}>
            1.1 เลือกแถบ Home{"\n"}
            1.2 กดที่สัญลักษณ์เครื่องหมาย บวก ที่มุมล่างขวาของจอ
            จะแสดงรายการสินค้าที่มีอยู่ในคลัง กดเพื่อเลือกสินค้า{"\n"}
            1.3 ใส่จำนวนสินค้า{"\n"}
            1.4 กดปุ่ม save เพื่อบันทึก สามารถดูรายการที่บันทึกได้ในแถบ History
          </Text>
        </View> : null}
        <View style={styles.layout1}>
          <View style={styles.subLayout1}>
            <Text style={styles.txt}>2. การดู และเพิ่มของในคลังสินค้า</Text>
          </View>
          <View style={[styles.subLayout1, { alignItems: 'flex-end', flex: 0.5 }]}>
            <TouchableOpacity onPress={() => { this.state.list2Show ? this.setState({ list2Show: false, iconname2: "angle-right" }) : this.setState({ list2Show: true, iconname2: "angle-down" }) }}>
              <Icon
                style={{ marginLeft: 16, width: 40 }}
                name={this.state.iconname2}
                size={35}
                color={"#6B6B6B"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.list2Show ? <View style={styles.layout2}>
          <Text style={styles.txt2}>
            2.1 เลือกแถบ Stock จะแสดงรายการสินค้าที่มีอยู่ในคลัง{"\n"}
            2.2 กดที่สัญลักษณ์เครื่องหมาย บวก
            ที่มุมล่างขวาของจอเพื่อเพิ่มสินค้าเข้าคลัง{"\n"}
            2.3 กรอกข้อมูล และใส่รูปภาพตามต้องการลงบน ฟอร์ม{"\n"}
            2.4 กดปุ่ม save
          </Text>
        </View> : null}
        <View style={styles.layout1}>
          <View style={styles.subLayout1}>
            <Text style={styles.txt}>3. การดูประวัติการขาย</Text>
          </View>
          <View style={[styles.subLayout1, { alignItems: 'flex-end', flex: 0.3 }]}>
            <TouchableOpacity onPress={() => { this.state.list3Show ? this.setState({ list3Show: false, iconname3: "angle-right" }) : this.setState({ list3Show: true, iconname3: "angle-down" }) }}>
              <Icon
                style={{ marginLeft: 16, width: 40 }}
                name={this.state.iconname3}
                size={35}
                color={"#6B6B6B"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.list3Show ? <View style={styles.layout2}>
          <Text style={styles.txt2}>
            3.1 เลือกแถบ History จะแสดงรายการประวัติการขาย{"\n"}
            3.2 กดเลือกดูได้ตามต้องการ{"\n"}
          </Text>
        </View> : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8"
  },
  layout1: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  layout2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  txt: {
    fontFamily: 'Kanit-Regular',
    paddingLeft: 20,
    fontSize: 18,
  },
  txt2: {
    fontFamily: 'Kanit-Regular',
    paddingLeft: 40,
    fontSize: 16,
  },
  subLayout1: {
    flex: 1
  }
});
