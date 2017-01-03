import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';

import styles from './styles';
import ListItem from './list-item';
import ActionButton from './action-button';
import StatusBar from './status-bar';



export default class GroceryApp extends Component {

	constructor(){
		super();
		const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => (row1 !== row2)});
		this.state = {
			dataSource: ds.cloneWithRows([ {title: 'Pizza'} ]),
		}
		this.renderItem = this.renderItem.bind(this)
	}


	renderItem(item) {
		return (
			<ListItem item={item} onpress={() => {}}/>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text>Grocery List</Text>
				</View>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderItem}
					style={styles.listview} />
				<ActionButton title="Add" onpress={() => {}} />
			</View>
		);
	}
}