import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import TripView from '..';
import { clearTripWithReviewer } from '../../../actions';

jest.mock('react-draft-wysiwyg', () => ({ Editor: 'Editor' }));
jest.mock('draft-js', () => ({
  EditorState: {
    createEmpty: () => ({}),
    createWithContent: () => ({}),
  },
  convertFromRaw: () => ({}),
}));
jest.mock('./../../../actions', () => ({
  getTripWithReviewer: jest.fn(() => ({
    type: 'getTripWithReviewer',
  })),
  clearTripWithReviewer: jest.fn(() => ({
    type: 'clearTripWithReviewer',
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <TripView {...props} store={store} />;
};

describe('<TripView />', () => {
  it('should render component with empty trips', () => {
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
    };

    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with current trip of 1 day and correct description', () => {
    const initialState = {
      trips: {
        current: {
          title: 'title',
          country: 'country',
          description: '{"test":"test"}',
          duration: 1,
          expences: 'expences',
          rating: 'rating',
        },
        reviewer: {
          name: 'name',
          lastname: 'lastname',
        },
      },
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with current trip of 10 days and wrong', () => {
    const initialState = {
      trips: {
        current: {
          title: 'title',
          country: 'country',
          description: 'description',
          duration: 10,
          expences: 'expences',
          rating: 'rating',
        },
        reviewer: {
          name: 'name',
          lastname: 'lastname',
        },
      },
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should dispatch clearTripWithReviewer when componentWillUnmount is called', () => {
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillUnmount();

    expect(clearTripWithReviewer).toHaveBeenCalled();
  });

  it('should redirect when componentWillReceiveProps is called with error', () => {
    const push = jest.fn();
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
      history: { push },
    };
    const newProps = {
      trips: { error: true },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).toHaveBeenCalledWith('/Not-Found');
  });

  it('should not redirect when componentWillReceiveProps is called without error', () => {
    const push = jest.fn();
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
      history: { push },
    };
    const newProps = {
      trips: { error: false },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).not.toHaveBeenCalledWith('/Not-Found');
  });
});
