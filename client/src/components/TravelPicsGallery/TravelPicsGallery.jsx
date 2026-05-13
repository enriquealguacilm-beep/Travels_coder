import { useContext, useEffect, useState } from "react"
import { fetchAxios } from "../../helpers/axiosHelper"
import { AuthContext } from "../../context/AuthContext"
import trash from '../../assets/delete.svg'
import './travelPic.css'

export const TravelPicsGallery = ({travel_id}) => {
  const {token} = useContext(AuthContext);
  const [pics, setPics] = useState([]);

  console.log(pics);
  
  useEffect(()=>{
    const fetchPics = async() => {
      try {
        let res = await fetchAxios(`/travels/picsByTravel/${travel_id}`,'GET', null, token);
        setPics(res.data);
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchPics();

  },[])
  return (
    <div className="d-flex flex-wrap gap-2">
      {pics.map(elem => {
        return(
         
          <div className="cont-img">
             <img className="pic" src={`${import.meta.env.VITE_SERVER_IMAGES_URL}/travel/${elem.file}`} />
             <img className="trash" src={trash} />
          </div>
        )
      })} 
    </div>
  )
}
