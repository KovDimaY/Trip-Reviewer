import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import EditUserProfile from './../../EditUserProfile';
import { UPDATE_USER } from './../../../constants/action-names';
import { updateUser } from './../../../actions';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('./../../../actions', () => ({ 
    updateUser: jest.fn(() => ({
        type: UPDATE_USER,
        payload: {}
    })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <EditUserProfile {...props} store={store} />
    );
};
 
describe('<EditUserProfile />', () => {
    it('should render component', () => {
        const initialState = {
            users: {}
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(initialState, props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with error', () => {
        const initialState = {
            users: {
                userUpdate: {
                    success: false,
                    message: 'test'
                },
            }
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(initialState, props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should redirect when componentWillReceiveProps is called with success true', () => {
        const push = jest.fn();
        const path = '/user';
        const initialState = {
            users: {
                userUpdate: {},
            }
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const nextProps = {
            result: {
                success: true
            },
            history: {
                push
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);
    
        expect(push).toHaveBeenCalledWith(path);
    });

    it('should not redirect when componentWillReceiveProps is called with success false', () => {
        const push = jest.fn();
        const path = '/user';
        const initialState = {
            users: {
                userUpdate: {},
            }
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const nextProps = {
            result: {
                success: false,
                message: 'test'
            },
            history: {
                push
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);
    
        expect(push).not.toHaveBeenCalledWith(path);
    });

    it('should dispatch updateUser when submitForm is called', () => {
        const preventDefault = jest.fn();
        const initialState = {
            users: {
                userUpdate: {},
            }
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const state = {
            name: "name",
            lastname: "lastname",
            email: "email"
        };
        const event = { preventDefault };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
        instance.setState({ formdata: state });
    
        instance.submitForm(event);

        expect(preventDefault).toHaveBeenCalled();    
        expect(updateUser).toHaveBeenCalledWith(state);
    });

    it('handleInput should change state correctly', () => {
        const initialState = {
            users: {
                userUpdate: {},
            }
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const event = {
            target: {
                value: 'test',
                name: 'title'
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.handleInput(event);
    
        expect(instance.state.formdata.title).toEqual('test');
    });
});