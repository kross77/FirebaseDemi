import React, {Component, PropTypes} from "react";
import {View, Button, Text} from "@shoutem/ui";
import openLink from "../util/linking/openLink";
import storage from "../util/async-storage/asyncStorage";

export default class FacebookOAuth extends Component {
	constructor() {
		super();
		this.state = {
			error: null,
			loading: true,
			code: null,
			auth: false,
			tokenKey: 'facebookToken',
			token: null,
		}
	}

	componentWillMount() {
		this.readToken()
			.catch(() => {
				this.setState({loading: false})
			})
	}

	componentWillReceiveProps(newProps) {
		let {linkingURL, code} = newProps;
		if (linkingURL.search("facebook") != -1) {
			let newCode = linkingURL.replace('insta334://facebook?code=', '');
			this.tokenRequest(newCode);
		}
	}

	readToken = async() => {
		let {tokenKey}  = this.state;
		let token = await storage.read(tokenKey);
		if (token != null) {
			this.setState({token});
		} else {
			throw Error({mes: 'token not found'});
		}
	};

	componentWillUpdate(){
		let {token, loading} = this.state;
		if(token && loading){
			this.checkToken();
		}
	}

	checkToken = async () => {
		let {token} = this.state;
		// console.log('check token ',{ token });
		let url = "https://graph.facebook.com/me/?access_token="+token+"&fields=email,name";
		console.log('checkToken -> ', {url});
		let response = await fetch(url);

		await setTimeout(()=> null, 0);
		let userData = await response.json();
		console.log({userData});
		//this.props.onUserData(userData);
		this.setState({loading: false, auth: true})
	};

	authorize = () => {
		let {appId, redirectURI} = this.props;
		openLink(`https://www.facebook.com/v2.8/dialog/oauth?client_id=${appId}&redirect_uri=${redirectURI}`)
	};

	tokenRequest = async(code) => {
		console.log('token request -> ', {code});
		let {appId, redirectURI, appSecret} = this.props;
		let {tokenKey} = this.state;
		let requestURL = `https://graph.facebook.com/v2.8/oauth/access_token?client_id=${appId}&redirect_uri=${redirectURI}&client_secret=${appSecret}&code=${code}`;
		let response = await fetch(requestURL);
		await setTimeout(() => null, 0);
		let json = await response.json();

		console.log({json});
		let {access_token} = json;
		if(access_token){
			storage.write(tokenKey, access_token);
			console.log('storage wrote', {tokenKey, access_token});
			this.setState({token: access_token})
		}else{
			console.log('response error', {json});
		}
	};

	render() {
		console.log('render', this.state);
		return (
			<View>
				<Button onPress={this.authorize}>
					<Text>FACEBOOK</Text>
				</Button>
			</View>
		)
	}
}

FacebookOAuth.propTypes = {
	appId: PropTypes.string.isRequired,
	linkingURL: PropTypes.string,
	appSecret: PropTypes.string.isRequired,
	redirectURI: PropTypes.string.isRequired,
};