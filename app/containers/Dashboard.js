import React, {Component} from "react";
import {TouchableOpacity} from 'react-native';
import {ScrollView, GridRow, Divider, ListView, Button, Subtitle, Overlay, Text, Title, Image, Tile, Screen, View} from "@shoutem/ui";
import {connect} from "react-redux";
import {categoryImages} from "../db/firebase";
import {NavigationBar} from "@shoutem/ui/navigation";
import {navigatePush} from "../redux";
import _ from 'lodash';

class Dashboard extends Component {
	static propTypes = {
		category: React.PropTypes.object,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor() {
		super();
		this.onAddPress = this.onAddPress.bind(this);

		this.state = {
			listData: [],
		}
	}

	componentWillMount(){
		this.categoryImages = categoryImages(this.props.category.key)
	}

	componentDidMount() {
		this.listenForItems(this.categoryImages);
	}

	listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {

			// get children as an array
			let items = [];
			snap.forEach((child) => {
				const {name, imageUrl, location} = child.val();
				items.push({
					name,
					imageUrl,
					location,
					key: child.key
				});
			});

			this.setState({
				listData: items,
			});

		});
	}

	onAddPress(){
		this.props.onAddButtonPress(this.props.category)
	}

	renderRow(data) {
		// data contains grouped data for one row,
		// so we need to remap it into cells and pass to GridRow
		const cellViews = _.map(data, (item) => {
			return (
			<Image  key={item.key} styleName="medium-square" source={{ uri: item.imageUrl }}>
				<Overlay
					styleName="solid-bright"
					key={item.id}
				>
					<Tile>
						<Title>{item.name}</Title>
						<Subtitle>{item.location}</Subtitle>
					</Tile>
				</Overlay>
			</Image>
			);
		});
		return (
			<GridRow columns={2}>
				{cellViews}
			</GridRow>
		);
	}


	render() {
		const {category} = this.props;
		const groupedData = GridRow.groupByRows(this.state.listData, 2);
		return (
			<Screen styleName="paper full-screen">
				<NavigationBar
					title={category.name}
					styleName="clear"
					animationName="solidify"
				/>

				<ScrollView>
					<Image
						styleName="large hero"
						animationName="hero"
						source={{ uri: category.imageUrl }}
						key={category.name}
					>
						<Tile animationName="hero">
							<Title>{category.name}</Title>
						</Tile>
					</Image>

					<Screen styleName="paper">
						<ListView
							data={groupedData}
							renderRow={image => this.renderRow(image)}
						/>
					</Screen>
				</ScrollView>
				<Divider styleName="line"/>
				<Button onPress={this.onAddPress}>
					<Text>ADD ITEM</Text>
				</Button>
			</Screen>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	onAddButtonPress: (category) => {
		dispatch(navigatePush({
			key: 'AddItem',
		}, {category}));
	},
});

export default connect(
	undefined,
	mapDispatchToProps
)(Dashboard);
