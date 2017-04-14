import React, { Component } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
const { width, height } = Dimensions.get('window')

var styles = {
	wrapper: {
		height: 200,
	},
	slide: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	photo: {
		width,
		height: 200,
		flex: 1
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	},
	thumbWrap: {
		width: 200,
		borderWidth: 5,
		borderColor: '#000',
		flexDirection: 'row'
	},
	thumb: {
		width: 50,
		height: 50
	}
}

const renderPagination = (index, total, context) => {
	return (
		<View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0
    }}>
			<View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
				<Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
			</View>
		</View>
	)
};

const Dot = () => (
	<Image style={{margin: 2}} source={require('./../../../../assets/image-swipe-point.png')} />
);

const ActiveDot = () => (
	<Image style={{margin: 2}}  source={require('./../../../../assets/image-swipe-active-point.png')} />
);

const Viewer = props =>
	<Swiper height={250}
			dot={Dot()}
			activeDot={ActiveDot()}
			index={props.index}
			style={styles.wrapper}>
	{
		props.imgList.map((item, i) => <View key={i} style={styles.slide}>
			<TouchableWithoutFeedback onPress={e => props.pressHandle()}>
				<PhotoView
					source={{uri: item}}
					defaultSource={require('./../../../../assets/no-photo.png')}
					androidScaleType='center'
					style={styles.photo} />
			</TouchableWithoutFeedback>
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
		let {images} = newProps;
		this.setState({imgList: images})
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
	images: React.PropTypes.array,
};

Component.defaultProps = {
	images: [
		'https://yandex.by/images/today?size=1920x1080',
		'https://yandex.by/images/today?size=1920x1080',
		'https://yandex.by/images/today?size=1920x1080',
		'https://yandex.by/images/today?size=1920x1080',
	]

};
