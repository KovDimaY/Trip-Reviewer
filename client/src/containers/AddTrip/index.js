import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip, clearNewTrip } from '../../actions';

class AddTrip extends Component {
    state = {
        formdata: {
            title: '',
            author: '',
            review: '',
            duration: '',
            rating: '1',
            price: ''
        }
    };

    componentWillReceiveProps(newProps) {
        const { newtrip } = newProps.trips;
        if (newtrip) {
            newProps.history.push(`/trips/${newtrip.tripId}`);
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
                        <select
                            value={rating}
                            name='rating'
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