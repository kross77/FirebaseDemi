import React, {Component, PropTypes} from "react";
import OAuthManager from "react-native-oauth";
import {View, Button, Text} from '@shoutem/ui';

export default class GoogleOAuth extends Component {
	componentWillMount() {
		const manager = new OAuthManager('GTAHouseIOS');
		manager.configure({
			google: {
				callback_url: `com.googleusercontent.apps.586484192857-7t0q6ad9lu8ueve9ecnqkg2isufb0m9s`,
				client_id: '586484192857-7t0q6ad9lu8ueve9ecnqkg2isufb0m9s.apps.googleusercontent.com',
			}
		});
		console.log('GoogleOAuth componentWillMount manager', manager);
		this.setState({manager});
	}

	onPress = () => {
		let {manager} = this.state;
		console.log('GoogleOAuth onPress manager', manager);
		manager.authorize('Google', {scopes: 'email'})
			.then(resp => console.log(resp))
			.catch(err => console.log(err));
	};

	render() {
		return (
			<View style={{paddingTop: 10}}>
				<Button onPress={this.onPress} styleName='green'>
					<Text >GOOGLE</Text>
				</Button>
			</View>
		)
	}
}