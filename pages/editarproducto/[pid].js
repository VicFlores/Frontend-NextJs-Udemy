import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout'
import { route } from 'next/dist/next-server/server/router';

const EditarProducto = () => {

  const router = useRouter();
  const { query: { id } } = router;
  console.log(id);

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
    </Layout>
   );
}
 
export default EditarProducto;
