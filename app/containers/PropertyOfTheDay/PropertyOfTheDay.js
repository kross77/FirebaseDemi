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


	componentWillMount(){
		console.log('componentWillMount', this.props);
	}

	renderDescription(){
		let{property} = this.props;
		if(property.description){
			return(
				<View style={{ flex: 1}}>
					<View style={{alignItems: 'center'}}>
						<Title>Description</Title>
					</View>

					<View styleName="fullWidth" style={{padding: 20, paddingBottom: 50, flex: 1, alignItems: 'flex-start'}}>
						<Text style={{color: 'black', fontSize: 13, fontStyle: 'italic'}}>{property.description}</Text>
					</View>

				</View>
			)
		}
		return null;
	}


	render() {
		const {header, loading} = this.state;
		const { property } = this.props;
		const { images } = property;
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
								style={{width: 375 * 0.8, textAlign: 'center', fontStyle: 'italic', lineHeight: 20, paddingTop: 10, paddingBottom: 10}}>{property.name}</Title>
						</View>



						{images ? <View style={{flex: 1, alignItems: 'center'}}>
										<ImageBlock images={images}/>
									</View> : null }
						{property.items ? <Properties items={property.items} /> : null }
						{property.features ? <Features points={property.features} /> : null }
						{
							this.renderDescription()
						}

					</ScrollView>
				</View>

				<BottomBar />

			</Screen>

		);
	}
}

PropertyOfTheDay.propTypes = {
	property: Object,
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

