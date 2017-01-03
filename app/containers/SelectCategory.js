import React, {Component} from "react";
import {Image, ListView, Tile, Title, Subtitle,Overlay, TouchableOpacity, Screen, Divider, Button, Text} from "@shoutem/ui";
import {NavigationBar} from "@shoutem/ui/navigation";
import {categories} from "../db/firebase";
import {connect} from "react-redux";
import {navigatePush} from "../redux";

class RestaurantsList extends Component {
	static propTypes = {
		onButtonPress: React.PropTypes.func,
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.categories = categories();
		this.state = {
			listData: [],
			loading: true,
		}
	}

	componentDidMount() {
		this.listenForItems(this.categories);
	}

	listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {

			// get children as an array
			let items = [];
			snap.forEach((child) => {
				const {name, imageUrl} = child.val();
				items.push({
					name,
					imageUrl,
					key: child.key
				});
			});

			this.setState({
				listData: items,
				loading: false,
			});

		});
	}

	renderRow(restaurant) {
		const {onButtonPress} = this.props;

		return (
			<TouchableOpacity onPress={() => onButtonPress(restaurant)}>
				<Image
					styleName="large-banner"
					source={{ uri: restaurant.imageUrl }}
				>
					<Tile >
						<Title styleName="md-gutter-bottom">{restaurant.name}</Title>
					</Tile>
				</Image>
				<Divider styleName="line"/>
			</TouchableOpacity>
		);
	}

	renderLoading(){
		if(this.state.loading){
			return (
				<Overlay style={{backgroundColor: 'green'}}>
					<Text>Loading....</Text>
				</Overlay>
			)
		}else{
			return null;
		}
	}

	render() {
		const {onAddButtonPress} = this.props;
		return (
			<Screen>
				<NavigationBar title="Browse Categories"/>
				{this.renderLoading()}

				<ListView
					data={this.state.listData}
					renderRow={restaurant => this.renderRow(restaurant)}
				/>
				<Button onPress={onAddButtonPress}>
					<Text>ADD</Text>
				</Button>
			</Screen>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	onButtonPress: (category) => {
		dispatch(navigatePush({
			key: 'Dashboard',
			title: category.name,
		}, {category}));
	},
	onAddButtonPress: () => {
		dispatch(navigatePush({
			key: 'AddCategory',
		}));
	},
});

export default connect(
	undefined,
	mapDispatchToProps
)(RestaurantsList);

