import { useContext, useEffect, useState } from "react"
import { fetchAxios } from "../../../helpers/axiosHelper"
import { AuthContext } from "../../../context/AuthContext"
import { TableAdminUsers } from "../../../components/TableAdminUsers/TableAdminUsers";

const AdminUserPage = () => {

  const {token} = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState();

  useEffect(()=>{
    const fetchData = async()=> {
      try {
        let res = await fetchAxios('/admin/allUsers','GET', null, token);
        
        
        setAllUsers(res.data.result);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchData();
  },[])

  const desHabUser = async(user)=> {
    
    try {
      let url=`/admin/${user.user_is_deleted?"enableUser":"disableUser"}`
      let res = await fetchAxios(url,'PUT',{user_id: user.user_id}, token);  

      setAllUsers(allUsers.map(e=>{
        if(e.user_id === user.user_id){
          return {...e, user_is_deleted: e.user_is_deleted===0?1:0}
        }
        else {
          return e
        }

      }))
      console.log(res);
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  



  return (
    <div>
      <h2>Administrar usuarios</h2>
      <hr />
      <TableAdminUsers data={allUsers} onSubmit={desHabUser}/>
    </div>
  )
}

export default AdminUserPage