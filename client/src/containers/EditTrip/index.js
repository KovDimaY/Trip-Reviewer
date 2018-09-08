import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrip, updateTrip, clearTrip, deleteTrip } from '../../actions';

class EditTrip extends PureComponent {
    state = {
        formdata: {
            _id: this.props.match.params.id,
            title: '',
            author: '',
            review: '',
            duration: '',
            rating: '',
            price: ''
        }
    };

    componentWillMount() {
        this.props.dispatch(getTrip(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        const trip = nextProps.trips.trip;
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
        const { trips } = this.props;
        return (
            <div className="rl_container article">
                {
                    trips.updateTrip 
                    ? <div className="edit_confirm">
                            Post updated, <Link to={`/trips/${trips.trip._id}`}>
                                Click here to see your post
                            </Link>
                        </div>
                    : null
                }
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
                            value={this.state.formdata.title}
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            name="author"
                            placeholder="Enter author"
                            value={this.state.formdata.author}
                            onChange={this.handleInput}
                        />
                    </div>

                    <textarea
                        value={this.state.formdata.review}
                        name="review"
                        onChange={this.handleInput}
                    />

                    <div className="form_element">
                        <input
                            type="number"
                            name="duration"
                            placeholder="Enter duration"
                            value={this.state.formdata.duration}
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
                            name="rating"
                            onChange={this.handleInput}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter Price"
                            value={this.state.formdata.price}
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