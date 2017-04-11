import {Linking} from 'react-native';

export default function openLink(url) {
	console.log('open link', url);
	return new Promise((resolve, reject) => {
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
				console.log('Can\'t handle url: ' + url);
			} else {
				return resolve(Linking.openURL(url));
			}
		}).catch(err => reject(err));
	})

}