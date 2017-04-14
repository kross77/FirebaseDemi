import React, {Component, PropTypes} from "react";
import {StyleSheet, TouchableOpacity, Dimensions, Linking} from "react-native";
import {Button, Text, Image, View, Title} from "@shoutem/ui";
import ContactBlock from "../ContactBlock/index";

const width = Dimensions.get('window').width
export  default class BottomBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			selectedIndex: -1,
		}
	}

	render() {
		return (
			<View style={{ backgroundColor: 'white', alignItems: 'flex-end', paddingTop: 15}}>
				{this.renderCloseBtn()}
				<View styleName="clear" style={{width: width, alignItems: 'center'}}>
					{ this.renderContacts() }

				</View>
				<View style={{width, alignItems: 'stretch'} }>
					{ this.renderBottomBtn(this.state) }
				</View>

			</View>
		)
	}

	changeExpandState() {
		let {expanded, selectedIndex} = this.state;
		let {contacts} = this.props;
		if(!expanded){
			this.setState({expanded: true});
		}else if(selectedIndex != 1){
			Linking.openURL(`tel:${contacts[selectedIndex].phone}`);
		}


	}

	renderContacts() {
		let {selectedIndex, expanded} = this.state;
		let returnElement = null;
		if (selectedIndex != -1 && expanded) {
			returnElement = <View styleName="bottom-space">
				<Text styleName="ref-title">Reference number</Text>
				<Text styleName="ref-value bottom-space">#{this.props.refNum}</Text>
				<ContactBlock index={selectedIndex} contacts={ this.props.contacts }/>
			</View>
		} else if (expanded) {
			returnElement = <View>
				<Text styleName="ref-title">Reference number</Text>
				<Text styleName="ref-value bottom-space">#{this.props.refNum}</Text>
				<Title styleName="h-center bottom-space">CHOOSE REALTOR:</Title>
				<View style={{ flexDirection: 'row', paddingBottom: 35,}}>
					{this.props.contacts.map(this.renderContact)}
				</View>
			</View>
		}

		return returnElement;
	}

	renderContact = (contact, key) => (
		<TouchableOpacity key={key} onPress={() => { this.setState({selectedIndex: key}) }}>
			<View styleName="phone-contact">
				<Image styleName="phone-avatar" defaultSource={require('./../../../../assets/no-avatar.png')} source={{url: contact.image.uri}}/>
				<Text styleName="avatar-title">{contact.name}</Text>
				<Text styleName="avatar-profession">{contact.title}</Text>
			</View>
		</TouchableOpacity>
	);

	renderCloseBtn = () => {
		if(this.state.expanded){
			return(
				<TouchableOpacity onPress={() => {this.setState({selectedIndex: -1, expanded: false})}}>
					<Image style={{width: 15, height: 15, marginHorizontal: 15}}
						   source={require('./../../../../assets/close-btn.png')}/>
				</TouchableOpacity>
			);
		}
		return null
	};

	renderBottomBtn({expanded, selectedIndex}) {
		let label = expanded ? 'CALL' : 'I WANT IT';
		let disabled = expanded && selectedIndex == -1;
		let style = disabled ? 'dark-disable' : expanded ? 'green' : 'dark';
		return (
			<Button disabled={ disabled } styleName={style} style={{marginHorizontal: 50, marginVertical: 15}}
					onPress={this.changeExpandState.bind(this)}>
				<Text>{label}</Text>
			</Button>
		)
	}
}

BottomBar.propTypes = {
	contacts: PropTypes.array,
	refNum: PropTypes.string,
}

BottomBar.defaultProps = {
	refNum: "01245",
	contacts: []
}