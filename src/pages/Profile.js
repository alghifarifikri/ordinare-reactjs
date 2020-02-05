import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Row, Col, Container, Button, Card, Alert} from 'reactstrap'
import { APP_URL } from '../resource/config'
import { getFood, getNext } from '../redux/action/Food'
import { connect } from 'react-redux'


class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            username : '',
            password : '',
            isFetchedData : false
        }
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
                 Username
                <input type="text" className = "m-2" value = {data.data[0].username} onChange = {(e) => this.setState ({ username : e.target.value })} className="form-control" placeholder="Enter Username" /><br/>
                Password
                <input type="text" className = "m-2" value = {data.data[0].password} onChange = {(e) => this.setState ({ password : e.target.value })} className="form-control" placeholder="Enter password" />

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