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
			.then(() => {
				this.checkToken();
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

	checkToken = async () => {
		let {token} = this.state;
		if(token){
			// console.log('check token ',{ token });
			let url = "https://graph.facebook.com/me/?access_token="+token+"&fields=email,name";
			console.log('checkToken -> ', {url});
			let response = await fetch(url);

			await setTimeout(()=> null, 0);
			let userData = await response.json();
			this.props.onAuth(userData);
			this.setState({loading: false, auth: true})
		}else{
			this.setState({loading: false, auth: false})
		}

	};

	authorize = () => {
		let {appId, redirectURI} = this.props;
		openLink(`https://www.facebook.com/v2.8/dialog/oauth?client_id=${appId}&redirect_uri=${redirectURI}`)
	};

	logout = () => {
		let {onLogout} = this.props;
		let {tokenKey} = this.state;
		storage.remove(tokenKey);
		onLogout();
		this.setState({auth: false})
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
			this.setState({token: access_token});
			this.checkToken();
		}else{
			console.log('response error', {json});
		}
	};

	render() {
		let {auth, loading} = this.state;
		return (
			<View>
				<Button styleName="green verticalMargin" onPress={auth ? this.logout : this.authorize}>
					<Text>{loading ? 'Loading...' : (auth ? 'LOGOUT FROM FACEBOOK' : 'FACEBOOK')}</Text>
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
	onAuth: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
};