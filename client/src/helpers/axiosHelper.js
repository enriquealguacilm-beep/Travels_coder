import axios from 'axios';

export const fetchAxios = async(url, method, data=null, token=null) => {

  let headers = {}
  if(token){
    headers={Authorization:`Bearer ${token}`}
  }
  let config = {
    url,
    method,
    data,
    headers
  }
  return await axios(config);
}