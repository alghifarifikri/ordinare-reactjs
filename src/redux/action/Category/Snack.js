import axios from 'axios'
import {APP_URL} from '../config'

export const getSnack = ()=>{
const url = APP_URL.concat('items/category/4')
  return {
    type: 'GET_SNACK',
    payload: axios.get(url)
  }
}