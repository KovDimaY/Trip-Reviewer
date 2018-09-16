import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import StarsRating from './../../StarsRating';

jest.mock('./../../Sidenav/index', () => 'Nav');
jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => {
    return (
        <StarsRating {...props} />
    );
};

describe('<StarsRating />', () => {
    it('should render component', () => {
        const tree = create(mockComponent()).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should change state correctly when handleHower is called', () => {
        const instance = mount(mockComponent()).instance();
        const hower = 3;

        instance.handleHower(hower);

        expect(instance.state.hower).toEqual(hower);
    });

    it('should call onChange when handleRating is called', () => {
        const onChange = jest.fn();
        const props = { onChange };
        const rating = 3;

        const instance = mount(mockComponent(props)).instance();

        instance.handleRating(rating);

        expect(onChange).toHaveBeenCalledWith(rating);
    });

    it('should return correct value when getLabel is called', () => {
        const instance = mount(mockComponent()).instance();
    
        const one = instance.getLabel(1);
        const two = instance.getLabel(2);
        const three = instance.getLabel(3);
        const four = instance.getLabel(4);
        const five = instance.getLabel(5);
        const others = instance.getLabel(100);
    
        expect(one).toEqual('Hated it!');
        expect(two).toEqual('Disliked it!');
        expect(three).toEqual('It was ok.');
        expect(four).toEqual('Liked it!');
        expect(five).toEqual('Loved it!');
        expect(others).toEqual('Rate your trip:');
    });
});