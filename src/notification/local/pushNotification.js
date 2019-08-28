import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';

export default calss pushNotification extends Component{
	componentDidMount(){
		PushNotification.configure({
			noNotification : function(notifcation){
				console.log('Notification !!!:' notifcation);
			},
		});
	}
	render(){
		return null;
	}
}