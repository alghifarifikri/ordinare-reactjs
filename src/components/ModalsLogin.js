import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {APP_URL} from '../resource/config'
import Axios from 'axios';
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom';

const token = Cookie.get('token')

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }

    login = async () => {
        const url = APP_URL.concat(`user/login`)
        await Axios.post(url, {
            username: this.state.username,
            password: this.state.password 
        }) 
            .then((res) => {
                this.setState({
                    token: res.data.auth
                    
                })
                
                if (this.state.token) {
                    Cookie.set("token",this.state.token)
                    window.location.reload();
                }
                if (res.data.success === false) {
                    alert('Wrong username/ password')
                }
                console.log(res)
                
            })
            .catch((err) => {
                console.log(err)
                alert(err)
            })
    }

    render() {
        const {ShowModalLogin, toggle} = this.props
        let { username, password } = this.state
        
        // const externalCloseBtn = <button className="close" onClick={toggle}>&times;</button>;
        return (

          <div>
        <Button color="btn btn-primary btn-block" onClick={toggle}>Login</Button>
        <Modal isOpen={ShowModalLogin} toggle={toggle}>
          <ModalHeader >Login</ModalHeader>
          <ModalBody className = "text-left">
          Username
          <input type="text" value = {username} onChange = {(e) => this.setState ({ username : e.target.value })} className="form-control" placeholder="Enter Username" /><br/>
          Password
          <input type="password" value = {password} onChange = {(e) => this.setState ({ password : e.target.value })} className="form-control" placeholder="Enter password" />
           </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { toggle(); this.login(); }}>Login</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
       </Modal>
     </div>
        )
    }
}

/* =================================================================================================================== */

class Logout extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          username: '',
          password: '',
          token: ''
      }
  }

  logout = async () => {
    const url = APP_URL.concat(`user/logout`)
    await Axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token 
        }

    })
        .then((res) => {
            console.log(res)
            if (res.data.success === true) {
                Cookie.remove('token')
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
}
  
  render() {
    const {ShowModalLogout, toggle} = this.props
    
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
      <div>
      <Link to = '#' className = "fa fa-sign-out ml-2 mr-3" color="info" style={{ fontSize : '20px' }} onClick={toggle}></Link>
      <Modal isOpen={ShowModalLogout} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader><b>Logout</b></ModalHeader>
        <ModalFooter>
          <span style = {{ fontSize : '25px', textAlign : 'left', width : '100%' }}> Really ?</span>
        </ModalFooter>
        <ModalFooter>
          <div className="margin"> 
          <Button color="primary"  onClick={() => { toggle(); this.logout(); }}>Logout</Button>
          </div>
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    )
  }
}

export {Login, Logout}