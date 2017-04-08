import React, {Component} from "react";
import {StyleSheet, Image, View, Linking} from "react-native";
import {Tile, Button, Overlay, TouchableOpacity, ScrollView, Screen, Divider, Text, Title, Subtitle} from "@shoutem/ui";
import {connect} from "react-redux";
import {navigatePush} from "../../redux";
import Logo from "../elements/Logo";


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


	render() {
		const {addSelectCityView} = this.props;
		return (
			<Screen style={{flex: 1}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} source={require('./../../../assets/bg.png')}>
					<View>
						<Logo />
						{this.renderButton('Facebook', ()=> { console.log(addSelectCityView); addSelectCityView() })}
						{this.renderButton('Google', addSelectCityView)}
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

