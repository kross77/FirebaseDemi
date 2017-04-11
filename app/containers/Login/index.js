import React, {Component} from "react";
import {StyleSheet, Image, View, Linking} from "react-native";
import {Tile, Button, Overlay, TouchableOpacity, ScrollView, Screen, Divider, Text, Title, Subtitle} from "@shoutem/ui";
import {connect} from "react-redux";
import {navigatePush} from "../../redux";
import Logo from "../elements/Logo";
import GoogleOAuth from "./GoogleOAuth";
import AuthListener from "../../auth/AuthListener";


class Login extends Component {
	static propTypes = {
		addPropertyOfTheDayView: React.PropTypes.func,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			listData: [],
			loading: true,
			accounts: {},
			data: [],
			header: {
				visible: false,
				back: {
					onPress: () => {
					},
					visible: true,
				},
				title: 'Choose City'
			}
		};
	}

	componentDidMount() {
		Linking.addEventListener('url', this._handleOpenURL);
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleOpenURL);
	}

	_handleOpenURL(event) {
		console.log('_handleOpenURL', {url: event.url});
	}


	render() {
		const {addSelectCityView} = this.props;
		return (
			<Screen style={{flex: 1}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} source={require('./../../../assets/bg.png')}>
					<View>
						<Logo />
						<Title styleName="green" style={{marginTop: 30, marginBottom: 10}}>Please introduce youself:</Title>
						<AuthListener onContinue={this.props.addSelectCityView} />
					</View>

				</View>
			</Screen>

		);
	}

	renderButton = (text, callBack = () => {}) => (
		<View style={{paddingTop: 10}}>
			<Button onPress={callBack} styleName='green'>
				<Text >{text.toUpperCase()}</Text>
			</Button>
		</View>

	);
}



const mapDispatchToProps = (dispatch) => ({
	addSelectCityView: () => {
		dispatch(navigatePush({
			key: 'SelectCity',
			name: 'test'
		},{}));
	},

});

export default connect(
	undefined,
	mapDispatchToProps
)(Login);

