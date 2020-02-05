import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'
import {Row, Col, Container, Button, Card, Alert} from 'reactstrap'
import { APP_URL } from '../resource/config'
import '../resource/style.css'
import { getFood } from '../redux/action/Food'
import { connect } from 'react-redux'

class Name extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            name : '',
            isFetched : false
        }
    }
    
    async componentDidMount(){
        //  const name = this.state.query
        // const {data} = await axios.get(APP_URL.concat(`items/search/asc?name=${name}&page=1&limit=5`))
        
        // const {data} = await axios.get(APP_URL.concat(`items/search/asc?`), {params : {name : 'name'}}
        // this.setState({data, isFetched : !this.state.isFetched})
    }

    search = async => {
       
    }
        
    //     // this.props.dispatch(getFood())
    //     const {name} = qs.parse(this.props.location.search)
    //     console.log(name)
    //     const {data} = await axios.get(APP_URL.concat(`items/search/asc?name=${name}&page=1&limit=5`))
    //     this.setState({data, isFetched:!this.state.isFetched})
    // }

    prevButton = async()=>{
            const url = this.state.data.Prev
            if(url){
                const {data} = await axios.get(url)
                this.setState({data})
            }
    }

    nextButton = async()=>{
        const url = this.state.data.Next
        if(url){
            const {data} = await axios.get(url)
            this.setState({data})
        }
    }

    render(){
        const {isFetched, data} = this.state
        return(
            <div>
            <Container>
                <Row> 

                <Col md={3}>
                
                </Col>
                
                <Col md={6}>
                <Card color = 'light' style = {{borderRadius : "40px", padding:20}} className = "shadow">
                <input type="text" className = "m-2" className="form-control" placeholder="Find Here" />

                <Button color = "primary" className = "mt-2" style = {{width : '20%'}}>Search</Button>
                </Card>
                
                </Col>
                
                <Col md={3}>
                
                </Col>
                {/* {
                    // !this.props.food.isLoading&&
                    // this.props.food.data.map
                    isFetched&&data.data.map(v=>(
                        <Col md key = {v.id_item} className = 'mt-5'>
                        <Link to = {`/details/${v.id_item}`} className = 'text-light'>
                        <Card color = 'light' style = {{borderRadius : "40px"}} className = "shadow">
                            <div className = 'text-center text-dark mt-1' ><b>{v.name}</b></div><br/>
                            <div className = 'text-center'> <img src={APP_URL.concat(`storage/${v.image}`)} alt = {v.name}
                            style = {{width : "150px", height : "150px"}}/> </div> <br/>                       
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>Price : Rp. {v.price}</div>
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}><b>{v.name_resto}</b></div>
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>{v.descriptions}</div><br/>
                            
                        </Card>
                        </Link> 
                        </Col>)
                    )
                } */}
                
                </Row>
            <Row className = 'mt-5 mb-5'>
                <Col md={6} className = 'text-center'>
                    <Button onClick = {this.prevButton} color = 'primary'> Prev </Button>
                </Col>
                <Col md={6} className = 'text-center'>
                    <Button onClick = {this.nextButton} color = 'primary'> Next </Button>
                </Col>
            </Row>
            </Container>
            </div>
        )
    }
}

// const mapStateToProps = state =>{
//     return{
//       food: state.food
//     }
//   }

export default Name