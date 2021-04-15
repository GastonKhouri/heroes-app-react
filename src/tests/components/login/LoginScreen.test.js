import React from 'react';
import { mount } from "enzyme";
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';


describe('Pruebas en <LoginScreen />', () => {

    const contextValue = {
        dispatch: jest.fn()
    }

    const historyMock = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock } />
        </AuthContext.Provider>
    )

    test('Debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de hacer el dispatch y la navegación', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(historyMock.replace).toBeCalledWith('/');

        expect(contextValue.dispatch).toBeCalledWith({
            type: types.login,
            payload: { name: 'Gastón' }
        });

        localStorage.setItem('lastPath', '/dc');

        handleClick();

        expect(historyMock.replace).toBeCalledWith('/dc');

    });

});
