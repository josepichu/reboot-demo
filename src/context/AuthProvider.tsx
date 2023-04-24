import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/App/User';
import { Roles } from '../models/App/Roles';

const roles: Roles[] = ['user', 'admin', 'super-admin'];

interface AuthProviderI {
  token?: string;
  user?: User; // TODO crear User model
  isAuth: boolean;
  login: () => void;
  logout: () => void;
  hasAccess: (role: Roles) => boolean;
}

const initialValue: AuthProviderI = {
  isAuth: !!localStorage.getItem('access_token'),
  token: localStorage.getItem('access_token') ?? undefined,
  login: () => null,
  logout: () => null,
  hasAccess: () => false,
};

const AuthContext = React.createContext(initialValue);

function AuthReducer(state: any, action: any): AuthProviderI {
  switch (action.type) {
    case 'user-fetched':
      const { token, user } = action.payload;
      return {
        ...state,
        token,
        user,
        isAuth: true,
      };
    case 'user-logout':
      return {
        ...initialValue,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  return context;
};

const AuthProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialValue);

  const { user, isAuth } = state;

  const navigate = useNavigate();

  /*
  aunque no es lo habitual ni tampoco viable (según el caso), para esta demo se ha optado a hacer login cada vez que se hace un f5. 
  ya que la autenticación y la gestíon de la inforamciñon del usuario no era la finalizadad principal de esta pequeña demo, puesto  
  que depende de la lógica de negocio y caso particular de cada proyecto  

  se ha decidido hacerlo asi por simplicidad y sobrettodo a modo iluttrativo de un caso donde se hace uso de la importancia de la clean up function
 */
  React.useEffect(() => {
    if (isAuth) navigate('/');
    else navigate('/login');
    // clean up function
    return () => localStorage.removeItem('access_token');
  }, [isAuth]);

  // basic login method
  const login = () => {
    // call api.... then(() => aqui tendremos la info del usuario
    const user = { id: 1234, name: 'jramirez', roles: 'user' };
    const token = '12345-token';

    localStorage.setItem('access_token', token);

    dispatch({ type: 'user-fetched', payload: { user, token } });
  };

  // basic logout method
  const logout = () => {
    // call api.... then(() => ..

    localStorage.removeItem('access_token');

    dispatch({ type: 'user-logout' });
  };

  // basic guard example
  const hasAccess = (role: Roles): boolean =>
    !!(user && roles.indexOf(role) <= roles.indexOf(user.roles));

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
