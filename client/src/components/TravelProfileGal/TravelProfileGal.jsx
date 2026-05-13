import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { CardTravel } from "../CardTravel/CardTravel";
import { ModalEditTravel } from "../ModalEditTravel/ModalEditTravel";
import { useState } from "react";


export const TravelProfileGal = () => {
  const {travels} = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [travelToEdit, setTravelToEdit] = useState({})

  const handleChange = (e) => {
    const {name, value} =e.target;
    setTravelToEdit({...travelToEdit, [name]:value});
  }
  const closeModal = () => setShow(false);
  const openModal = (viaje) => {
    setTravelToEdit(viaje)
    console.log(viaje);
    
    setShow(true);
  }
    
  return (
    <div>
      <h3>Tus viajes</h3>
      <div className="d-flex justify-content-center gap-4 flex-column">
        {travels.map(elem => {
          return (
            <CardTravel key={elem.travel_id}
                        data = {elem}
                        openModal ={openModal}
            />

          )
        })}
      </div>
      <ModalEditTravel 
          show={show} 
          handleClose ={closeModal} 
          travelToEdit={travelToEdit}
          handleChange ={handleChange}
          />
    </div>
  )
}
