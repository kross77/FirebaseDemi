'use strict';

import React, {Component} from 'react';
import { Text, TouchableOpacity } from 'react-native';
const styles = require('../styles.js');

class ActionButton extends Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					height: 40,
					backgroundColor: '#0fff91',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onPress={this.props.onPress}
			>
					<Text style={{
						fontSize: 15,
						fontWeight: 'bold',
					}}>{this.props.title}</Text>
			</TouchableOpacity>
		);
	}
}

module.exports = ActionButton;