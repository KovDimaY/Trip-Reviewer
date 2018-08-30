import React from 'react';
import { create } from 'react-test-renderer';
 
import Layout from './../layout';

jest.mock('./../../components/Header/index', () => 'Header');

const mockComponent = props => {
    return (
        <Layout {...props} />
    );
};
 
describe('<Layout />', () => {
    it('should render component', () => {
        const props = {
            children: <div>test</div>
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});