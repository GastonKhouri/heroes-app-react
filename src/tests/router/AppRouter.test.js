import { mount } from 'enzyme';
import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
import AppRouter from '../../routers/AppRouter';

describe('Pruebas en <AppRouter />', () => {

    const contextValue = {
        user: { logged: false },
        dispatch: jest.fn()
    }
    
    test('debe de mostrar el login si no esta autenticado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('PublicRoute').exists()).toBe(true);
        expect(wrapper.find('PrivateRoute').exists()).toBe(false);
        
    })

    test('debe de mostrar el componente marvel si esta autenticado', () => {

        const contextValue = {
            user: { logged: true, name: 'Gaston' },
            dispatch: jest.fn()
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find('Navbar').exists()).toBe(true);
        
    })
    

})
