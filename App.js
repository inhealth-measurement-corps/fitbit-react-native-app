import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/navigation';
import NavigationService from './src/navigation/NavigationService';
import { Provider } from 'mobx-react';
import stores from './src/stores';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A237E',
    accent: '#f1c40f'
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider {...stores}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="light-content" />
          <Navigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </PaperProvider>
      </Provider>
    );
  }
}
