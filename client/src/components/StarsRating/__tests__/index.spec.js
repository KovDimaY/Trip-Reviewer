import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import StarsRating from '..';

jest.mock('react-rating', () => 'Rating');

const mockComponent = props => <StarsRating {...props} />;

describe('<StarsRating />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with error', () => {
    const props = { error: true };
    const tree = create(mockComponent(props)).toJSON();

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
    const one = StarsRating.getLabel(1);
    const two = StarsRating.getLabel(2);
    const three = StarsRating.getLabel(3);
    const four = StarsRating.getLabel(4);
    const five = StarsRating.getLabel(5);
    const others = StarsRating.getLabel(100);

    expect(one).toEqual('Hated it!');
    expect(two).toEqual('Disliked it!');
    expect(three).toEqual('It was ok.');
    expect(four).toEqual('Liked it!');
    expect(five).toEqual('Loved it!');
    expect(others).toEqual('Rate your trip:');
  });
});
