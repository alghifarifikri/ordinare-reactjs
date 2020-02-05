import axios from 'axios'
import {APP_URL} from './config'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
let decode = ''
if (token) {
    decode = Jwt(token)
}

export const getCarts = (id)=>{  
const url = APP_URL.concat(`user/cart/${id}`)
  return {
    type: 'GET_CARTS',
    payload: axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
      })      
  }
}
