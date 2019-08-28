import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const patientID = await AsyncStorage.getItem('patientID');
    const heightFt = await AsyncStorage.getItem('heightFt');
    const heightIn = await AsyncStorage.getItem('heightIn');
    const control = await AsyncStorage.getItem('control');

    console.log(patientID, heightFt, heightIn, control);

    if (
      patientID == null ||
      heightFt == null ||
      heightIn == null ||
      control == null
    ) {
      NavigationService.navigate('Setup');
    } else if(control == 'true') {
      this.props.appState.setUser({ patientID, heightFt, heightIn, control });
      NavigationService.navigate('Control');
    }else{
      this.props.appState.setUser({ patientID, heightFt, heightIn, control });
      NavigationService.navigate('Feedback');
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
}
