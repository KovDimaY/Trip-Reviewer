import React from 'react';
import { create } from 'react-test-renderer';
 
import TripView from './../../TripView';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <TripView {...props} />
        </Root>
    );
};
 
describe('<TripView />', () => {
    it('should render component with empty trips', () => {
        const props = {
            trips: {},
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with current trip', () => {
        const props = {
            trips: {
                current: {
                    title: 'title',
                    author: 'author',
                    review: 'review',
                    duration: 'duration',
                    price: 'price',
                    rating: 'rating'
                },
                reviewer: {
                    name: 'name',
                    lastname: 'lastname'
                }   
            },
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});