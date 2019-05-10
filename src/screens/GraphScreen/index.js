import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from 'react-native';
import { Appbar, Button, RadioButton, TextInput } from 'react-native-paper';
import styles from './style';
import colors from '../../constants/colors';
import { LineChart } from 'react-native-chart-kit';
import NavigationService from '../../navigation/NavigationService';

const url = `http://jhprohealth.herokuapp.com/polls`;
const KGTOLB = 2.20462;

const { width } = Dimensions.get('window');
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};

export default class GraphScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightArray: [],
      stepArray: [],
      activeArray: [],
      bmiZones: [],
      loading: true
    };
  }

  async componentDidMount() {
    const data = await fetch(`${url}/get_feedback/9999`);
    const json = await data.json();
    const feedbackArray = json.FeedbackData;
    const weightArray = feedbackArray.map(item => item.avg_weight * KGTOLB);
    const stepArray = feedbackArray.map(item => item.avg_steps);
    const activeArray = feedbackArray.map(item => item.total_active_min / 60);

    const { height } = feedbackArray[0];

    this.setState({ weightArray, stepArray, activeArray, loading: false });
    this.calculateBmiZones(height / 100);

    console.log('data', json);
    console.log('weight array', weightArray);
  }

  calculateBmiZones(height) {
    console.log('height', height);
    let bmiZones = [];
    const heightSquared = height * height;
    bmiZones.push(heightSquared * 18.5 * KGTOLB);
    bmiZones.push(heightSquared * 25 * KGTOLB);
    bmiZones.push(heightSquared * 30 * KGTOLB);
    console.log('bmi zones', bmiZones);
    this.setState({ bmiZones });
  }

  renderHeader() {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => NavigationService.back()} />
        <Appbar.Content title="JH ProHealth" subtitle="Feedback" />
      </Appbar.Header>
    );
  }

  renderBmiGraph(key, title, data) {
    const { bmiZones } = this.state;
    const labels = data.map((item, index) => index + 1);
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    data.forEach(element => {
      min = Math.min(element, min);
      max = Math.max(element, max);
    });

    console.log('min, max', min, max);

    const zoneUnderweight = Math.max(bmiZones[0] - min, 0);
    const zoneHealthy = bmiZones[1] - bmiZones[0];
    const zoneOverweight = bmiZones[2] - bmiZones[1];
    const zoneObese = Math.max(max - bmiZones[2], 0);
    const zoneSums = zoneUnderweight + zoneHealthy + zoneOverweight + zoneObese;

    const zoneUnderweightPercentage = (zoneUnderweight / zoneSums) * 100 + '%';
    const zoneHealthyPercentage = (zoneHealthy / zoneSums) * 100 + '%';
    const zoneOverweightPercentage = (zoneOverweight / zoneSums) * 100 + '%';
    const zoneObesePercentage = (zoneObese / zoneSums) * 100 + '%';

    const fieldColors = ['red', 'orange', 'green', 'blue'];
    const fieldLabels = ['Obese', 'Overweight', 'Healthy', 'Underweight'];

    return (
      <View style={{ marginVertical: 16 }}>
        <Text>{title}</Text>
        <View>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data
                }
              ]
            }}
            width={width - 32}
            height={200}
            withDots={true}
            withInnerLines={false}
            onDataPointClick={() => {}}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: 'blue',
              opacity: 0.2,
              top: 16,
              right: 24,
              left: 64,
              bottom: 34
            }}
          >
            <View
              style={{ height: zoneObesePercentage, backgroundColor: 'red' }}
            />
            <View
              style={{
                height: zoneOverweightPercentage,
                backgroundColor: 'orange'
              }}
            />
            <View
              style={{
                height: zoneHealthyPercentage,
                backgroundColor: 'green'
              }}
            />
            <View
              style={{
                height: zoneUnderweightPercentage,
                backgroundColor: 'blue'
              }}
            />
          </View>
        </View>
        <Text style={{ alignSelf: 'center', marginLeft: 24, color: '#404040' }}>
          Weeks
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 24
          }}
        >
          {fieldColors.map((e, i) => (
            <View
              key={i}
              style={{
                width: width / 3,
                height: 24,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <View
                style={{
                  backgroundColor: e,
                  width: 10,
                  height: 10,
                  opacity: 0.2
                }}
              />
              <Text style={{ marginLeft: 8 }}>{fieldLabels[i]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderGraph(key, title, data) {
    const labels = data.map((item, index) => index + 1);
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    data.forEach(element => {
      min = Math.min(element, min);
      max = Math.max(element, max);
    });

    const RECOMMENDED_STEPS = 4600;
    const RECOMMENDED_HOURS = 3;


    let topPercentage = 0, bottomPercentage = 0;

    if(key == 'STEPS') {
      bottomPercentage = RECOMMENDED_STEPS / max * 100;
      topPercentage = 100 - bottomPercentage;

      console.log(topPercentage, bottomPercentage);
    } else if(key == 'ACTIVE') {
      bottomPercentage = RECOMMENDED_HOURS / max * 100;
      topPercentage = 100 - bottomPercentage;
    }



    return (
      <View style={{ marginVertical: 16 }}>
        <Text>{title}</Text>
        <View>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data
                }
              ]
            }}
            width={width - 32}
            height={200}
            withInnerLines={false}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                backgroundColor: 'blue'
              }
            }}
            withDots
            fromZero
            style={{}}
          />

          <View
            style={{
              ...StyleSheet.absoluteFill,
              opacity: 0.2,
              top: 16,
              right: 24,
              left: 64,
              bottom: 34
            }}
          >
            <View style={{ height: topPercentage + "%", backgroundColor: 'green' }} />
            <View
              style={{
                height: bottomPercentage + "%",
                backgroundColor: 'red'
              }}
            />
          </View>
        </View>
        <Text style={{ alignSelf: 'center', marginLeft: 24, color: '#404040' }}>
          Weeks
        </Text>
      </View>
    );
  }

  renderText(key) {
    switch (key) {
      case 'WEIGHT':
        return (
          <Text>
            The Prostate Cancer Foundation recommends that all men achieve and
            maintain a healthy weight through a nutritious diet and regular
            physical activity. The green area is the healthy range of body mass
            index (BMI) based on your height.
          </Text>
        );
      case 'STEP':
        return (
          <Text>
            The target range of steps is based on the estimated number of steps
            associated with the recommended amount of physical activity in
            public health guidelines (achieving 30 minutes of activity on most
            days) in addition to your daily activity. {'\n\n'}BE SURE TO TALK TO
            YOUR DOCTOR ABOUT WHAT EXERCISE IS RIGHT FOR YOU
          </Text>
        );
      case 'ACTIVE':
        return (
          <Text>
            The Prostate Cancer Foundation recommends that all men should
            exercise as much as they are able. Exercising at a vigorous
            intensity for 3 or more hours per week may be needed to achieve the
            full benefit of exercise. However, brisk walking for 30 minutes on
            most days yields substantial benefits.{'\n\n'}BE SURE TO TALK TO
            YOUR DOCTOR ABOUT WHAT EXERCISE IS RIGHT FOR YOU{' '}
          </Text>
        );
    }
  }

  render() {
    const { weightArray, stepArray, activeArray, loading } = this.state;
    console.log(this.props);
    const { key } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 64 }} />
        ) : (
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 300 }}
          >
            {key == 'WEIGHT' &&
              this.renderBmiGraph('WEIGHT', 'WEIGHT (lbs)', weightArray)}
            {key == 'STEP' && this.renderGraph('STEPS', 'STEPS', stepArray)}
            {key == 'ACTIVE' &&
              this.renderGraph('ACTIVE', 'ACTIVITY (hr)', activeArray)}
            <View style={{ marginTop: 24 }}>{this.renderText(key)}</View>
          </ScrollView>
        )}
      </View>
    );
  }
}
