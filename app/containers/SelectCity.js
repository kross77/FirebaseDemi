import React, {Component} from "react";
import {StyleSheet, Image, View} from "react-native";
import {Tile, Overlay, TouchableOpacity, ScrollView, Screen, Divider, Text, Subtitle} from "@shoutem/ui";
import {ScrollDriver} from "@shoutem/animation";
import {firebaseApp} from "../db/firebase";
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

	componentDidMount() {
		let town = firebaseApp.database().ref('/towns');
		let properties = firebaseApp.database().ref('/properties');
		let contacts = firebaseApp.database().ref('/contacts');
		this.parseTowns(town);
		this.parseProperties(properties);
		this.parseContacts(contacts);
	}

	parseTowns(itemsRef) {
		console.log('parseTowns', itemsRef);
		itemsRef.on('value', (snap) => {
			setTimeout(()=> null, 0);
			// get children as an array
			let items = [];
			snap.forEach((child) => {
				const {name, image, location, propertyId} = child.val();
				items.push({
					name,
					image,
					location,
					propertyId,
					key: child.key
				});
			});
			console.log('parseTowns on value', items);
			this.setState({
				towns: items,
				loading: false,
			});

		});
	}

	parseProperties(itemsRef) {
		console.log('parseProperties', itemsRef);
		itemsRef.on('value', (snap) => {
			setTimeout(()=> null, 0);
			// get children as an array
			let properties = {};
			snap.forEach((child) => {
				const {name, description, items, features, images} = child.val();
				properties[child.key] = {
					name,
					images,
					features,
					description,
					items,
					key: child.key
				};
			});
			console.log('parseProperties on value', properties);
			this.setState({
				properties,
			});

		});
	}

	parseContacts(itemsRef) {
		console.log('parseContacts', itemsRef);
		itemsRef.on('value', (snap) => {
			setTimeout(()=> null, 0);
			// get children as an array
			let contacts = [];
			snap.forEach((child) => {
				const {name, phone, title, image} = child.val();
				contacts.push({
					name,
					image,
					phone,
					title,
					key: child.key
				});
			});
			console.log('parseContacts on value', contacts);
			this.setState({
				contacts,
			});

		});
	}


	renderHeader = (header) => (
		<Image style={{ height: 71, justifyContent: 'center', alignItems: 'center'}} source={require('./../../assets/header-bg.png')}>
			<Subtitle>{header.title.toUpperCase()}</Subtitle>
		</Image>
	);

	render() {
		const {header, loading, contacts, towns} = this.state;
		return (
				<Screen>
					<Header
						backVisible={false}
						title={header.title}
					/>
					<View style={{flex: 1}}>
						<ScrollView >
							<Logo />
							<Towns
								towns={towns}
								loading={loading}
								onItemPress={(item) => {
								this.props.addPropertyOfTheDayView(item, this.state.properties[item.propertyId], contacts)
							}}/>
						</ScrollView>
					</View>
				</Screen>

		);
	}
}


const mapDispatchToProps = (dispatch) => ({
	addPropertyOfTheDayView: (item, property, contacts) => {
		dispatch(navigatePush({
			key: 'PropertyOfTheDay',
			item: item.name,
		}, {property, contacts}));
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

