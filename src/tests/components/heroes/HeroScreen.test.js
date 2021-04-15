import React from 'react';
import { mount } from "enzyme";
import { HeroScreen } from "../../../components/heroes/HeroScreen";
import { MemoryRouter, Route } from 'react-router';


describe('Pruebas en <HeroScreen />', () => {
   
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/hero' ]}>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        )

        expect(wrapper.find('Redirect').exists()).toBe(true);

    });

    test('Debe de mostrar un hero si el parametro existe y se encuentra', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
        expect(wrapper.find('h3').text().trim()).toBe('Spider Man');

    });

    test('Debe de regresar a la pantalla anterior con push', () => {
    
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');

        expect(historyMock.push).toBeCalledWith('/');
        expect(historyMock.goBack).not.toBeCalled();

    });
    
    test('Debe de regresar a la pantalla anterior goback', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');

        expect(historyMock.push).toBeCalledTimes(0);
        expect(historyMock.goBack).toBeCalled();

    });

    test('Debe de llamar el Redirect si el hero no existe', () => {
       
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/hero/marvel-spider1231231' ]}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');

    });
    
    

});
