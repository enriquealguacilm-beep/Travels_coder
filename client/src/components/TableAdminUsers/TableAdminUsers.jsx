import { Button, Table } from "react-bootstrap"


export const TableAdminUsers = ({data, onSubmit}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(e=>(

          <tr key={e.user_id}>
            <td>{e.user_id}</td>
            <td>{e.name}</td>
            <td>{e.lastname}</td>
            <td>{e.email}</td>
            <td>{e.user_is_deleted===0?'activo':'deshabilitado'}</td>
            <td><Button onClick={()=>onSubmit(e)}>{e.user_is_deleted===0?'Deshabilitar':'Habilitar'}</Button></td>


          </tr>

        ))}
       
       
      </tbody>
    </Table>
  )
}
