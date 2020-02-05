import axios from 'axios'
import {APP_URL} from '../config'

export const getLocalDrinks = ()=>{
const url = APP_URL.concat('items/category/2')
  return {
    type: 'GET_LOCALDRINKS',
    payload: axios.get(url)
  }
}