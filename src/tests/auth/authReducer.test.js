import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {
        
        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false });

    })

    test('debe de autenticar y colocar el name del usuario', () => {
        
        const action = {
            type: types.login,
            payload: {
                nombre: 'Gaston'
            }
        }

        const state = authReducer({ logged: false }, action);

        expect(state).toEqual({ nombre: 'Gaston', logged: true });

    })

    test('debe de borrar el name del usuario y el logged en false', () => {
        
        const action = {
            type: types.logout
        }

        const state = authReducer({ nombre: 'Gaston', logged: true }, action);

        expect(state).toEqual({ logged: false });

    })    
    
    
})
