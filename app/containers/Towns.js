import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Dimensions, ActivityIndicator} from "react-native";
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
			listData: [],
		}

	}


	componentWillReceiveProps(newProps) {
		let {towns} = newProps;
		if (towns) {
			console.log('componentWillReceiveProps', {towns}, newProps);
			this.state = {
				listData: towns,
			}
		}

	}

	renderRow(rowData, sectionId, index) {
		const cellViews = rowData.map((item, id) => {
			return (
				<TouchableOpacity onPress={ () => {
					this.props.onItemPress(item)
				}} style={{paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 2}} key={id}>

					<Image
						style={{backgroundColor: 'transparent', height: window.height / 5}}
						defaultSource={require('../../assets/no-town.png')}
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
			<GridRow columns={2} style={{backgroundColor: 'transparent', paddingLeft: 13, paddingRight: 13}}>
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
		const {loading} = this.props;
		return (
			<Screen style={{backgroundColor: 'transparent'}}>
				{
					loading ?
						<ActivityIndicator
							animating={this.state.animating}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								padding: 8,
								height: 80
							}}
							size="large"
						/>
						:
						<ListView
							data={groupedData}
							renderRow={this.renderRow}
						/>
				}

			</Screen>
		);
	}
}


export default Towns

Towns.propTypes = {
	onItemPress: PropTypes.func,
	source: PropTypes.any,
	towns: PropTypes.array,
	loading: PropTypes.bool,
};

Towns.defaultProps = {
	source: {"uri": "https://yandex.by/images/today?size=1920x1080"},
	loading: true,
}

