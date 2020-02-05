import axios from 'axios'
import {APP_URL} from './config'

export const getDetails = (id)=>{ 
    const url = APP_URL.concat(`items/details/${id}`)
    return {
        type: 'GET_DETAILS',
        payload: axios.get(url)
        }
    }
