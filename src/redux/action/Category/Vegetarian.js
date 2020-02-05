import axios from 'axios'
import {APP_URL} from '../config'

export const getVegetarian = ()=>{
const url = APP_URL.concat('items/category/5')
  return {
    type: 'GET_VEGETARIAN',
    payload: axios.get(url)
  }
}