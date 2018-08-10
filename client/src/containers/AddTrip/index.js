import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTrip, clearNewTrip } from '../../actions'

class AddTrip extends Component {
    state = {
        formdata: {
            title: '',
            author: '',
            review: '',
            duration: '',
            rating: '',
            price: ''
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

    showNewTrip = (trip) => (
        trip.post 
            ? <div className="conf_link">
                    Cool !! <Link to={`/trips/${trip.tripId}`}>
                        Click the link to see the post
                    </Link>
                </div>
            : null
    )


    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(addTrip({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }));
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewTrip());
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

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
                            name='autor'
                            placeholder="Enter author"
                            value={this.state.formdata.author}
                            onChange={this.handleInput}
                        />
                    </div>

                    <textarea
                        value={this.state.formdata.review}
                        onChange={this.handleInput}
                    />

                    <div className="form_element">
                        <input
                            type="number"
                            name='duration'
                            placeholder="Enter duration"
                            value={this.state.formdata.duration}
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
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
                            value={this.state.formdata.price}
                            onChange={this.handleInput}
                        />
                    </div>

                    <button type="submit">Add review</button>
                    {
                        this.props.trips.newtrip 
                        ? this.showNewTrip(this.props.trips.newtrip)
                        : null
                    }
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