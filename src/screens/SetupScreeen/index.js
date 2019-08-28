import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  ScrollView,
  Picker,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Appbar, Button, RadioButton, TextInput } from 'react-native-paper';
import styles from './style';
import NavigationService from '../../navigation/NavigationService';

export default class SetupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientError: false,
      heightFt: '5',
      heightIn: '0',
      patientID: '',
      radioSelectedIndex: -1
    };
  }

  renderHeader() {
    return (
      <Appbar.Header>
        <Appbar.Content title="JH ProHealth" subtitle="Setup" />
      </Appbar.Header>
    );
  }
  
  async saveData() {
    const { patientID, radioSelectedIndex, heightFt, heightIn } = this.state;

    if (!patientID || patientID.length == 0) {
      this.setState({ patientError: true });
      return;
    }

    if (radioSelectedIndex == -1) {
      return;
    }

    await AsyncStorage.setItem('patientID', patientID + '');
    await AsyncStorage.setItem('heightFt', heightFt + '');
    await AsyncStorage.setItem('heightIn', heightFt + '');
    if (radioSelectedIndex == 1) await AsyncStorage.setItem('control', 'true');
    else await AsyncStorage.setItem('control', 'false');

    NavigationService.navigate('Loading');
  }

  renderContent() {
    const { radioSelectedIndex, patientError } = this.state;
    return (
      <ScrollView style={styles.content}>
        <Text style={styles.headerText}>Patient Data Setup</Text>
        <TextInput
          label="Patient ID"
          value={this.state.patientID}
          onChangeText={patientID => this.setState({ patientID })}
          error={patientError}
          style={styles.inputBox}
          keyboardType="number-pad"
        />
        <Text style={styles.heightText}>Patient Height</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={this.state.heightFt}
            style={styles.picker}
            onValueChange={heightFt => this.setState({ heightFt })}
          >
            <Picker.Item label="3 ft" value="3" />
            <Picker.Item label="4 ft" value="4" />
            <Picker.Item label="5 ft" value="5" />
            <Picker.Item label="6 ft" value="6" />
            <Picker.Item label="7 ft" value="7" />
            <Picker.Item label="8 ft" value="8" />
          </Picker>
          <Picker
            selectedValue={this.state.heightIn}
            style={styles.picker}
            onValueChange={heightIn => this.setState({ heightIn })}
          >
            <Picker.Item label="0 in" value="0" />
            <Picker.Item label="1 in" value="1" />
            <Picker.Item label="2 in" value="2" />
            <Picker.Item label="3 in" value="3" />
            <Picker.Item label="4 in" value="4" />
            <Picker.Item label="5 in" value="5" />
            <Picker.Item label="6 in" value="6" />
            <Picker.Item label="7 in" value="7" />
            <Picker.Item label="8 in" value="8" />
            <Picker.Item label="9 in" value="9" />
            <Picker.Item label="10 in" value="10" />
            <Picker.Item label="11 in" value="11" />
          </Picker>
        </View>
        <View style={styles.radioContainer}>
          <Text style={styles.heightText}>Patient's Group</Text>
          <View style={styles.radioItemContainer}>
            <TouchableOpacity
              style={[
                styles.radioItem,
                radioSelectedIndex == 0 && styles.radioSelectedItem
              ]}
              onPress={() => this.setState({ radioSelectedIndex: 0 })}
            >
              <Text
                style={[
                  styles.radioItemText,
                  radioSelectedIndex == 0 && styles.radioSelectedText
                ]}
              >
                Intervention
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioItem,
                radioSelectedIndex == 1 && styles.radioSelectedItem
              ]}
              onPress={() => this.setState({ radioSelectedIndex: 1 })}
            >
              <Text
                style={[
                  styles.radioItemText,
                  radioSelectedIndex == 1 && styles.radioSelectedText
                ]}
              >
                Control
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView style = {styles.buttonView}>
        <Button
          mode="contained"
          onPress={() => {
            this.saveData();
          }}
          style={styles.button}
        >
          Finish Setup
        </Button>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }
}
