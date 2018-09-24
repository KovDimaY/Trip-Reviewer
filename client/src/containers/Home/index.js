import React, { Component } from 'react';
import { connect } from 'react-redux';

import TripItem from '../../components/TripItem/index';
import { getTrips } from '../../actions';

class HomeContainer extends Component {
  componentWillMount() {
    const itemsToLoad = 3;
    const startingFrom = 0;
    const order = 'desc';
    this.props.dispatch(getTrips(itemsToLoad, startingFrom, order));
  }

  loadmore = () => {
    const { list } = this.props.trips;
    const newItemsToLoad = 3;
    const startingFrom = list.length;
    const order = 'desc';
    this.props.dispatch(getTrips(newItemsToLoad, startingFrom, order, list));
  }

  renderItems = trips => (
    trips.list
      ? trips.list.map(item => <TripItem {...item} key={item._id} />)
      : null
  )

  render() {
    return (
      <div>
        {this.renderItems(this.props.trips)}
        <div
          className="loadmore"
          onClick={this.loadmore}
        >
          Load More
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  trips: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    trips: state.trips,
  };
}

export default connect(mapStateToProps)(HomeContainer);
