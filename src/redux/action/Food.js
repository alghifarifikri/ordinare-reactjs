import axios from 'axios'
import {APP_URL} from './config'

export const getFood = ()=>{
const url = APP_URL.concat('items/page?page=1&limits=5')
  return {
    type: 'GET_FOOD',
    payload: axios.get(url)
  }
}

export const getNext = (url1)=>{  
    return {
      type: 'GET_NEXT',
      payload: axios.get(url1)
    }
  }