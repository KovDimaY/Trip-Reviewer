import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StarsRating from '../../components/StarsRating';
import {
  getTrip, updateTrip, clearTrip, deleteTrip,
} from '../../actions';
import * as routes from '../../constants/routes';

import './styles.css';

class EditTrip extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.id,
      title: '',
      country: '',
      description: '',
      duration: '',
      rating: 0,
      expences: '',
    },
  };

  componentWillMount() {
    this.props.dispatch(getTrip(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { trip, updateTrip: updateResult } = nextProps.trips;

    if (updateResult) {
      nextProps.history.push(`${routes.TRIPS}/${trip._id}`);
    } else {
      this.setState({
        formdata: {
          _id: trip._id,
          title: trip.title,
          country: trip.country,
          description: trip.description,
          duration: trip.duration,
          rating: trip.rating,
          expences: trip.expences,
        },
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearTrip());
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
    this.props.dispatch(updateTrip(this.state.formdata));
  }

  deletePost = () => {
    this.props.dispatch(deleteTrip(this.props.match.params.id));
  }

  goToReviews = () => {
    this.props.history.push(routes.USER_REVIEWS);
  }

  redirectUser = () => {
    setTimeout(this.goToReviews, 1000);
  }

  render() {
    const {
      title, country, description,
      duration, rating, expences,
    } = this.state.formdata;
    const { trips } = this.props;

    return (
      <div className="edit-review-container">
        {
          trips.postDeleted
            ? (
              <div className="red_tag">
                  Post Deleted
                {this.redirectUser()}
              </div>
            )
            : null
        }
        <form onSubmit={this.submitForm}>
          <h2>
            Edit review
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
              Country:
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
            <StarsRating rating={rating} onChange={this.handleRating} />
          </div>

          <div className="form_element">
            <span className="label">
              Expences:
            </span>
            <input
              type="number"
              name="expences"
              placeholder="Enter Price"
              value={expences}
              onChange={this.handleInput}
            />
          </div>

          <button type="submit">
            Edit review
          </button>
          <div className="delete_post">
            <div
              className="button"
              onClick={this.deletePost}
            >
              Delete review
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditTrip.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  trips: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    trips: state.trips,
  };
}

export default connect(mapStateToProps)(EditTrip);
