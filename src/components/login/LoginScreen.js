import React, { useContext} from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        // history.push('/');
        
        const lastPath = localStorage.getItem('lastPath') || '/';

        dispatch({
            type: types.login,
            payload: {
                name: 'Nicolas'
            }
        });        
        history.replace(lastPath);
    }

    return (
        <div className="container text-center mt-5">
            <h1>Click on the button to enter</h1>
            <hr />

            <button
                className="btn btn-outline-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    );
}
