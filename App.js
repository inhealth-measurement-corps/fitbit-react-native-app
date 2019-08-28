import React, { Component } from 'react';
import { StatusBar, Button, } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/navigation';
import NavigationService from './src/navigation/NavigationService';
//import { pushNotification }from './src/notification/remote/pushNotification';
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

//pushNotification.configure();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {time : 5};
  }

  // handleOnPress = () =>{
  //   pushNotification.localNotification();
  // }

  render() {
    return (
      // <View>
      // <Button 
      //   title={'Notification'}
      //   onPress = {handleOnPress}/>
      <Provider {...stores}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="light-content" />
          <Navigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}/>
        </PaperProvider>
      </Provider>
      // </View>
    );
  }
}