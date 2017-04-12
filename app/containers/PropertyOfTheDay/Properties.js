import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {Subtitle, Text, TouchableOpacity, Screen, GridRow, ListView} from "@shoutem/ui";


const window = Dimensions.get('window');

const s = {
	logoText: {
		fontSize: 11, color: 'black', fontWeight: '200', fontStyle: 'italic'
	},
	selectedListItem: {
		color: 'green'
	}
};

class Properties extends Component {
	static propTypes = {
		addPropertyOfTheDayView: React.PropTypes.func,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		// this.jobs = jobs();
		this.state = {
			listData: [],
		}
	}

	componentWillReceiveProps(newProps) {
		let {items} = newProps;
		this.setState({listData: items});
	}

	renderRow(rowData, sectionId, index) {

		const cellViews = rowData.map((item, id) => {
			return (
				<TouchableOpacity style={{paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom:2}} key={id}>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 30}}>
						<Text style={{fontSize: 10}}>{item.property}</Text>
						<Subtitle style={{fontWeight: '500'}}>{item.value}</Subtitle>
					</View>

				</TouchableOpacity>
			);
		});
		return (
			<GridRow columns={2} style={{ backgroundColor: 'transparent', paddingLeft: 13, paddingRight: 13}}>
				{cellViews}
			</GridRow>
		);
	}

	render() {
		// Group the restaurants into rows with 2 columns, except for the
		// first article. The first article is treated as a featured article
		let isFirstArticle = true;
		const groupedData = GridRow.groupByRows(this.state.listData, 2, () => {
			return 1;
		});
		console.log('render Features', groupedData);
		return (
			<Screen style={{backgroundColor: 'transparent'}}>

				<ListView
					data={groupedData}
					renderRow={this.renderRow}
				/>
			</Screen>
		);
	}
}


export default Properties

Properties.propTypes = {
	items: PropTypes.array,
};

Properties.defaultProps = {
	items: [
		{property: 'Price', value: '120 000$'},
		{property: 'Basement Type', value: 'Finished'},
		{property: 'Storeys', value: 'Two levels'},
		{property: 'Land Size', value: '112 x 220 feet'},
		{property: 'Parking Type', value: 'Garage'},
		{property: 'Main Intersection', value: 'Lawrence & Dupont'}
	]
};

