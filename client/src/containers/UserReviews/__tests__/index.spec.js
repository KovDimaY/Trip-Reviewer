import React from 'react';
import { create } from 'react-test-renderer';
 
import UserPosts from './../../UserReviews';
import Root from './../../../hoc/root';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => {
    return (
        <Root>
            <UserPosts {...props} />
        </Root>
    );
};
 
describe('<UserPosts />', () => {
    it('should render component', () => {
        const props = {
            users: {
                login: {
                    id: 'id'
                },
                userPosts: [{
                    _id: 'id',
                    title: 'title',
                    author: 'author',
                    createAt: 'createAt'
                }]
            }
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});