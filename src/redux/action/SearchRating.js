import axios from 'axios'
import {APP_URL} from './config'

export const getSearchRating = (params)=>{
const url = APP_URL.concat(`items/search?rating=${params}`)
  return {
    type: 'GET_SEARCHRATING',
    payload: axios.get(url)
  }
}