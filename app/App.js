import React, {Component} from "react";
import {StyleProvider} from "@shoutem/theme";
import {connect} from "react-redux";
import {CardStack, NavigationBar} from "@shoutem/ui/navigation";
import {navigatePop} from "./redux";
import theme from "./theme";
import SelectCategory from "./containers/SelectCategory";
import AddCategory from "./containers/AddCategory";
import AddItem from "./containers/AddItem";
import Dashboard from "./containers/Dashboard";

class App extends Component {


	static propTypes = {
		onNavigateBack: React.PropTypes.func.isRequired,
		navigationState: React.PropTypes.object,
		scene: React.PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.renderNavBar = this.renderNavBar.bind(this);
		this.renderScene = this.renderScene.bind(this);

	}

	componentWillMount(){
		const route = {
			key: 'SelectCategory'
		};

		this.props.scene = {route, ...this.props.scene};
	}

	renderScene(props) {
		const routes = {
			SelectCategory,
			AddCategory,
			Dashboard,
			AddItem,
		};

		const {route} = props.scene;

		let Screen = routes[route.key] ? routes[route.key] : SelectCategory;
		return (<Screen {...route.props} />);
	}

	renderNavBar(props) {
		const {onNavigateBack} = this.props;

		return (
			<NavigationBar.View
				{...props}
				onNavigateBack={onNavigateBack}
			/>
		);
	}

	render() {
		const {navigationState, onNavigateBack} = this.props;

		return (
			<StyleProvider style={theme}>
				<CardStack
					navigationState={navigationState}
					onNavigateBack={onNavigateBack}
					renderNavBar={this.renderNavBar}
					renderScene={this.renderScene}
				/>
			</StyleProvider>

		);
	}
}

export default connect(
	state => ({navigationState: state.navigationState}),
	{onNavigateBack: navigatePop}
)(App);
