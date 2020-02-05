import axios from 'axios'
import {APP_URL} from './config'

export const getSearchName = (params)=>{
const url = APP_URL.concat(`items/search?name=${params}`)
  return {
    type: 'GET_SEARCHNAME',
    payload: axios.get(url)
  }
}