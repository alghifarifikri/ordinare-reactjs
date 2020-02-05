import axios from 'axios'
import {APP_URL} from './config'

export const getSort = ()=>{
const url = APP_URL.concat('items/sort/asc?price=true')
  return {
    type: 'GET_SORT',
    payload: axios.get(url)
  }
}