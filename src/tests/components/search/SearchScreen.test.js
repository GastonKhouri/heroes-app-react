import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import SearchScreen from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {

    const historyMock = {
        push: jest.fn()
    }

    test('debe de mostrarse correctamente', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
        
    })

    test('debe de mostrar a batman y el input con el valor del queryString', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        )

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();

    });    

    test('debe de mostar un error si no se muestra el hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        )

        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with batman123');
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar el push del history', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={ () => <SearchScreen history={ historyMock } /> } />
            </MemoryRouter>
        )

        wrapper.find('input').simulate('change', { target: { name: 'searchText', value: 'batman' } });
        
        wrapper.find('form').simulate('submit', { preventDefault(){} });

        expect(historyMock.push).toHaveBeenCalledWith('?q=batman'); 

    })
    
    
    
})
