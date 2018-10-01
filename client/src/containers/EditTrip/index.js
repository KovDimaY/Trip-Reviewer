import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import StarsRating from '../../components/StarsRating';
import {
  getTrip, updateTrip, clearTrip, deleteTrip,
} from '../../actions';
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
  };

  componentWillMount() {
    this.props.dispatch(getTrip(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { trip, updateTrip: updateResult } = nextProps.trips;

    if (updateResult) {
      nextProps.history.push(`${routes.TRIPS}/${trip._id}`);
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
      title, country,
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
            <StarsRating rating={rating} onChange={this.handleRating} />
          </div>

          <div className="form_element">
            <span className="label">
              Expences ($):
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
