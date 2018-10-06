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

  onEditorStateChange = (editorState) => {
    const newFormdata = { ...this.state.formdata };
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);

    newFormdata.description = JSON.stringify(rawState);

    this.setState({ editorState, formdata: newFormdata });
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

  handleCountrychange = (countryObject) => {
    const newFormdata = {
      ...this.state.formdata,
      country: countryObject.countryName,
    };

    this.setState({
      formdata: newFormdata,
    });
  }

  handleRating = (rating) => {
    const newFormdata = {
      ...this.state.formdata,
      rating,
    };

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
      title, country,
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
            <CountrySelector
              defaultCountry={country}
              getSelectedCountry={this.handleCountrychange}
            />
          </div>

          <div className="form_element">
            <span className="label">
              Description:
            </span>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="editor-wrapper"
              editorClassName="editor-self"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={toolbar}
            />
          </div>

          <div className="form_element">
            <span className="label">
              Duration (days):
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
              Expences ($):
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
