import React from 'react';
import {Image} from 'react-native';
import {Text, View, ImageGalleryOverlay} from '@shoutem/ui';


const s = {
	logoText: {
		fontSize: 11, color: 'black', fontWeight: '200', fontStyle: 'italic'
	}
};

const Logo = () => (
	<View style={{alignItems: 'center', paddingTop: 20, paddingBottom: 5}}>
		<Image style={{ backgroundColor: 'transparent'}} source={require('./../../../assets/logo.png')}/>
	</View>
);

export default Logo;