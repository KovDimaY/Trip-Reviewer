import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

import { getTripWithReviewer, clearTripWithReviewer } from '../../actions';

import './styles.css';

class TripView extends Component {
  componentWillMount() {
    this.props.dispatch(getTripWithReviewer(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trips && nextProps.trips.error) {
      this.props.history.push('/Not-Found');
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearTripWithReviewer());
  }

  getEditorState = state => {
    let editorState = EditorState.createEmpty();

    try {
      const parsedDescription = JSON.parse(state);
      const contentState = convertFromRaw(parsedDescription);
      editorState = EditorState.createWithContent(contentState);
    } catch (e) {
      console.log('Parsing description error: ', e); // eslint-disable-line no-console
      console.log('Object: ', state); // eslint-disable-line no-console
    }

    return editorState;
  };

  render() {
    const { trips } = this.props;

    if (trips && trips.current) {
      const { title, country, description, duration, rating, expences } = trips.current;
      const { name, lastname } = trips.reviewer;

      return (
        <div className="trip-view-container limited-width-shadow">
          <div className="trip-view-header">
            <h2>{title}</h2>
            <h5>{country}</h5>
            <div className="reviewer">
              <span>Author:</span>
              {` ${name} ${lastname}`}
            </div>
          </div>
          <div className="trip-view-description">
            <Editor
              editorState={this.getEditorState(description)}
              wrapperClassName="editor-wrapper"
              toolbarClassName="editor-toolbar"
              editorClassName="editor-self"
              toolbarHidden
              readOnly
            />
          </div>
          <div className="trip-view-box">
            <div className="left">
              <div>
                <span>Duration:</span>
                {duration === 1 ? ' 1 day' : ` ${duration} days`}
              </div>
              <div>
                <span>Expenses:</span>
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
}

TripView.propTypes = {
  trips: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    trips: state.trips,
  };
}

export default connect(mapStateToProps)(TripView);
