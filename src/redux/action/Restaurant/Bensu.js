import axios from 'axios'
import {APP_URL} from '../config'

export const getBensu = ()=>{
const url = APP_URL.concat('user/menu/3')
  return {
    type: 'GET_BENSU',
    payload: axios.get(url)
  }
}