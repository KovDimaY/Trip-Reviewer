import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import AddTrip from '..';
import { addTrip, clearNewTrip } from '../../../actions';
import { TRIPS } from '../../../constants/routes';

jest.mock('react-draft-wysiwyg', () => ({ Editor: 'Editor' }));
jest.mock('draft-js', () => ({
  EditorState: {
    createEmpty: () => ({}),
  },
  convertToRaw: () => ({}),
}));
jest.mock('./../../../components/StarsRating', () => 'StarsRating');
jest.mock('./../../../components/CountrySelector', () => 'CountrySelector');
jest.mock('../../../constants/toolbar', () => ({}));
jest.mock('./../../../actions', () => ({
  addTrip: jest.fn(() => ({
    type: 'test',
  })),
  clearNewTrip: jest.fn(() => ({
    type: 'test',
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <AddTrip {...props} store={store} />;
};

describe('<AddTrip />', () => {
  it('should render component', () => {
    const initialState = {
      trips: {},
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with newTrip and success true', () => {
    const initialState = {
      trips: {
        newtrip: {
          success: true,
          tripId: 'test',
        },
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with newTrip and errors', () => {
    const initialState = {
      trips: {
        newtrip: {
          success: false,
          error: {
            errors: {
              title: { message: 'title error' },
              description: { message: 'description error' },
              duration: { message: 'duration error' },
              rating: { message: 'rating error' },
              expences: { message: 'expences error' },
            },
          },
        },
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('componentWillReceiveProps should redirect when newtrip exists', () => {
    const push = jest.fn();
    const tripId = 'test';
    const path = `${TRIPS}/${tripId}`;
    const initialState = {
      trips: {},
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const newProps = {
      trips: {
        newtrip: {
          success: true,
          tripId,
        },
      },
      history: {
        push,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).toHaveBeenCalledWith(path);
  });

  it('componentWillReceiveProps should not redirect when newtrip does not exists', () => {
    const push = jest.fn();
    const initialState = {
      trips: {},
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const newProps = {
      trips: {
        newtrip: null,
      },
      history: {
        push,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).not.toHaveBeenCalled();
  });

  it('handleInput should change state correctly', () => {
    const initialState = {
      trips: {},
    };
    const event = {
      target: {
        value: 'test',
        name: 'title',
      },
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.handleInput(event);

    expect(instance.state.formdata.title).toEqual('test');
  });

  it('onEditorStateChange should change state correctly', () => {
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
    const editorState = {
      getCurrentContent: () => ({}),
      test: 'test',
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.onEditorStateChange(editorState);

    expect(instance.state.editorState).toEqual(editorState);
    expect(instance.state.formdata.description).toEqual('{}');
  });

  it('handleRating should change state correctly', () => {
    const initialState = {
      trips: {},
    };
    const rating = 3;

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.handleRating(rating);

    expect(instance.state.formdata.rating).toEqual(rating);
  });

  it('handleCountrychange should change state correctly', () => {
    const initialState = {
      trips: {},
    };
    const countryName = 'countryName';
    const coutryObject = { countryName };

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.handleCountrychange(coutryObject);

    expect(instance.state.formdata.country).toEqual(countryName);
  });

  it('should dispatch addTrip when submitForm is called', () => {
    const preventDefault = jest.fn();
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const state = {
      country: 'country',
      duration: 'duration',
      ownerId: 'id',
      expences: 'expences',
      rating: 'rating',
      description: 'description',
      title: 'title',
    };
    const initialState = {
      trips: {},
    };
    const event = { preventDefault };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();
    instance.setState({ formdata: state });

    instance.submitForm(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(addTrip).toHaveBeenCalledWith(state);
  });

  it('should dispatch clearNewTrip when componentWillUnmount is called', () => {
    const initialState = {
      trips: {},
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.componentWillUnmount();

    expect(clearNewTrip).toHaveBeenCalled();
  });
});
