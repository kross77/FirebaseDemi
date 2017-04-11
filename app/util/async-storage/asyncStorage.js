import {AsyncStorage} from 'react-native';

let storageName = "@Settings";

export async function write(key, value) {
	try {
		await AsyncStorage.setItem(storageName+':'+key, value);
	} catch (error) {
		// Error saving data
	}
}

export async function read(key, value) {
	try {
		return await AsyncStorage.getItem(storageName+':'+key, value);
	} catch (error) {
		throw error;
	}
}

export async function remove(key) {
	try {
		await AsyncStorage.removeItem(storageName+':'+key);
	} catch (error) {
		throw error;
	}
}

export default {write, read, remove};