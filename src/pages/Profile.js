import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Row, Col, Container, Button, Card, Alert} from 'reactstrap'
import { APP_URL } from '../resource/config'
import { getFood, getNext } from '../redux/action/Food'
import { connect } from 'react-redux'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'

const token = Cookie.get('token')

let decode = ''
if(token) {
  decode = Jwt(token)
}


class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            username : '',
            password : '',
            image : null,
            isFetchedData : false,
            file: null,
            id : decode.id
        };
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

async componentDidMount(){
    const {id} = this.props.match.params
    const url = APP_URL.concat(`user/profile/${id}`)
    const user = await axios.get(url)
    const {data} = user
    console.log(data)
    this.setState(
        { data, isFetchedData:true})
}

onFormSubmit(e){
    e.preventDefault();
    const id = decode.id
    const formData = new FormData();
    formData.append('image', this.state.image);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: 'Bearer ' + token
        }
    };
    const url = APP_URL.concat(`user/input_image/${id}`)
    axios.post(url ,formData, config, {id_user : id})
        .then((response) => {
            alert("The file is successfully uploaded");
            window.location.reload()
        }).catch((error) => {
    });
}
onChange(e) {
    this.setState({image:e.target.files[0]});
}

    render(){
        const {isFetchedData, data} = this.state
        return(
            
            <div>
                 
            <Container>
            {
                     isFetchedData&& (
                <Row>
                    
                <Col md={3}>
                
                </Col>
                
                <Col md={6}>
                    
                <Card color = 'light' style = {{borderRadius : "40px", padding:20}} className = "shadow">
                <div className = 'text-center'> <img src={APP_URL.concat(`storage/${data.data[0].image}`)} alt = {data.data[0].name} 
                            style = {{width : "150px", height : "150px", marginBottom: 30}}/> </div>
                <form onSubmit={this.onFormSubmit} style={{marginBottom: 30}}>
                    <h6>Ganti Foto Profil</h6>
                    <input type="file" name="myImage" onChange= {this.onChange} />
                    <button type="submit">Upload</button>
                </form>
                 Username
                <input type="text" className = "m-2" value = {data.data[0].username} onChange = {(e) => this.setState ({ username : e.target.value })} className="form-control" placeholder="Enter Username" /><br/>
                Address
                <input type="text" className = "m-2" value = "Jl. Sukasari III No. 47" className="form-control" />

                <Button color = "primary" className = "mt-2" style = {{width : '30%'}}>Save</Button>
                </Card>
                
                </Col>
                
                <Col md={3}>
                
                </Col>
                </Row>
                )}   
            </Container>
                  
            </div>
        )
    }
}

export default Profile