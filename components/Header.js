import React from 'react';
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    //console.log(data);
    //console.log(loading);
    //console.log(error);

    // proteger que no accedamos a dara antes de tener los resultados
    if ( loading ) return null;

    // Si no hayinformacion
    if ( !data ) {
        return router.push('/login');
    }

    const { nombre } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return ( 
        <div className="flex justify-between mb-6">
            
            <p className="mr-3">Hola: { nombre }</p>

            <button 
                onClick={ () => cerrarSesion() }
                className="bg-blue-800 w-full  sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                type="button"
            >
                Cerrar sesión
            </button>

        </div>
     );
}
 
export default Header;
