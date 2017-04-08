import React, {Component} from "react";
import {StyleSheet, Image, View} from "react-native";
import {Tile, Button, Overlay, TouchableOpacity, ScrollView, Screen, Divider, Text, Title, Subtitle} from "@shoutem/ui";
import {ScrollDriver} from "@shoutem/animation";
import {connect} from "react-redux";
import {navigatePush, navigatePop} from "../../redux";
import Features from "./Features";
import Properties from "./Properties";
import ImageBlock from "./ImageBlock/index";
import BottomBar from "./BottomBar/index";
import Header from "../elements/Header";


const driver = new ScrollDriver();

const s = {
	logoText: {
		fontSize: 11, color: 'black', fontWeight: '200', fontStyle: 'italic'
	},
	selectedListItem: {
		color: 'green'
	},
	point: {
		marginLeft: 2,
		marginRight: 2,
	}
};

class PropertyOfTheDay extends Component {
	static propTypes = {
		addPropertyOfTheDayView: React.PropTypes.func,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			listData: [],
			loading: true,
			header: {
				visible: false,
				back: {
					onPress: () => {
					},
					visible: true,
				},
				title: 'Property of the day'
			}
		}
	}


	render() {
		const {header, loading} = this.state;
		return (
			<Screen>
				<Header
					backVisible={header.back.visible}
					title={header.title}
				/>

				<View style={{flex: 1}}>

					<ScrollView >
						<View style={{flex: 1, alignItems: 'center'}}>
							<Title
								style={{width: 375 * 0.8, textAlign: 'center', fontStyle: 'italic', lineHeight: 20, paddingTop: 10, paddingBottom: 10}}>7 BEDROOM DETACHED HOUSE FOR SALE</Title>
						</View>
						<View style={{flex: 1, alignItems: 'center'}}>
							<ImageBlock/>
						</View>

						<Properties />
						<Features />
					</ScrollView>

				</View>
				<BottomBar />

			</Screen>

		);
	}
}


const mapDispatchToProps = (dispatch) => ({
	addPropertyOfTheDayView: (category) => {
		dispatch(navigatePush({
			key: 'JobDetails',
			title: category.name,
		}, {category}));
	},
});

export default connect(
	undefined,
	mapDispatchToProps
)(PropertyOfTheDay);

