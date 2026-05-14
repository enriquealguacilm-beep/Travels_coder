import { useContext, useEffect, useState } from "react"
import { fetchAxios } from "../../helpers/axiosHelper"
import { AuthContext } from "../../context/AuthContext"
import trash from '../../assets/delete.svg'
import './travelPic.css'

export const TravelPicsGallery = ({travel_id}) => {
  const {token} = useContext(AuthContext);
  const [pics, setPics] = useState([]);

 
  
  useEffect(()=>{
    const fetchPics = async() => {
      try {
        let res = await fetchAxios(`/travels/picsByTravel/${travel_id}`,'GET', null, token);
        setPics(res.data);
       
        
      } catch (error) {
        console.log(error);
        
      }
    }
    
    fetchPics();
    
  },[])

  const deletePic = async(elem) => {
    const {image_id, travel_id, file} = elem
    try {
      
      let res = await fetchAxios(`/travels/delPic/${image_id}/${travel_id}/${file}`, "DELETE", null, token);
      let temp = pics.filter(elem =>  elem.image_id !== image_id)
      setPics(temp);
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleChange = async(e) => {
    const newFormData = new FormData();
    const files = e.target.files;

    if (files.length > 0){
      for (const elem of files) {
        newFormData.append("img", elem);
      }
      try {
        const res = await fetchAxios(`/travels/addPics/${travel_id}`,'POST', newFormData, token);
        setPics(res.data.data)
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  
  

  return (
    <div>

    <div className="d-flex flex-wrap gap-2">
      {pics.map(elem => {
        return(
          
          <div className="cont-img">
             <img className="pic" src={`${import.meta.env.VITE_SERVER_IMAGES_URL}/travel/${elem.file}`} />
             <img className="trash" src={trash} onClick={()=>deletePic(elem)}/>
          </div>
        )
      })} 
      </div>
      <form>
        <label htmlFor={travel_id}>Add</label>
        <input 
            id={travel_id}
            hidden
            type="file" 
            multiple
            onChange={handleChange}
            />
      </form>
    </div>
  )
}
