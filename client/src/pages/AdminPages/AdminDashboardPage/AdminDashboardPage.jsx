import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { fetchAxios } from "../../../helpers/axiosHelper"
import { AuthContext } from "../../../context/AuthContext"
import { useNavigate } from "react-router"


const AdminDashboardPage = () => {

  const {token} = useContext(AuthContext);
  const [data, setData] = useState();
  useEffect(()=>{
    const fetchData = async()=> {
      try {
        const res = await fetchAxios('/admin/dataAdmin', 'GET', null, token);
        console.log(res);
        setData(res.data.result);
      } catch (error) {
        console.log(error);
        
      }
    } 

    fetchData();
  },[])

  const navigate = useNavigate();
  return (
    <div>
      <h1>Panel de control</h1>
      <hr />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center gap-3">
          <div className="d-flex flex-column gap-2 p-3 align-items-center border border-1">
            <h2>Usuarios totales</h2>
            <h3>{data?.total_users}</h3>
          </div>
          <div className="d-flex flex-column gap-2 p-3 align-items-center border border-1">
            <h2>Usuarios Baneados</h2>
            <h3>{data?.disabled_users}</h3>
          </div>
          <div className="d-flex flex-column gap-2 p-3 align-items-center border border-1">
            <h2>Usuarios activos</h2>
            <h3>{data?.active_users}</h3>
          </div>
        </div>
        <Button onClick={()=>navigate('/AdminUserPage')}>Gestión de usuarios </Button>
      </div>
    </div>
  )
}

export default AdminDashboardPage