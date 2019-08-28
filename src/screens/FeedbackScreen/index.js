import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text
} from 'react-native';
import { Appbar, Button, RadioButton, TextInput } from 'react-native-paper';
import styles from './style';
import colors from '../../constants/colors';
import NavigationService from '../../navigation/NavigationService';

const { width } = Dimensions.get('window');

const Option = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 48,
        height: 80,
        borderWidth: 1,
        borderRadius: 14,
        marginBottom: 48,
        padding: 16
      }}
    >
      <Image source={props.source} />
      <Text style={{ flex: 1, textAlign: 'center', fontSize: 20 }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default class FeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader() {
    return (
      <Appbar.Header>
        <Appbar.Content title="JH ProHealth" subtitle="Feedback" />
      </Appbar.Header>
    );
  }

  renderIntervention() {
    return (
      <View>
      <ScrollView
          contentContainerStyle={{ padding: 16, alignItems: 'center' }}
        >

        <Text
          style={{
            marginVertical: 48,
            fontSize: 24,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: colors.main
          }}
        >
          My Progress
        </Text>
          <Option
            source={require('../../assets/icons/icons8-walking.png')}
            text={'Daily Steps'}
            onPress={() => NavigationService.navigate('Graph', {key: 'STEP'})}
          />
          <Option
            source={require('../../assets/icons/icons8-clock_8.png')}
            text={'Weekly Active Hours'}
            onPress={() => NavigationService.navigate('Graph', {key: "ACTIVE"})}
          />
          <Option
            source={require('../../assets/icons/icons8-industrial_scales.png')}
            text={'Average Weight'}
            onPress={() => NavigationService.navigate('Graph', {key: "WEIGHT"})}
          />
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderIntervention()}
      </View>
    );
  }
}
