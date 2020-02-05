import axios from 'axios'
import {APP_URL} from './config'


export const getReview = (id)=>{ 
    const url = APP_URL.concat(`items/review/${id}`)
      return {
        type: 'GET_REVIEW',
        payload: axios.get(url)
        }
    }