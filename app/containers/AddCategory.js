import React, {Component} from "react";
import {Image, View, TextInput, ListView, Tile, Title, Subtitle, TouchableOpacity, Screen, Divider, Button, Text} from "@shoutem/ui";
import {NavigationBar} from "@shoutem/ui/navigation";
import firebaseApp from "../db/firebase";
import {connect} from "react-redux";
import {navigatePop} from "../redux";

class RestaurantsList extends Component {
	static propTypes = {
		onAddButtonPress: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.categories = firebaseApp.database().ref();
		this.state = {
			name: '',
			imageUrl: '',
			canStorage: false,
		};
		this.onSavePress = this.onSavePress.bind(this);
	}

	componentDidUpdate( ){
		const {name, imageUrl, canStorage} = this.state;
		const newValue = name && imageUrl && name.length > 0 && imageUrl.length > 0;
		if(canStorage != newValue){
			this.setState({canStorage: newValue})
		}
	}

	onSavePress(){
		this.props.onAddButtonPress(this.state, this.categories);
	}

	render() {
		const {onAddButtonPress} = this.props;
		const {canStorage} = this.state;
		return (
			<Screen>
				<NavigationBar title="Add new category"/>
				<TextInput
					placeholder={'Category name'}
					onChangeText={
						(name) => {this.setState({name})}
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
		const { imageUrl, name } = state;
		itemsRef.push({ name, imageUrl });
		dispatch(navigatePop());
	},
});

export default connect(
	undefined,
	mapDispatchToProps
)(RestaurantsList);

