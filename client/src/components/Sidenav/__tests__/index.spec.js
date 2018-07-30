import React from 'react';
import { create } from 'react-test-renderer';
 
import Sidenav from './../../Sidenav';

jest.mock('react-simple-sidenav', () => 'ReactSideNav');
jest.mock('./../sidenav-item', () => 'SidenavItem');

const mockComponent = props => {
    return (
        <Sidenav {...props} />
    );
};
 
describe('<Sidenav />', () => {
    it('should render component', () => {
        const tree = create(mockComponent()).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});