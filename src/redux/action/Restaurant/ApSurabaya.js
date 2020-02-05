import axios from 'axios'
import {APP_URL} from '../config'

export const getApSurabaya = ()=>{
const url = APP_URL.concat('user/menu/1')
  return {
    type: 'GET_APSURABAYA',
    payload: axios.get(url)
  }
}