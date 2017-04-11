import React, { Component, PropTypes } from 'react'
import {Linking, View} from 'react-native'
import FacebookOAuth from './FacebookOAuth'
import GoogleOAuth from './GoogleOAuth'
import InstagramOAuth from './InstagramOAuth'
import TwitterOAuth from './TwitterOAuth'


export default class AuthListener extends Component{
	constructor(){
		super();
		this.state = {
			linkingURL: '',
		}
	}

	componentDidMount() {
		Linking.addEventListener('url', this._handleOpenURL);
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleOpenURL);
	}

	_handleOpenURL = (event) => {
		let linkingURL = event.url;
		this.setState({linkingURL});
	}

	render(){
		console.log('AuthListener render', this.state);
		return (
			<View>
				<FacebookOAuth
				appId='109735812909768'
				appSecret='45d25c5bfd12c5452c8f52211a625f48'
				redirectURI='http://tinyurl.com/kjbtjfu'
				linkingURL={this.state.linkingURL} />

				<GoogleOAuth
					appId='586484192857-fi3p60nntq86gphk6j9fg1d0bqamnpoj.apps.googleusercontent.com'
					appSecret='A3jDmqGvtM_herg5OF2NNbVK'
					redirectURI='https://gta-house.firebaseapp.com/google.html'
					scope='https://www.googleapis.com/auth/userinfo.profile'
					linkingURL={this.state.linkingURL} />

				<InstagramOAuth
					appId='86da33f311de49ea869f559ebd6794b5'
					appSecret='393be0e0f0944fa5ac384f23248a6caa'
					redirectURI='https://gta-house.firebaseapp.com/instagram.html'
					linkingURL={this.state.linkingURL} />

				<TwitterOAuth
					appId='aYPRu6NEsSov1ndNNSEFdF6JD'
					appSecret='9VvzpGAid7nhzsLiJNnT6BnjmM5P8bM89BqOXYWDGd3aYa88Bq'
					redirectURI='https://gta-house.firebaseapp.com/twitter.html'
					linkingURL={this.state.linkingURL} />
			</View>
		)
	}
}

AuthListener.propTypes = {
};