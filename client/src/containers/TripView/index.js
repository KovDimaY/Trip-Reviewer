import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTripWithReviewer, clearTripWithReviewer } from '../../actions';

import './styles.css';

class TripView extends Component {
  componentWillMount() {
    this.props.dispatch(getTripWithReviewer(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearTripWithReviewer());
  }

  renderTrip = (trips) => {
    if (trips && trips.current) {
      const {
        title, country, description,
        duration, rating, expences,
      } = trips.current;
      const { name, lastname } = trips.reviewer;

      return (
        <div className="trip-view-container">
          <div className="trip-view-header">
            <h2>{title}</h2>
            <h5>{country}</h5>
            <div className="reviewer">
              <span>Author:</span>
              {` ${name} ${lastname}`}
            </div>
          </div>
          <div className="trip-view-description">
            {description}
          </div>
          <div className="trip-view-box">
            <div className="left">
              <div>
                <span>Duration:</span>
                {duration === 1 ? ' 1 day' : ` ${duration} days`}
              </div>
              <div>
                <span>Expences:</span>
                {` $${expences} `}
              </div>
            </div>
            <div className="right">
              <span>Rating</span>
              <div>{rating}/5</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { trips } = this.props;
    return (
      <div>
        {this.renderTrip(trips)}
      </div>
    );
  }
}

TripView.propTypes = {
  trips: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    trips: state.trips,
  };
}

export default connect(mapStateToProps)(TripView);
