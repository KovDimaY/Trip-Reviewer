import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import Register from './../../Register';
import { userRegister } from './../../../actions';

jest.mock('./../../../actions', () => ({ 
    getUsers: jest.fn(() => ({
        type: 'getUsers'
    })),
    userRegister: jest.fn(() => ({
        type: 'userRegister'
    }))
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <Register {...props} store={store} />
    );
};
 
describe('<Register />', () => {
    it('should render component', () => {
        const initialState = {
            users: {}
        };
        const tree = create(mockComponent(initialState)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with users', () => {
        const initialState = {
            users: {
                users: [
                    {
                        _id: '_id',
                        name: 'name',
                        lastname: 'lastname'
                    }
                ]
            } 
        };
        const tree = create(mockComponent(initialState)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should change state when handleInputEmail is called', () => {
        const initialState = {
            users: {}
        };
        const event = {
            target: {
                value: 'test'
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();
    
        instance.handleInputEmail(event);
    
        expect(instance.state.email).toEqual('test');
    });

    it('should change state when handleInputPassword is called', () => {
        const initialState = {
            users: {}
        };
        const event = {
            target: {
                value: 'test'
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();
    
        instance.handleInputPassword(event);
    
        expect(instance.state.password).toEqual('test');
    });

    it('should change state when handleInputName is called', () => {
        const initialState = {
            users: {}
        };
        const event = {
            target: {
                value: 'test'
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();
    
        instance.handleInputName(event);
    
        expect(instance.state.name).toEqual('test');
    });

    it('should change state when handleInputLastname is called', () => {
        const initialState = {
            users: {}
        };
        const event = {
            target: {
                value: 'test'
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();
    
        instance.handleInputLastname(event);
    
        expect(instance.state.lastname).toEqual('test');
    });

    it('should dispatch userRegister when submitForm is called', () => {
        const preventDefault = jest.fn();
        const state = {
            name: 'name',
            lastname: 'lastname',
            email: 'email',
            password: 'password',
        };
        const initialState = {
            users: {}
        };
        const event = { preventDefault };

        const instance = shallow(mockComponent(initialState)).dive().instance();
        instance.setState({ ...state, error: 'error' });
    
        instance.submitForm(event);

        expect(preventDefault).toHaveBeenCalled();
        expect(instance.state.error).toBe('');
        expect(userRegister).toHaveBeenCalledWith(state);
    });

    it('should redirect when componentWillReceiveProps is called and authenticated', () => {
        const push = jest.fn();
        const props = {
            history: {
                push
            }
        };
        const nextProps = {
            users: {
                login: {
                    isAuth: true
                }
            }
        };
        const initialState = {
            users: {}
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);

        expect(push).toHaveBeenCalledWith('/user');
    });

    it('should change state when componentWillReceiveProps is called with error and not authenticated', () => {
        const push = jest.fn();
        const props = {
            history: {
                push
            }
        };
        const nextProps = {
            users: {
                login: {
                    isAuth: false
                },
                register: false
            }
        };
        const initialState = {
            users: {}
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);

        expect(push).not.toHaveBeenCalled();
        expect(instance.state.error).toBe('Error, try again');
    });

    it('should change state when componentWillReceiveProps is called with no error and not authenticated', () => {
        const push = jest.fn();
        const props = {
            history: {
                push
            }
        };
        const nextProps = {
            users: {
                login: {
                    isAuth: false
                },
                register: true
            }
        };
        const initialState = {
            users: {}
        };
        const expectedState = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            error: ''
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);

        expect(push).not.toHaveBeenCalled();
        expect(instance.state).toEqual(expectedState);
    });
});