import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import SetupScreen from '../screens/SetupScreeen';
import SurveyScreen from '../screens/SurveyScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import FeedbackScreen from '../screens/FeedbackScreen';
import GraphScreen from '../screens/GraphScreen';
import LoadingScreen from '../screens/LoadingScreen';

const feedbackNavigator = createStackNavigator(
  {
    Feedback: FeedbackScreen,
    Graph: GraphScreen
  },
  {
    initialRouteName: 'Feedback',
    headerMode: 'none'
  }
);

const tabNavigator = createBottomTabNavigator(
  {
    Survey: SurveyScreen,
    Feedback: feedbackNavigator
  },
  {
    initialRouteName: 'Feedback', 
    tabBarVisible: false,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Survey') {
          iconName = `ios-paper`;
        } else if (routeName === 'Feedback') {
          iconName = `ios-pie`;
        }

        return <IconComponent name={iconName} size={18} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.main,
      inactiveTintColor: 'gray'
    }
  }
);

const switchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Setup: SetupScreen,
    Welcome: WelcomeScreen,
    Survey: tabNavigator
  },
  {
    // initialRouteName: 'Setup',
    initialRouteName: 'Survey',
    headerMode: 'none'
  }
);

export default createAppContainer(switchNavigator);
