import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import {Row, Col, Container, Button, Card, Alert} from 'reactstrap'
import { APP_URL } from '../resource/config'
import '../resource/style.css'
import { getFood, getNext } from '../redux/action/Food'
import { connect } from 'react-redux'

class Food extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            isFetched : false,
            isLoading: true,
        }
    }
    async componentDidMount(){
       await  this.props.dispatch(getFood())
        await this.setState({isLoading: false})
    }

    prevButton = async()=>{
        const url = this.props.food.data.Prev
        if(url){
            this.props.dispatch(getNext(url))
        }
    } 

    nextButton = async()=>{
        const url = this.props.food.data.Next
        console.log(url)
        if(url){
            this.props.dispatch(getNext(url))
        }
    }

    render(){
        // const {isFetched, data} = this.state
        return(
            
            <Container>
                <Row> 
                {
                    // isFetched&&data.data.map
                    !this.state.isLoading &&
                    this.props.food.data.map(v=>(
                        <Col md key = {v.id_item} className = 'mt-5'>
                        <Link to = {`/details/${v.id_item}`} className = 'text-light'>
                        <Card color = 'light' style = {{borderRadius : "40px"}} className = "shadow">
                            <div className = 'text-center text-dark mt-1' ><b>{v.name}</b></div><br/>
                            <div className = 'text-center'> <img src={APP_URL.concat(`storage/${v.image}`)} alt = {v.name}
                            style = {{width : "150px", height : "150px"}}/> </div>       
                            <div className = 'text-center'>
                                <StarRatings rating = {v.rating} starRatedColor="yellow" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                            </div>     
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>Price : Rp. {v.price}</div>
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}><b>{v.name_resto}</b></div>
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>{v.descriptions}</div><br/>
                            
                        </Card>
                        </Link> 
                        </Col>)
                    )
                }
                
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
        )
    }
}

const mapStateToProps = state =>{
    return{
      food: state.food
    }
  }

export default connect (mapStateToProps) (Food)