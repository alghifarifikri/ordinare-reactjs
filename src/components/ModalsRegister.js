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

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
        }
    }

    async onSubmit (event){
        event.preventDefault();
        const data = await Axios.post(APP_URL.concat('user/register'),this.state)
        window.location = '/'
        console.log(this.state.username, data)
          }


    render() {
      const {ShowModalRegister, toggle} = this.props
      let { username, password } = this.state
      
      // const externalCloseBtn = <button className="close" onClick={toggle}>&times;</button>;
      return (
  
        <div>
      <Button color="btn btn-danger btn-block" onClick={toggle}>Register</Button>
      <Modal isOpen={ShowModalRegister} toggle={toggle}>
        <ModalHeader >Register</ModalHeader>
        <ModalBody className = "text-left">
        Username
        <input type="text" value = {username} onChange = {(e) => this.setState ({ username : e.target.value })} className="form-control" placeholder="Enter Username" /><br/>
        Password
        <input type="password" value = {password} onChange = {(e) => this.setState ({ password : e.target.value })} className="form-control" placeholder="Enter password" />
         </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick = {this.onSubmit} >Register</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
     </Modal>
   </div>
      )
    }
  }
// {() => { toggle(); this.register(); }}
  export default Register