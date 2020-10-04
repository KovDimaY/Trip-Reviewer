import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TripItem from '../../components/TripItem/index';
import EmptyView from '../../components/Common/EmptyViewAddTrip';
import { getTrips } from '../../actions';

import './styles.css';

const ITEMS_TO_LOAD = 3;

class HomeContainer extends Component {
  state = {
    showLoadmore: true,
    initialRender: true,
  };

  componentWillMount() {
    const itemsToLoad = 2 * ITEMS_TO_LOAD;
    const startingFrom = 0;
    const order = 'desc';

    this.props.dispatch(getTrips(itemsToLoad, startingFrom, order));
  }

  componentWillReceiveProps(nextProps) {
    const { newTripsCount } = nextProps.trips;
    const { initialRender } = this.state;

    if (initialRender) {
      this.setState({ initialRender: false });
    }
    if (newTripsCount < ITEMS_TO_LOAD) {
      this.setState({ showLoadmore: false });
    }
  }

  loadmore = () => {
    const { list } = this.props.trips;
    const newItemsToLoad = ITEMS_TO_LOAD;
    const startingFrom = list.length;
    const order = 'desc';

    this.props.dispatch(getTrips(newItemsToLoad, startingFrom, order, list));
  };

  renderItems() {
    const { list = [] } = this.props.trips;
    const { initialRender } = this.state;

    if (!initialRender && list.length < 1) {
      return (
        <div className="empty-view-wrapper">
          <EmptyView />
        </div>
      );
    }

    return list.map(item => <TripItem {...item} key={item._id} />);
  }

  renderLoadMoreButton() {
    const { initialRender, showLoadmore } = this.state;

    if (!initialRender && showLoadmore) {
      return (
        <div className="loadmore" onClick={this.loadmore}>
          Load More
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="home-container limited-width-shadow">
        {this.renderItems(this.props.trips)}
        {this.renderLoadMoreButton()}
      </div>
    );
  }
}

HomeContainer.propTypes = {
  trips: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  trips: state.trips,
});

export default connect(mapStateToProps)(HomeContainer);
