import React, { Component } from 'react';
import { connect } from 'react-redux';

import StarsRating from './../../components/StarsRating';
import { addTrip, clearNewTrip } from './../../actions';
import { TRIPS } from './../../constants/routes';

class AddTrip extends Component {
    state = {
        formdata: {
            title: '',
            author: '',
            review: '',
            duration: '',
            rating: 0,
            price: ''
        }
    };

    componentWillReceiveProps(newProps) {
        const { newtrip } = newProps.trips;

        if (newtrip) {
            newProps.history.push(`${TRIPS}/${newtrip.tripId}`);
        }
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
        this.props.dispatch(addTrip({
            ...this.state.formdata,
            ownerId: this.props.users.login.id
        }));
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewTrip());
    }

    render() {
        const {
            title, author, review,
            duration, rating, price
        } = this.state.formdata;

        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

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
                            name='author'
                            placeholder="Enter author"
                            value={author}
                            onChange={this.handleInput}
                        />
                    </div>

                    <textarea
                        value={review}
                        name='review'
                        onChange={this.handleInput}
                    />

                    <div className="form_element">
                        <input
                            type="number"
                            name='duration'
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
                            name='price'
                            placeholder="Enter Price"
                            value={price}
                            onChange={this.handleInput}
                        />
                    </div>

                    <button type="submit">Add review</button>
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

export default connect(mapStateToProps)(AddTrip);