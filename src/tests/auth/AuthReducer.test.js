import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";



describe('Pruebas en authReducer', () => {
    
    const user = {
        name: 'Nicolas',
        logged: false
    }


    test('Debe de retornar el estado por defecto', () => {
        const defaultState =  authReducer({logged: false},{});
        expect(defaultState).toEqual({logged: false});
    });

    test('Debe de autenticar y colocar el name del usuario', () => {
        const action = {
            type: types.login,
            payload: user
        }
        const state = authReducer(user,action);
        expect(state).toEqual({name:'Nicolas', logged:true});
    });
    
    test('Debe de borrar el name del usuario y el logged en false', () => {
        const action = {
            type: types.logout,
            payload: user
        }
        const state = authReducer(user,action);
        expect(state).toEqual({logged:false});

    });
    
});
