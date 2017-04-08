import React, { Component } from 'react';
import {
  Image,
  ListView,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Screen,
  Divider, ScrollView
} from '@shoutem/ui';

import { Parallax, ScrollDriver } from '@shoutem/animation'

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import { connect } from 'react-redux';
import { navigatePush } from './redux';

const driver = new ScrollDriver();

class RestaurantsList extends Component {
  static propTypes = {
    addPropertyOfTheDayView: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }

  renderRow(restaurant) {
    const { onButtonPress } = this.props;

    return (
      <TouchableOpacity style={{height: 20}} onPress={() => onButtonPress(restaurant)}>
        <ScrollView >
          <Parallax  driver={driver}
                     scrollSpeed={2}>
            <Image
                styleName="large-banner"
                source={{ uri: restaurant.image.url }}
            />
          </Parallax>
          <Tile>
            <Title styleName="md-gutter-bottom">{restaurant.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{restaurant.address}</Subtitle>
          </Tile>
        </ScrollView>

        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Screen>
        <NavigationBar title="All Restaurants" />

        <ListView
          data={this.getRestaurants()}
          renderRow={restaurant => this.renderRow(restaurant)}
        />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPropertyOfTheDayView: (restaurant) => {
    dispatch(navigatePush({
      key: 'JobDetails',
      title: 'Details',
    }, { category }));
  },
});

export default connect(
	undefined,
	mapDispatchToProps
)(RestaurantsList);

