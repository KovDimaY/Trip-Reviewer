import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import StarsRating from './../../components/StarsRating';
import { getTrip, updateTrip, clearTrip, deleteTrip } from '../../actions';

class EditTrip extends PureComponent {
    state = {
        formdata: {
            _id: this.props.match.params.id,
            title: '',
            author: '',
            review: '',
            duration: '',
            rating: 0,
            price: ''
        }
    };

    componentWillMount() {
        this.props.dispatch(getTrip(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        const { trip, updateTrip } = nextProps.trips

        if (updateTrip) {
            nextProps.history.push(`/trips/${trip._id}`);
        } else {
            this.setState({
                formdata: {
                    _id: trip._id,
                    title: trip.title,
                    author: trip.author,
                    review: trip.review,
                    duration: trip.duration,
                    rating: trip.rating,
                    price: trip.price
                }
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearTrip());
    }

    handleInput = (event) => {
        const newFormdata = {
            ...this.state.formdata
        };
        const { value, name } = event.target;

        newFormdata[name] = value;

        this.setState({
            formdata: newFormdata
        });
    }

    handleRating = (rating) => {
        const newFormdata = {
            ...this.state.formdata
        };

        newFormdata.rating = rating;

        this.setState({
            formdata: newFormdata
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
        this.props.history.push('/user/user-reviews');
    }

    redirectUser = () => {
        setTimeout(this.goToReviews, 1000);
    }

    render() {
        const {
            title, author, review,
            duration, rating, price
        } = this.state.formdata;
        const { trips } = this.props;

        return (
            <div className="rl_container article">
                {
                    trips.postDeleted 
                    ? <div className="red_tag">
                            Post Deleted
                            {this.redirectUser()}
                        </div>
                    : null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            value={title}
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            name="author"
                            placeholder="Enter author"
                            value={author}
                            onChange={this.handleInput}
                        />
                    </div>

                    <textarea
                        value={review}
                        name="review"
                        onChange={this.handleInput}
                    />

                    <div className="form_element">
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
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter Price"
                            value={price}
                            onChange={this.handleInput}
                        />
                    </div>

                    <button type="submit">Edit review</button>
                    <div className="delete_post">
                        <div className="button"
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

function mapStateToProps(state) {
    return {
        trips: state.trips
    }
}

export default connect(mapStateToProps)(EditTrip);