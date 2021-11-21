import React from 'react';
import { mount } from "enzyme"
import HeroScreen from "../../../components/hero/HeroScreen"
import { MemoryRouter, Route } from 'react-router-dom';


describe('Pruebas en <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }

    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);

    })

    test('debe de mostrar un hero si el parametro existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route exact path='/hero/:heroeId' component={ HeroScreen } />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true)
        
    })

    test('debe de regresar a la pantalla anterior', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        } 

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path='/hero/:heroeId' 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');

        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
        
    })

    test('debe de regresar a la pantalla anterior', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path='/hero/:heroeId' 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');

        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();

    })

    test('debe de llamar el redirect si el id no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider123'] }>
                <Route 
                    path='/hero/:heroeId' 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
        
    })
    
    
    
    
    
    
})
