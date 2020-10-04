import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import StarsRating from '../../components/StarsRating';
import CountrySelector from '../../components/CountrySelector';
import { addTrip, clearNewTrip } from '../../actions';
import { TRIPS } from '../../constants/routes';
import toolbar from '../../constants/toolbar';

import './styles.css';

class AddTrip extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    formdata: {
      title: '',
      country: 'Spain',
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

  componentWillReceiveProps(newProps) {
    const { newtrip } = newProps.trips;

    if (newtrip && newtrip.success) {
      newProps.history.push(`${TRIPS}/${newtrip.tripId}`);
    } else {
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
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewTrip());
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
    const { newtrip } = this.props.trips;
    const { hideError } = this.state;
    const errors = newtrip && newtrip.error && newtrip.error.errors;

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
    this.props.dispatch(
      addTrip({
        ...this.state.formdata,
        ownerId: this.props.users.login.id,
      })
    );
    this.setState({ loading: true });
  };

  renderError(fieldName) {
    if (this.formFieldHasError(fieldName)) {
      const error = this.props.trips.newtrip.error.errors[fieldName];

      return <div className="error">{error.message}</div>;
    }
    return null;
  }

  render() {
    const { loading, formdata } = this.state;
    const { title, country, duration, rating, expences } = formdata;

    return (
      <div className="add-review-container limited-width">
        <form onSubmit={this.submitForm}>
          <h2 className="title">Add a story</h2>

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
            Add story
          </button>
        </form>
      </div>
    );
  }
}

AddTrip.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  trips: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    trips: state.trips,
  };
}

export default connect(mapStateToProps)(AddTrip);
