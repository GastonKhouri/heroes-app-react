import { mount, shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import DashboardRoutes from '../../routers/DashboardRoutes';

describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        user: { logged: true, name: 'Gaston' },
        dispatch: jest.fn()
    }

    test('debe de mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );        

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Gaston');

    })
    
    
})


