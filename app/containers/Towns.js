import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {Title, Image, Overlay, TouchableOpacity, Screen, GridRow, ListView} from "@shoutem/ui";
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
				{
					"name": "Toronto",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "NORTH YORK",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "PEEL",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "MARKHAM",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "RICHMOND HILL",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "VAUGHAN",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "NORTH YORK",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},{
					"name": "NORTH YORK",
					"address": "185 Sutter St, San Francisco, CA 94109",
					"image": this.props.source,
				},
			],
		}
	}

	renderRow(rowData, sectionId, index) {
		const cellViews = rowData.map((item, id) => {
			return (
				<TouchableOpacity onPress={ () => {this.props.onItemPress(item)}} style={{paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom:2}} key={id}>

					<Image
						style={{ backgroundColor: 'transparent', height: window.height / 5 }}
						source={item.image}
					>
						<Overlay style={{flex: 1, width: 200}}>
							<Title>{item.name.toUpperCase()}</Title>
						</Overlay>
					</Image>

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


export default Towns

Towns.propTypes = {
	onItemPress: PropTypes.func,
	source: PropTypes.any,
};

Towns.defaultProps = {
	source: {"uri": "https://yandex.by/images/today?size=1920x1080"},
}

