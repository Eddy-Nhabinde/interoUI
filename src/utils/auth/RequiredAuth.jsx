import React, { useContext } from 'react'
import { Redirect, useLocation} from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

//Este e o component responsavel pela protecao de rotas e redirecionamento
/**
 * 
 * @param children que sao as telas requisitadas e  allowedRoles array de roles necessarios para acessar a pagina
 * @returns pagina de login em caso de nao auhtenticacao ou  pagina unauthorized em caso do usuario
 * authenticado nao ter o role ou a pagina requisitada em casos de sucesso na autenticacao e autorizacao
 */

const RequiredAuth = ({ children, allowedRoles }) => {

    const { auth } = useContext(AuthContext);
    const location = useLocation();
    const isAuth = window.location.toString().includes("mfl");
    
    if (((auth && allowedRoles) && auth.roles.find(role => allowedRoles.includes(role))) || (auth && !allowedRoles) || isAuth) {
        return children;
    } else if (auth && auth.user) {
        return <Redirect to='/unauthorized' state={{ from: location }} replace />;
    }
    return <Redirect to='/login' state={{ from: location }} replace />;
}

export { RequiredAuth }