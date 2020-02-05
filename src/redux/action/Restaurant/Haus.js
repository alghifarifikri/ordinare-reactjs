import axios from 'axios'
import {APP_URL} from '../config'

export const getHaus = ()=>{
const url = APP_URL.concat('user/menu/2')
  return {
    type: 'GET_HAUS',
    payload: axios.get(url)
  }
}