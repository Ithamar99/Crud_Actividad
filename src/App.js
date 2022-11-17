import React from "react";
import {firebase} from'./firebase'

function App() {
  //estados
  const[lista,setLista]=React.useState([])
  const[nombre,setNombre]=React.useState('')
  const[apellido,setApellido]=React.useState('')
  const[id,setId]=React.useState('')
  const[modoEdicion, setModoEdicion]=React.useState(false)
  const[error,setError]=React.useState(null)


  React.useEffect(()=>{
    const obtenerDatos=async()=>{
      try{
        const db=firebase.firestore()
        const data=await db.collection('usuarios').get()
        const arrayData= data.docs.map((doc)=>({id:doc.id,...doc.data()}))
        setLista(arrayData)
      }catch(error){
        console.log(error)
      }
    }
    obtenerDatos()
  },[])
  const guardarDatos=async(e)=>{
    e.preventDefault()
    if(!nombre.trim()){
      
      setError('Ingrese Nombre')
      return
    }

    if(!apellido.trim()){
      setError('Ingrese Apellido')
      return
    }
    try{
      const db=firebase.firestore()
      const nuevoUsuario={nombre,apellido}
      //registrar en firestore
      const dato=await db.collection('usuarios').add(nuevoUsuario)
    //agregar en lista
      setLista([
        ...lista,
        {...nuevoUsuario,id:dato.id}
      ])
    }catch(error){
      console.log(error)
    }
    //limpiar nombre
    setNombre('')
    setApellido('')
    setError(null)
  }

  //Eliminar
  const eliminar = async (id) => {

    try {

        const db = firebase.firestore()
        await db.collection('usuarios').doc(id).delete()
        const aux = lista.filter(elemento => elemento.id !== id )

        setLista(aux)

    } catch (error) {

        console.log(error)
    }
}
      //Editar
      const editar=(elemento)=>{
        setModoEdicion(true)
        setNombre(elemento.nombre)
        setApellido(elemento.apellido)
        setId(elemento.id)

}

        const editarDatos=async(e)=>{

          e.preventDefault()
          if(!nombre.trim()){
            setError('Ingrese Nombre')
            return
          }

          if(!apellido.trim()){
            setError('Ingrese Apellido')
            return
          }
          try {
            const db=firebase.firestore()
            await db.collection('usuarios').doc(id).update({
              nombre,apellido
            })
            //actualizar Lista
            const listaEditada=lista.map((elemento)=>elemento.id===id ?{id,nombre,apellido}:elemento)
            //Actualizar Lista
            setLista(listaEditada)
            //Desactivar Modo edicion
            setModoEdicion(false)
            //Restablecer los valores de nombre / apellido
            setNombre('')
            setApellido('')
            setId('')
            setError(null)
          } catch (error) {
            console.log(error)
          }
}
  return (

    <div className="container">
      <div className="row">
      <div className="col-12">
        <h2 className="text-center">{modoEdicion ? 'Edicion de Usuario':'Registro de Usuarios'}</h2>
        {
          error ?
          <div className="alert alert-danger" role="alert">{error}
        </div>
        :
        null
        }
        <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
          <input type="text"
          placeholder="Ingrese Nombre"
          className="form-control mb-2"
          onChange={(e)=>{setNombre(e.target.value)}}

          value={nombre}
          />
          
           <input type="text"
          placeholder="Ingrese Apellido"
          className="form-control mb-2"
          onChange={(e)=>{setApellido(e.target.value)}}
          value={apellido}
          />
          
          <div className="d-grid gap-2">
            {
              //Validar el modo edicion - para cambiar el aspecto del boton Agregar/Editar
               modoEdicion ?
               <button className="btn btn-warning" type="submit">Editar</button>
               
               :
               <button className="btn btn-success" type="submit">Agregar</button>
            }
    
          </div>
        </form>
      </div>
      </div>
      <div className="row">
        <div className="col-12 mt-5">
          <h2 className="text-center">Usuarios Registrados</h2>
          <ul className="list-group">
            {
              lista.map((elemento)=>(
                <li className="list-group-item" key={elemento.id}>
                  {elemento.nombre} - {elemento.apellido}
                  <button className="btn btn-danger float-end m-2"
                  onClick={()=>eliminar(elemento.id)}
                  >Eliminar</button>
                  <button className="btn btn-warning float-end mb-2 m-2"
                  onClick={()=>editar(elemento)}
                  >Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
     </div>
     </div>
     
  );
}

export default App;
