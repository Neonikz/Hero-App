import React from 'react'
import {mount} from 'enzyme';
import { HeroScreen } from "../../../components/heroes/HeroScreen";
import { MemoryRouter, Route } from 'react-router-dom';


describe('Pruebas en <HeroScreen />', () => {

    const history = { 
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    
    test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
       const wrapper = mount(
           <MemoryRouter initialEntries={['/hero']}>
               <HeroScreen history={history} />
           </MemoryRouter>
       );
       expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('Debe de mostrar un hero si el parametro existe y se encuentra', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        ); 
        
        expect( wrapper.find('.row').exists() ).toBe(true);
    });
   
    test('Debe de regresar a la pantalla anterior con push ', () => {
        
        const history = { 
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={history}/> } 
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();
        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
    });
    
    test('Debe de regresar a la pantalla anterior con GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={history}/> } 
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();
        expect( history.push ).not.toHaveBeenCalled();
        expect( history.goBack ).toHaveBeenCalled();
    });

    test('Debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider124125125']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={history}/> } 
                />
            </MemoryRouter>
        );
        
        expect( wrapper.text() ).toBe('');    
    });
    
    
    
});
