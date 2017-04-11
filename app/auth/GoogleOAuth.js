import React, {Component, PropTypes} from "react";
import {View, Button, Text} from "@shoutem/ui";
import openLink from "../util/linking/openLink";
import getURLVariables from "../util/getURLVariables";
import storage from "../util/async-storage/asyncStorage";

export default class GoogleOAuth extends Component {
	constructor() {
		super();
		this.state = {
			error: null,
			loading: true,
			code: null,
			auth: false,
			tokenKey: 'googleToken',
			token: null,
		}
	}

	componentWillMount() {
		this.readToken()
			.catch(() => {
				this.setState({loading: false})
			})
			.then( ()=> {
				this.checkToken();
			})
	}

	componentWillReceiveProps(newProps) {
		let {linkingURL} = newProps;
		console.log({linkingURL});
		let {tokenKey} = this.state;
		if (linkingURL.search("google") != -1) {
			let newCode = linkingURL.replace('insta334://google/#%23', '');
			let urlVariables = getURLVariables(newCode);
			let {access_token} = urlVariables;
			console.log({access_token});
			this.setState({token: access_token});
			storage.write(tokenKey, access_token);
			this.checkToken();
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
		let {onAuth} = this.props;
		// console.log('check token ',{ token });
		let url = "https://www.googleapis.com/auth/userinfo.profile?access_token="+token;
		console.log('checkToken -> ', {url});
		let response = await fetch(url);

		await setTimeout(()=> null, 0);

		let userData = await response.text();
		console.log({userData});
		if(onAuth){
			onAuth(userData);
		}
		this.setState({loading: false, auth: true})
	};

	authorize = () => {
		let {appId, redirectURI, scope} = this.props;
		openLink(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${appId}&redirect_uri=${redirectURI}&response_type=token&scope=${scope}`)
	};

	logout = () => {
		let {tokenKey} = this.state;
		storage.remove(tokenKey);
		this.setState({auth: false});
	};



	render() {
		let {loading, auth } = this.state;
		return (
			<View>
				<Button onPress={auth ? this.logout : this.authorize}>
					<Text>{loading ? 'Loading...' : auth ? 'LOGOUT GOOGLE' : 'GOOGLE'}</Text>
				</Button>
			</View>
		)
	}
}

GoogleOAuth.propTypes = {
	appId: PropTypes.string.isRequired,
	linkingURL: PropTypes.string,
	scope: PropTypes.string,
	appSecret: PropTypes.string.isRequired,
	redirectURI: PropTypes.string.isRequired,
	onAuth: PropTypes.string.isRequired,
};