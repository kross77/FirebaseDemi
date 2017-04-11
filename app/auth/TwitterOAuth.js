import React, {Component, PropTypes} from "react";
import {View, Button, Text} from "@shoutem/ui";
import storage from "../util/async-storage/asyncStorage";
import oauthSignature from "oauth-signature";
import moment from "moment";

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

	componentWillUpdate() {
		let {token, loading} = this.state;
		if (token && loading) {
			this.checkToken();
		}
	}

	checkToken = async() => {
		let {token} = this.state;
		// console.log('check token ',{ token });
		let url = "https://graph.facebook.com/me/?access_token=" + token + "&fields=email,name";
		console.log('checkToken -> ', {url});
		let response = await fetch(url);

		await setTimeout(() => null, 0);
		let userData = await response.json();
		console.log({userData});
		//this.props.onUserData(userData);
		this.setState({loading: false, auth: true})
	};

	authorize = async() => {
		let url = 'https://api.twitter.com/oauth/request_token';
		let options = this.getRequestOptions(url).request;
		console.log("fetch", {url, options});
		let response = await fetch(url, options).catch(err => console.log({err}));
		await setTimeout(() => null, 0);
		let json = await response.json();
		console.log('request_token response', json);

		// openLink(`https://www.facebook.com/v2.8/dialog/oauth?client_id=${appId}&redirect_uri=${redirectURI}`)
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
		if (access_token) {
			storage.write(tokenKey, access_token);
			console.log('storage wrote', {tokenKey, access_token});
			this.setState({token: access_token})
		} else {
			console.log('response error', {json});
		}
	};

	getRequestOptions(url = 'http://api.twitter.com/oauth/request_token') {
		let httpMethod = 'POST',
			parameters = {
				oauth_consumer_key: 'aYPRu6NEsSov1ndNNSEFdF6JD',
				oauth_token: '95907000-vqFmNsMJaBycgljcxNjZeG7zZSn4Hjv0YEnN83P2m',
				oauth_nonce: this.generateOauthNonce(),
				oauth_timestamp: moment().unix(),
				oauth_signature_method: 'HMAC-SHA1',
				oauth_version: '1.0',
			},
			consumerSecret = '9VvzpGAid7nhzsLiJNnT6BnjmM5P8bM89BqOXYWDGd3aYa88Bq',
			tokenSecret = 'P0L6Ary2uZdBDbcEkfTwvFzjdFzJetVx670ck4Vlbwp1R',
			// generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
			encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret);
			// generates a BASE64 encode HMAC-SHA1 hash
			// signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
			// 	{encodeSignature: false});

			parameters.oauth_signature = encodedSignature;
		return {
			request: {
				method: httpMethod,
				headers: parameters
			}
		};
	}

	generateOauthNonce() {
		return 'xxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		})
	}

	render() {
		console.log('render', this.state);
		return (
			<View>
				<Button styleName="green verticalMargin" onPress={this.authorize}>
					<Text>TWITTER</Text>
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