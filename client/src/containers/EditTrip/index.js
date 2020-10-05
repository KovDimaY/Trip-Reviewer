import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import StarsRating from '../../components/StarsRating';
import CountrySelector from '../../components/CountrySelector';
import { getTrip, updateTrip, clearTrip, deleteTrip } from '../../actions';
import * as routes from '../../constants/routes';
import toolbar from '../../constants/toolbar';

import './styles.css';

class EditTrip extends PureComponent {
  state = {
    editorState: EditorState.createEmpty(),
    formdata: {
      _id: this.props.match.params.id,
      title: '',
      country: '',
      description: '',
      duration: '',
      rating: 0,
      expences: '',
    },
    hideError: {
      title: false,
      country: false,
      description: false,
      duration: false,
      rating: false,
      expences: false,
    },
    loading: false,
  };

  componentWillMount() {
    this.props.dispatch(getTrip(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { trip, updatedTrip } = nextProps.trips;

    if (trip && trip.error) {
      nextProps.history.push('/Not-Found');
    } else if (updatedTrip && updatedTrip.success) {
      nextProps.history.push(`${routes.TRIPS}/${trip._id}`);
    } else if (updatedTrip) {
      this.setState({
        loading: false,
        hideError: {
          title: false,
          country: false,
          description: false,
          duration: false,
          rating: false,
          expences: false,
        },
      });
    } else if (trip) {
      let editorState = EditorState.createEmpty();
      try {
        const parsedDescription = JSON.parse(trip.description);
        const contantState = convertFromRaw(parsedDescription);
        editorState = EditorState.createWithContent(contantState);
      } catch (e) {
        console.log('Parsing description error: ', e); // eslint-disable-line no-console
        console.log('Object: ', trip.description); // eslint-disable-line no-console
      }

      this.setState({
        editorState,
        loading: false,
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

  onEditorStateChange = editorState => {
    const newFormdata = { ...this.state.formdata };
    const newHideError = {
      ...this.state.hideError,
      description: true,
    };
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);

    newFormdata.description = JSON.stringify(rawState);

    this.setState({
      editorState,
      formdata: newFormdata,
      hideError: newHideError,
    });
  };

  getErrorClass(fieldName) {
    return this.formFieldHasError(fieldName) ? 'field-error' : '';
  }

  formFieldHasError(fieldName) {
    const { updatedTrip } = this.props.trips;
    const { hideError } = this.state;
    const errors = updatedTrip && updatedTrip.error && updatedTrip.error.errors;

    return errors && errors[fieldName] && !hideError[fieldName];
  }

  handleInput = event => {
    const newFormdata = { ...this.state.formdata };
    const newHideError = { ...this.state.hideError };
    const { value, name } = event.target;

    newFormdata[name] = value;
    newHideError[name] = true;

    this.setState({
      formdata: newFormdata,
      hideError: newHideError,
    });
  };

  handleCountrychange = countryObject => {
    const newFormdata = {
      ...this.state.formdata,
      country: countryObject.countryName,
    };

    this.setState({
      formdata: newFormdata,
    });
  };

  handleRating = rating => {
    const newFormdata = {
      ...this.state.formdata,
      rating,
    };
    const newHideError = {
      ...this.state.hideError,
      rating: true,
    };

    this.setState({
      formdata: newFormdata,
      hideError: newHideError,
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.props.dispatch(updateTrip(this.state.formdata));
    this.setState({ loading: true });
  };

  deletePost = () => {
    if (!this.state.loading) {
      this.props.dispatch(deleteTrip(this.props.match.params.id));
      this.setState({ loading: true });
    }
  };

  goToReviews = () => {
    this.props.history.push(routes.USER_REVIEWS);
  };

  redirectUser = () => {
    setTimeout(this.goToReviews, 1000);
  };

  renderError(fieldName) {
    if (this.formFieldHasError(fieldName)) {
      const error = this.props.trips.updatedTrip.error.errors[fieldName];

      return <div className="error">{error.message}</div>;
    }
    return null;
  }

  renderPostDeleted() {
    if (this.props.trips.postDeleted) {
      return (
        <div className="red_tag">
          Post Deleted
          {this.redirectUser()}
        </div>
      );
    }
    return null;
  }

  render() {
    const { loading, formdata } = this.state;
    const { title, country, duration, rating, expences } = formdata;

    return (
      <div className="edit-review-container limited-width">
        {this.renderPostDeleted()}

        <form onSubmit={this.submitForm}>
          <h2 className="title">Edit story</h2>

          <div className="form_element">
            <span className="label">Title:</span>
            <input
              type="text"
              name="title"
              className={`form-input ${this.getErrorClass('title')}`}
              placeholder="Enter title"
              value={title}
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('title')}

          <div className="form_element">
            <span className="label">Trip to:</span>
            <CountrySelector
              defaultCountry={country}
              getSelectedCountry={this.handleCountrychange}
            />
          </div>

          <div className="form_element">
            <span className="label">Description:</span>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName={`editor-wrapper ${this.getErrorClass('description')}`}
              editorClassName="editor-self"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={toolbar}
            />
          </div>
          {this.renderError('description')}

          <div className="form_element">
            <span className="label">Duration (days):</span>
            <input
              type="number"
              name="duration"
              className={`form-input ${this.getErrorClass('duration')}`}
              placeholder="Enter duration"
              value={duration}
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('duration')}

          <div className="form_element">
            <span className="label">Expenses ($):</span>
            <input
              type="number"
              name="expences"
              className={`form-input ${this.getErrorClass('expences')}`}
              placeholder="Enter expenses"
              value={expences}
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('expences')}

          <div className="form_element">
            <StarsRating
              rating={rating}
              error={this.getErrorClass('rating')}
              onChange={this.handleRating}
            />
          </div>
          {this.renderError('rating')}

          <button type="submit" className="add-button" disabled={loading}>
            Edit story
          </button>
          <div className="delete-post">
            <div className={`button${loading ? ' loading' : ''}`} onClick={this.deletePost}>
              Delete story
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
