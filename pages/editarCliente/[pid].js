import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const OBTENER_CLIENTE = gql`
    query obtenerCliente( $id: ID! ) {
        obtenerCliente( id: $id ) {
        nombre
        apellido
        empresa
        email
        telefono
        }
    }
`;

const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente( $id: ID!, $input: ClienteInput ) {
        actualizarCliente( id: $id, input: $input) {
        nombre
        apellido
        empresa
        email
        telefono
        }
    }
`;

const EditarCliente = () => {

    // Obtener el ID actual
    const router = useRouter();
    const { query: { id } } = router;
    //console.log(id);

    // Consultar para obtener cliente
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });

    // Actualizar cliente
    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

    const schemaValidacion = Yup.object ({
        nombre: Yup.string()
                    .required('El nombre es requerido'),
        apellido: Yup.string()
                    .required('El apellido es requerido'),
        empresa: Yup.string()
                    .required('La empresa del cliente es requerida'),
        email: Yup.string()
                    .email('Email invalido')
                    .required('El email es requerido')
    });

    //console.log(data.obtenerCliente);

    if (loading) return 'Cargando';

    const { obtenerCliente } = data;

    // MOdificar el cliente DB
    const actualizarInfoCliente = async valores => {
        const { nombre, apellido, empresa, email, telefono } = valores;

        try {
            const { data } = await actualizarCliente({
                variables: {
                    id, 
                    input: {
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }
            });
            //console.log(data);

            Swal.fire(
                'Actualizado',
                'Cliente actualizado correctamente',
                'success'
              )

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    
    
    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues= { obtenerCliente }
                        onSubmit={ (valores)  => {
                            actualizarInfoCliente(valores)
                        } }
                    >
                    { props => {

                    return (
                        <form 
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={ props.handleSubmit }
                        >

                        <div className="mb-4">
                            <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                            >
                                Nombre  
                            </label>

                            <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nombre"
                            type="text"
                            placeholder="Nombre de cliente"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.nombre }
                            />
                        </div>

                        {  props.touched.nombre && props.errors.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                 <p>{ props.errors.nombre }</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="apellido"
                            >
                                Apellido  
                            </label>

                            <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="apellido"
                            type="text"
                            placeholder="Apellido de cliente"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.apellido }
                            />
                        </div>

                        {  props.touched.apellido && props.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                 <p>{ props.errors.apellido }</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="empresa"
                            >
                                Empresa  
                            </label>

                            <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="empresa"
                            type="text"
                            placeholder="Empresa de cliente"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.empresa }
                            />
                        </div>

                        {  props.touched.empresa && props.errors.empresa ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                 <p>{ props.errors.empresa }</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                            >
                                Email  
                            </label>

                            <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email de cliente"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.email }
                            />
                        </div>

                        {  props.touched.email && props.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                 <p>{ props.errors.email }</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="telefono"
                            >
                                Telefono  
                            </label>

                            <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="telefono"
                            type="tel"
                            placeholder="Telefono de cliente"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.telefono }
                            />
                        </div>

                        {  props.touched.telefono && props.errors.telefono ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                 <p>{ props.errors.telefono }</p>
                            </div>
                        ) : null }

                        <input
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            type="submit"
                            value="Editar cliente"
                        />

                        </form>
                    )
                } }
                    </Formik>
                </div>
            </div>
        </Layout>
     );
}
 
export default EditarCliente;