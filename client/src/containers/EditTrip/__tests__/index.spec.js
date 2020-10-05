import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import EditTrip from '..';
import { GET_TRIP } from '../../../constants/action-names';
import { updateTrip, clearTrip, deleteTrip } from '../../../actions';
import * as routes from '../../../constants/routes';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('react-draft-wysiwyg', () => ({ Editor: 'Editor' }));
jest.mock('draft-js', () => ({
  EditorState: {
    createEmpty: () => ({}),
    createWithContent: () => ({}),
  },
  convertFromRaw: () => ({}),
  convertToRaw: () => ({}),
}));
jest.mock('../../../constants/toolbar', () => ({}));
jest.mock('./../../../components/StarsRating', () => 'StarsRating');
jest.mock('./../../../components/CountrySelector', () => 'CountrySelector');
jest.mock('./../../../actions', () => ({
  getTrip: jest.fn(() => ({
    type: GET_TRIP,
    payload: {},
  })),
  updateTrip: jest.fn(() => ({
    type: 'updateTrip',
  })),
  clearTrip: jest.fn(() => ({
    type: 'clearTrip',
  })),
  deleteTrip: jest.fn(() => ({
    type: 'deleteTrip',
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <EditTrip {...props} store={store} />;
};

describe('<EditTrip />', () => {
  it('should render component', () => {
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

  it('should render component with updatedTrip and errors', () => {
    const initialState = {
      trips: {
        updatedTrip: {
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
        trip: {
          _id: '_id',
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

  it('should render component with postDeleted', () => {
    const initialState = {
      trips: {
        postDeleted: true,
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

  it('should change state when componentWillReceiveProps is called with a correct description', () => {
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
    const nextProps = {
      trips: {
        trip: {
          _id: 'trip._id',
          title: 'trip.title',
          country: 'trip.country',
          description: '{"test":"test"}',
          duration: 'trip.duration',
          rating: 'trip.rating',
          expences: 'trip.expences',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(instance.state.formdata).toEqual(nextProps.trips.trip);
  });

  it('should change state when componentWillReceiveProps is called with a wrong description', () => {
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
    const nextProps = {
      trips: {
        trip: {
          _id: 'trip._id',
          title: 'trip.title',
          country: 'trip.country',
          description: 'trip.description',
          duration: 'trip.duration',
          rating: 'trip.rating',
          expences: 'trip.expences',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(instance.state.formdata).toEqual(nextProps.trips.trip);
  });

  it('should not change state when componentWillReceiveProps is called with no trip', () => {
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
    const nextProps = {
      trips: {},
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(instance.state.formdata).not.toEqual(nextProps.trips.trip);
  });

  it('should redirect when componentWillReceiveProps is called with error', () => {
    const push = jest.fn();
    const path = '/Not-Found';
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: { id: 'id' },
      },
    };
    const nextProps = {
      trips: {
        trip: { error: 'error' },
      },
      history: { push },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).toHaveBeenCalledWith(path);
  });

  it('should redirect when componentWillReceiveProps is called with updatedTrip success', () => {
    const push = jest.fn();
    const tripId = 'test';
    const path = `${routes.TRIPS}/${tripId}`;
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
    const nextProps = {
      trips: {
        trip: {
          _id: tripId,
        },
        updatedTrip: {
          success: true,
        },
      },
      history: {
        push,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).toHaveBeenCalledWith(path);
  });

  it('should not redirect when componentWillReceiveProps is called with updatedTrip success false', () => {
    const push = jest.fn();
    const setState = jest.fn();
    const tripId = 'test';
    const path = `${routes.TRIPS}/${tripId}`;
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
    const nextProps = {
      trips: {
        trip: {
          _id: tripId,
        },
        updatedTrip: {
          success: false,
        },
      },
      history: {
        push,
      },
    };
    const expected = {
      loading: false,
      hideError: {
        title: false,
        country: false,
        description: false,
        duration: false,
        rating: false,
        expences: false,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();
    instance.setState = setState;

    instance.componentWillReceiveProps(nextProps);

    expect(push).not.toHaveBeenCalledWith(path);
    expect(setState).toHaveBeenCalledWith(expected);
  });

  it('should dispatch clearTrip when componentWillUnmount is called', () => {
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

    expect(clearTrip).toHaveBeenCalled();
  });

  it('should dispatch updateTrip when submitForm is called', () => {
    const preventDefault = jest.fn();
    const props = {
      match: {
        params: {
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
    expect(updateTrip).toHaveBeenCalledWith(state);
  });

  it('should dispatch deleteTrip when deletePost is called', () => {
    const setState = jest.fn();
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
    instance.setState = setState;

    instance.deletePost();

    expect(deleteTrip).toHaveBeenCalledWith('id');
    expect(setState).toHaveBeenCalledWith({ loading: true });
  });

  it('should not dispatch deleteTrip when deletePost is called while loading', () => {
    const setState = jest.fn();
    const dispatch = jest.fn();
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
      dispatch,
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();
    instance.setState = setState;
    instance.state.loading = true;

    instance.deletePost();

    expect(dispatch).not.toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalledWith({ loading: true });
  });

  it('handleInput should change state correctly', () => {
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
    const event = {
      target: {
        value: 'test',
        name: 'title',
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

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
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
    };
    const rating = 3;

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.handleRating(rating);

    expect(instance.state.formdata.rating).toEqual(rating);
  });

  it('handleCountrychange should change state correctly', () => {
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
    const countryName = 'countryName';
    const coutryObject = { countryName };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.handleCountrychange(coutryObject);

    expect(instance.state.formdata.country).toEqual(countryName);
  });

  it('goToReviews should redirect correctly', () => {
    const push = jest.fn();
    const path = routes.USER_REVIEWS;
    const initialState = {
      trips: {},
    };
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
      history: {
        push,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.goToReviews();

    expect(push).toHaveBeenCalledWith(path);
  });
});
