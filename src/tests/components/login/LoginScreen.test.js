import { mount } from 'enzyme';
import React from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import LoginScreen from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {

    const historyMock = {
        replace: jest.fn(),
    }

    const contextValue = {
        user: { logged: false },
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen 
                history={ historyMock } 
            />
        </AuthContext.Provider>
    );

    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('debe de realizar el dispatch y la navegacion', () => {

        wrapper.find('button').simulate('click');

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Gaston'
            }
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');

        wrapper.find('button').simulate('click');

        expect(historyMock.replace).toHaveBeenCalledWith('/dc');
        
    })
    

    
    
})
