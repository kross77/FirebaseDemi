import React, {PropTypes} from 'react';
import  {Image, TouchableOpacity} from 'react-native';
import {Text, View, Subtitle} from '@shoutem/ui';
import {navigatePop} from "../../redux";
import {connect} from "react-redux";

const s = {
	logoText: {
		fontSize: 11, color: 'black', fontWeight: '200', fontStyle: 'italic'
	}
};

const Header = (props) => (
	<View style={{ backgroundColor: '#2D8040', height: 71, justifyContent: 'center', alignItems: 'center'}}
		   source={require('./../../../assets/header-bg.png')}>
		{ renderBackButton(props) }
		<Subtitle style={{color: 'white', marginTop: 20}}>{props.title.toUpperCase()}</Subtitle>
	</View>
);


function renderBackButton(props) {
	if(props.backVisible){
		return (
			<TouchableOpacity onPress={props.backToPreviousView} style={{position: 'absolute', left: 20, top: 17, padding:10}}>
				<Subtitle style={{color: 'white', marginTop: 10}}>{'<'}</Subtitle>
			</TouchableOpacity>
		)
	}
	return null;
}

Header.propTypes = {
	title: PropTypes.string,
	backVisible: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => ({
	backToPreviousView: () => {
		dispatch(navigatePop());
	},
});

export default connect(
	undefined,
	mapDispatchToProps
)(Header);