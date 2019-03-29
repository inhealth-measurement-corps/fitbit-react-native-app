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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import NavigationService from '../../navigation/NavigationService';

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
    this.state = {};
  }

  renderHeader() {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => NavigationService.back()} />
        <Appbar.Content title="JH ProHealth" subtitle="Feedback" />
      </Appbar.Header>
    );
  }

  renderGraph() {
    return (
      <View>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={width - 32}
          height={200}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  }

  renderProgressChart() {
    const data = [0.4, 0.6, 0.8];
    return (
      <ProgressChart
        data={data}
        width={width - 32}
        height={200}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }

  renderBarChart() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };
    return (
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        data={data}
        width={width - 32}
        height={200}
        chartConfig={chartConfig}
      />
    );
  }

  renderPieChart() {
    const data = [
      {
        name: 'Seoul',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Toronto',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Beijing',
        population: 527612,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'New York',
        population: 8538000,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Moscow',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      }
    ];
    return (
      <PieChart
        data={data}
        width={width - 32}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 300 }}>
          {this.renderGraph()}
          {this.renderProgressChart()}
          {this.renderBarChart()}
          {this.renderPieChart()}
        </ScrollView>
      </View>
    );
  }
}
