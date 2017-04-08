import React, {Component} from "react";
import {StyleSheet, Image, View} from "react-native";
import {Tile, Overlay, TouchableOpacity, ScrollView, Screen, Divider, Text, Subtitle} from "@shoutem/ui";
import {ScrollDriver} from "@shoutem/animation";
import {jobs} from "../db/firebase";
import {connect} from "react-redux";
import moment from "moment";
import {navigatePush} from "../redux";
import Towns from "./Towns";
import Logo from "./elements/Logo";
import Header from "./elements/Header";


const s = {
	logoText: {
		fontSize: 11, color: 'black', fontWeight: '200', fontStyle: 'italic'
	},
	selectedListItem: {
		color: 'green'
	}
};

class SelectCity extends Component {
	static propTypes = {
		addPropertyOfTheDayView: React.PropTypes.func,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.renderHeader = this.renderHeader.bind(this);
		this.state = {
			listData: [],
			loading: true,
			header: {
				visible: false,
				back: {
					onPress: () => {},
					visible: true,
				},
				title: 'Choose City'
			}
		}
	}


	renderHeader = (header) => (
		<Image style={{ height: 71, justifyContent: 'center', alignItems: 'center'}} source={require('./../../assets/header-bg.png')}>
			<Subtitle>{header.title.toUpperCase()}</Subtitle>
		</Image>
	);

	render() {
		const {header, loading} = this.state;
		return (
				<Screen>
					<Header
						backVisible={false}
						title={header.title}
					/>
					<View style={{flex: 1}}>
						<ScrollView >
							<Logo />
							<Towns onItemPress={this.props.addPropertyOfTheDayView}/>
						</ScrollView>
					</View>
				</Screen>

		);
	}
}


const mapDispatchToProps = (dispatch) => ({
	addPropertyOfTheDayView: (item) => {
		dispatch(navigatePush({
			key: 'PropertyOfTheDay',
			item: item.name,
		}, {item}));
	},
	onAddButtonPress: () => {
		dispatch(navigatePush({
			key: 'CallAPI',
		}));
	},
});

export default connect(
	undefined,
	mapDispatchToProps
)(SelectCity);

