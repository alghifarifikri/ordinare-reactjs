import axios from 'axios'
import {APP_URL} from '../config'

export const getChickenFood = ()=>{
const url = APP_URL.concat('items/category/1')
  return {
    type: 'GET_CHICKENFOOD',
    payload: axios.get(url)
  }
}