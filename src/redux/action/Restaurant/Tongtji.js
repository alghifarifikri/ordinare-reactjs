import axios from 'axios'
import {APP_URL} from '../config'

export const getTongtji = ()=>{
const url = APP_URL.concat('user/menu/4')
  return {
    type: 'GET_TONGTJI',
    payload: axios.get(url)
  }
}