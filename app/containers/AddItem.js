import React, {Component} from "react";
import {Image, View, TextInput, ListView, Tile, Title, Subtitle, TouchableOpacity, Screen, Divider, Button, Text} from "@shoutem/ui";
import {NavigationBar} from "@shoutem/ui/navigation";
import {categoryImages} from "../db/firebase";
import {connect} from "react-redux";
import {navigatePop} from "../redux";

class AddItem extends Component {
	static propTypes = {
		onAddButtonPress: React.PropTypes.func,
		category: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onSavePress = this.onSavePress.bind(this);
	}

	componentWillMount(){
		let { category  } = this.props;

		category = category ? category : 0;

		this.state = {
			imageUrl: '',
			rating: 0,
			canStorage: false,
			category,
			location: "",
		};

		let categoryKey = category['key'];
		categoryKey = categoryKey ? categoryKey : "undefined",
		this.categoryImages = categoryImages(categoryKey);

	}

	componentDidUpdate( ){
		const {imageUrl, canStorage} = this.state;
		const newValue = imageUrl && imageUrl.length > 0;
		if(canStorage != newValue){
			this.setState({canStorage: newValue})
		}
	}

	onSavePress(){
		this.props.onAddButtonPress(this.state, this.categoryImages);
	}

	render() {
		const {canStorage, category, location} = this.state;
		return (
			<Screen>
				<NavigationBar title="Add new image"/>
				<TextInput
					placeholder={'Image name'}
					keyboardType="numeric"
					onChangeText={
						(name) => {this.setState({name})}
					}
				/>
				<Divider styleName="line"/>
				<TextInput
					placeholder={'Image location'}
					keyboardType="numeric"
					onChangeText={
						(location) => {this.setState({location})}
					}
				/>
				<Divider styleName="line"/>
				<TextInput
					placeholder={'Image URL (https://)'}
					onChangeText={
						(imageUrl) => {this.setState({imageUrl})}
					}
				/>
				<Divider styleName="line"/>

				<View style={{ flex: 1 }} />
				<Divider styleName="line"/>
				<Button styleName={canStorage ? 'dark' : 'dark-disable'}
						disabled={!canStorage}
						onPress={this.onSavePress}>
					<Text>SAVE</Text>
				</Button>
			</Screen>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	onAddButtonPress: (state, itemsRef) => {
		const { imageUrl, name, location } = state;
			itemsRef.push({name, location, imageUrl});
			dispatch(navigatePop());
		}
});

export default connect(
	undefined,
	mapDispatchToProps
)(AddItem);

