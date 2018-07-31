import React from 'react';
import { create } from 'react-test-renderer';
 
import SidenavItem from './../../SidenavItem';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <SidenavItem {...props} />
        </Root>
    );
};
 
describe('<SidenavItem />', () => {
    it('should render component', () => {
        const props = {
            users: {},
            item: {
                type: 'type',
                link: 'link',
                icon: 'icon',
                text: 'text'
            }
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});