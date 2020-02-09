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

class ForgotPassword extends React.Component {
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
        const data = await Axios.put(APP_URL.concat('user/forgotpassword'),this.state)
        window.location = '/Food'
          }


    render() {
      const {ShowModalForgot, toggle} = this.props
      let { username, password } = this.state
      
      // const externalCloseBtn = <button className="close" onClick={toggle}>&times;</button>;
      return (
  
        <div>
      <Button color="btn btn-block" onClick={toggle}>Forgot Password</Button>
      <Modal isOpen={ShowModalForgot} toggle={toggle}>
        <ModalHeader >Forgot Password</ModalHeader>
        <ModalBody className = "text-left">
        Username
        <input type="text" value = {username} onChange = {(e) => this.setState ({ username : e.target.value })} className="form-control" placeholder="Enter Username" /><br/>
        New Password
        <input type="password" value = {password} onChange = {(e) => this.setState ({ password : e.target.value })} className="form-control" placeholder="Enter New password" />
         </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick = {this.onSubmit} >Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
     </Modal>
   </div>
      )
    }
  }
// {() => { toggle(); this.register(); }}
  export default ForgotPassword