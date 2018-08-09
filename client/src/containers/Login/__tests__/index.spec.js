import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import Login from './../../Login';
import { loginUser } from './../../../actions';

const mockStore = configureStore();

jest.mock('./../../../actions', () => ({ 
    loginUser: jest.fn(() => ({
        type: 'loginUser'
    })) 
}));

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <Login {...props} store={store} />
    );
};
 
describe('<Login />', () => {
    it('should render component', () => {
        const initialState = {
            users: {}
        };
        const tree = create(mockComponent(initialState)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with error message', () => {
        const initialState = {
            users: {
                login: {
                    message: 'test'
                }
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

    it('should dispatch loginUser when submitForm is called', () => {
        const preventDefault = jest.fn();
        const state = {
            email: 'test',
            password: 'test'
        };
        const initialState = {
            users: {}
        };
        const event = { preventDefault };

        const instance = shallow(mockComponent(initialState)).dive().instance();
        instance.setState(state);
    
        instance.submitForm(event);

        expect(preventDefault).toHaveBeenCalled();    
        expect(loginUser).toHaveBeenCalledWith(state);
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

    it('should not redirect when componentWillReceiveProps is called and not authenticated', () => {
        const push = jest.fn();
        const props = {
            history: {
                push
            }
        };
        const nextProps = {
            users: {
                login: {}
            }
        };
        const initialState = {
            users: {}
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);

        expect(push).not.toHaveBeenCalledWith('/user');
    });
});