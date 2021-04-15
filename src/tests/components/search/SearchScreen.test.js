import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search' ]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');

    });

    test('Debe de mostrar a batman y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value').trim()).toBe('batman');

    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman123123' ]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with batman123123');

    });

    test('Debe de llamar el push del history', () => {
        
        const historyMock = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman123123' ]}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

        expect(historyMock.push).toBeCalledWith('?q=batman');

    });

});
