import axios from 'axios'
import {APP_URL} from '../config'

export const getWarung = ()=>{
const url = APP_URL.concat('user/menu/5')
  return {
    type: 'GET_WARUNG',
    payload: axios.get(url)
  }
}