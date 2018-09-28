import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StarsRating from '../../components/StarsRating';
import { addTrip, clearNewTrip } from '../../actions';
import { TRIPS } from '../../constants/routes';

import './styles.css';

class AddTrip extends Component {
  state = {
    formdata: {
      title: '',
      country: '',
      description: '',
      duration: '',
      rating: 0,
      expences: '',
    },
  };

  componentWillReceiveProps(newProps) {
    const { newtrip } = newProps.trips;

    if (newtrip) {
      newProps.history.push(`${TRIPS}/${newtrip.tripId}`);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewTrip());
  }

  handleInput = (event) => {
    const newFormdata = {
      ...this.state.formdata,
    };
    const { value, name } = event.target;

    newFormdata[name] = value;

    this.setState({
      formdata: newFormdata,
    });
  }

  handleRating = (rating) => {
    const newFormdata = {
      ...this.state.formdata,
    };

    newFormdata.rating = rating;

    this.setState({
      formdata: newFormdata,
    });
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.dispatch(addTrip({
      ...this.state.formdata,
      ownerId: this.props.users.login.id,
    }));
  }

  render() {
    const {
      title, country, description,
      duration, rating, expences,
    } = this.state.formdata;

    return (
      <div className="add-review-container">
        <form onSubmit={this.submitForm}>
          <h2>
            Add a review
          </h2>

          <div className="form_element">
            <span className="label">
              Title:
            </span>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={this.handleInput}
            />
          </div>

          <div className="form_element">
            <span className="label">
              Trip to:
            </span>
            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={country}
              onChange={this.handleInput}
            />
          </div>

          <div className="form_element">
            <span className="label">
              Desctiption:
            </span>
            <textarea
              value={description}
              name="description"
              placeholder="Enter description"
              onChange={this.handleInput}
            />
          </div>

          <div className="form_element">
            <span className="label">
              Duration:
            </span>
            <input
              type="number"
              name="duration"
              placeholder="Enter duration"
              value={duration}
              onChange={this.handleInput}
            />
          </div>

          <div className="form_element">
            <span className="label">
              Expences:
            </span>
            <input
              type="number"
              name="expences"
              placeholder="Enter expences"
              value={expences}
              onChange={this.handleInput}
            />
          </div>

          <div className="form_element">
            <StarsRating rating={rating} onChange={this.handleRating} />
          </div>

          <button type="submit">
            Add review
          </button>
        </form>
      </div>
    );
  }
}

AddTrip.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    trips: state.trips,
  };
}

export default connect(mapStateToProps)(AddTrip);
