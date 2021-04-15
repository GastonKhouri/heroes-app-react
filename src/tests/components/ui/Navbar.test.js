import React from 'react';
import { mount } from "enzyme";
import { Navbar } from '../../../components/ui/Navbar';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }
   
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Gastón'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
       
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Gastón');

    });

    test('Debe de llamar el logout y usar history', () => {
       
        wrapper.find('button').simulate('click');

        expect(contextValue.dispatch).toBeCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');

    });    
    

});
