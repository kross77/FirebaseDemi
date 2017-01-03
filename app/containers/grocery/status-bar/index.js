'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Text, View} = ReactNative;

class StatusBar extends Component {
	render() {
		return (
			<View style={styles.statusBar}>
				<View style={styles.statusbar}/>
				<View style={styles.navbar}>
					<Text style={styles.navbarTitle}>{this.props.title}</Text>
				</View>
			</View>
		);
	}
}

export default StatusBar;