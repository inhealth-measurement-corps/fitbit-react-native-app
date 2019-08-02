import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage} from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from './style';
import NavigationService from '../../navigation/NavigationService';
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style = {styles.view}>
        <Image source = {require('./welcome.png')}
        style = {styles.foreground}/>
        <Text style = {styles.text}> Welcome </Text>
      </View>
    );
  }
  async componentDidMount(){
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(()=>{
    }, 5000);
    const patientID = await AsyncStorage.getItem('patientID');
    const heightFt = await AsyncStorage.getItem('heightFt');
    const heightIn = await AsyncStorage.getItem('heightIn');
    const control = await AsyncStorage.getItem('control');
    if (
      patientID == null ||
      heightFt == null ||
      heightIn == null ||
      control == null
    ) {
      NavigationService.navigate('Setup');
    } else {
      this.props.appState.setUser({ patientID, heightFt, heightIn, control });
      NavigationService.navigate('Survey');
    }
  }
}
