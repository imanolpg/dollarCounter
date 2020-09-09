/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      money: 0,
      date: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
      inputAmount: ""
    }

    this.getData()
  }

  /**
   * resets all data
   */
  async reset(){
    var date = new Date();
    this.setState({money: 0, date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()});
    await AsyncStorage.setItem('date', date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    await AsyncStorage.setItem('money', "0");
  }

  /**
   * sums the money to the ammount
   * @param {number} moneyToAdd money to sum
   */
  addMoney() {
    if (this.state.inputAmount !== 0) {
      this.setState({money: Number(this.state.money) + Number(this.state.inputAmount)});
      this.setState({inputAmount: ""});
    }
    this.storeData();
  }

  /**
   * stores de money data
   */
  async storeData() {
    try {
      await AsyncStorage.setItem('money', String(this.state.money));
    } catch(e) {}
  }

  /**
   * gets the money and date data
   */
  async getData() {
    try {
      date = await AsyncStorage.getItem('date');
      money = await AsyncStorage.getItem('money');
      if(date !== null) this.setState({date: date});
      if(money !== null) this.setState({money: Number(money)}); 
    } catch(e) {}
  }

  render(){
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.date}>
          {this.state.date}
        </Text>
        <TouchableHighlight style={styles.moneyTouchable}>
          <Text style={styles.money}>
            {this.state.money}
          </Text>
        </TouchableHighlight>
        <TextInput style={styles.numberInput}
            keyboardType="numeric"
            placeholder="Enter money here"
            maxLength={5}
            textAlign="center"
            value={this.state.inputAmount}
            onChangeText={(text) => {this.setState({inputAmount: text})}}
        />
        <TouchableOpacity style={styles.removeTouchable}
            underlayColor = '#ccc'
            activeOpacity={0.1}
            onPress={() => this.addMoney()}>
          <Text style={{color: "white", fontSize: 17}}>
            Remove
          </Text>
        </TouchableOpacity>
        <Button title="Reset" onPress={() => this.reset()} style={styles.resetButton} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 50,
    alignItems: 'center',
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  date: {
    height: "10%",
    //margin: 40,
    fontSize: 20
  },
  moneyTouchable: {
    height: "50%",
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    backgroundColor: "orange",
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  money: {
    fontSize: 40
  },
  numberInput: {
    width: "70%",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 25
  },
  removeTouchable: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    backgroundColor: "red",
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.08,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resetButton: {
    height: "10%",
    width: "50%"
  }
});

export default App;