import React from 'react'
import {mount} from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';


describe('Pruebas en <LoginScreen />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged:false,
            name:'Nico'
        }
    }

    const history = {
        replace: jest.fn(),
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de realizar el dispatch y la navegacion', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');
        
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload:{
                name:'Nicolas'
            }
        })

        expect( history.replace ).toHaveBeenCalled();

        localStorage.setItem('lastPath','/dc');
        handleClick();
        expect( history.replace ).toHaveBeenCalledWith('/dc');
    });
    
    
});

