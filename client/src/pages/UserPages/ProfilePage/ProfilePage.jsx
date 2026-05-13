import { useContext, useState } from 'react';
import userDefault from '../../../assets/user.jpg'

import './profilePage.css';
import { AuthContext } from '../../../context/AuthContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FormNewTravel } from '../../../components/FormNewTravel/FormNewTravel';
import { TravelProfileGal } from '../../../components/TravelProfileGal/TravelProfileGal';

const ProfilePage = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <h1 className="p-3">Tu perfil</h1>
      <div className="d-flex justify-content-around">
        <div>
          <h2>Datos</h2>
          <hr />
          <h3>Nombre: {user.name} {user.lastname}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Dirección: {user.address}</h3>
          <h3>Teléfono: {user.phone}</h3>
          <div className='d-flex gap-2'>
            <Button onClick={()=> navigate('/editUser')}>Editar</Button>
            <Button>Eliminar</Button>
          </div>
        </div>
        <div className='profile-img'>
          <img src={user.avatar?`${import.meta.env.VITE_SERVER_IMAGES_URL}/users/${user.avatar}`:userDefault}/>
        </div>
      </div>
      <div className='p-5'>
        <Button onClick={()=> setShowForm(true)}
        disabled= {showForm}
        >Crear viaje</Button>
        {showForm && <FormNewTravel setShowForm = {setShowForm}/>}
        </div>
        <div>
          {!showForm && <TravelProfileGal/>}
        </div>
    </div>
  )
}

export default ProfilePage