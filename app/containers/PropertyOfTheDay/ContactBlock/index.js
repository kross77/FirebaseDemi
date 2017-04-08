import React, { Component } from 'react'
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native'
import {Image, View, Text} from '@shoutem/ui';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window')

var styles = {
	wrapper: {
		height: 240,
	},
	slide: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	},
	thumbWrap: {
		width: 100,
		borderWidth: 5,
		borderColor: '#000',
		flexDirection: 'row'
	},
	thumb: {
		width: 25,
		height: 25
	}
}
const Dot = () => (
	<Image style={{margin: 2}} source={require('./../../../../assets/image-swipe-point.png')} />
);

const ActiveDot = () => (
	<Image style={{margin: 2}}  source={require('./../../../../assets/image-swipe-active-point.png')} />
);

const Viewer = props =>
	<Swiper height={240}
			dot={Dot()}
			paginationStyle={{
			position: 'absolute',
			top: 240,
			}}
			activeDot={ActiveDot()}
			index={props.index}
			style={styles.wrapper}>
	{
		props.imgList.map((item, i) => <View key={i} style={styles.slide}>
			<View styleName="horizontal">
				<Image style={{marginTop: 40}} styleName="phone-avatar-big" source={{url: item.avatar}} />
				<Image style={{marginLeft: 20}} source={require('./../../../../assets/HomeLife.png')} />
			</View>

			<Text styleName="avatar-title-big" style={{ paddingTop: 10 }}>{item.title}</Text>
			<Text styleName="avatar-profession-big">{item.profession}</Text>
			<Text styleName="avatar-phone-big">{item.phone}</Text>
		</View>)
	}
</Swiper>

export default class extends Component {
	constructor (props) {
		super(props)
		this.state = {
			imgList: [],
			showViewer: true,
			showIndex: 0
		}
		this.viewerPressHandle = this.viewerPressHandle.bind(this)
		this.thumbPressHandle = this.thumbPressHandle.bind(this)
	}

	componentWillReceiveProps(newProps){
		console.log(newProps);
		let {contacts, index} = newProps;
		this.setState({imgList: contacts, showIndex: index})
	}
	viewerPressHandle () {
		this.setState({
			showViewer: false
		})
	}
	thumbPressHandle (i) {
		this.setState({
			showIndex: i,
			showViewer: true
		})
	}
	render () {
		return (
			<View style={{position: 'relative'}}>
				<Viewer
					index={this.state.showIndex}
					pressHandle={this.viewerPressHandle}
					imgList={this.state.imgList} />
			</View>

		)
	}
}

Component.props = {
	contacts: React.PropTypes.array,
	index: React.PropTypes.number,
};
