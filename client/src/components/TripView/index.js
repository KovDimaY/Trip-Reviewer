import React, { Component } from 'react';
import { getTripWithReviewer, clearTripWithReviewer } from '../../actions';
import { connect } from 'react-redux';

class TripView extends Component {
    componentWillMount(){
        this.props.dispatch(getTripWithReviewer(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearTripWithReviewer())
    }

    renderTrip = (trips) => (
        trips.current 
            ? <div className="br_container">
                    <div className="br_header">
                        <h2>{trips.current.title}</h2>
                        <h5>{trips.current.author}</h5>
                        <div className="br_reviewer">
                            <span>Review by:</span> {trips.reviewer.name} {trips.reviewer.lastname}
                        </div>
                    </div>
                    <div className="br_review">
                        {trips.current.review}
                    </div>
                    <div className="br_box">
                        <div className="left">
                            <div>
                                <span>Duration:</span> {trips.current.duration} days
                            </div>
                            <div>
                                <span>Price:</span> {trips.current.price}
                            </div>
                        </div>
                        <div className="right">
                            <span>Rating</span>
                            <div>{trips.current.rating}/5</div>
                        </div>
                    </div>
                </div>
            :   null
    )

    render() {
        const { trips } = this.props;
        return (
            <div>
                {this.renderTrip(trips)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        trips: state.trips
    };
};

export default connect(mapStateToProps)(TripView);