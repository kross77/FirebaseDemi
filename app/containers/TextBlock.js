import React, {Component} from "react";
import {StyleSheet, View, Dimensions, Image} from "react-native";
import {Title, Subtitle, Text, Overlay, TouchableOpacity, Screen, GridRow, ListView} from "@shoutem/ui";
import {ScrollDriver} from "@shoutem/animation";


const window = Dimensions.get('window');

const driver = new ScrollDriver();

const s = {
	logoText: {
		fontSize: 11, color: 'black', fontWeight: '200', fontStyle: 'italic'
	},
	selectedListItem: {
		color: 'green'
	}
};

class Towns extends Component {
	static propTypes = {
		addPropertyOfTheDayView: React.PropTypes.func,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		// this.jobs = jobs();
		this.state = {
			listData: [
				'4 reception rooms',
				'2 guest apartments, staff flat',
				'swimming pool and summer studio',
				'7/8 bedrooms, 5 bathrooms',
				'tennis court',
				'cinema, gym',
				'EPC Rating = C',
			],
		}
	}

	renderRow(rowData, sectionId, index) {

		return (
			<TouchableOpacity key={index}>
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20, paddingBottom: 15}}>
					<Image style={{marginRight: 7}} source={require('./../../assets/text-bullet.png')} />
					<Text style={{fontSize: 14, color: 'black'}}>{rowData}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {

		return (
			<Screen style={{backgroundColor: 'transparent', flex: 1, paddingTop: 10}}>
				<View style={{alignItems: 'center'}}>
					<Title style={{paddingBottom: 20}}>Key Features</Title>
				</View>

				<ListView
					data={this.state.listData}
					renderRow={this.renderRow}
				/>
			</Screen>
		);
	}
}

Towns.defaultProps = {
	title: 'Key Features',
};

export default Towns

