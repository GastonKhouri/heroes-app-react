import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../../routers/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn()

    test('debe de mostrar el componente si esta autenticado y guardar en localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={ () => <h1> Hola Mundo </h1> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect(wrapper.find('h1').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', props.location.pathname);
        
    })

    test('debe de bloquear el componente si no esta autenticado', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={ () => <h1> Hola Mundo </h1> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect(wrapper.find('h1').exists()).toBe(false);

    })
    
    
    
})
