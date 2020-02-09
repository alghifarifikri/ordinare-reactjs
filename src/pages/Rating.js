/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'
import StarRatings from 'react-star-ratings'
import {Row, Col, Container, Button, Card, Alert, Input} from 'reactstrap'
import { APP_URL } from '../resource/config'
import '../resource/style.css'
import { getSearchRating } from '../redux/action/SearchRating'
import { connect } from 'react-redux'

class Rating extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            name : '',
            isFetched : false,
            params: '',
            isLoading: false,
        }
    }
    
    async componentDidMount(){
        await this.props.dispatch(getSearchRating()) 
    }

    getItem = async () => {
        const params = this.state.params
        const url = await APP_URL.concat(`items/search?rating=${params}`)
        const {data} = await axios.get(url)
        this.setState({data, isFetched: true, isLoading: false})
    }

    // prevButton = async()=>{
    //         const url = this.state.data.Prev
    //         if(url){
    //             const {data} = await axios.get(url)
    //             this.setState({data})
    //         }
    // }

    // nextButton = async()=>{
    //     const url = this.state.data.Next
    //     if(url){
    //         const {data} = await axios.get(url)
    //         this.setState({data})
    //     }
    // }

    render(){
        const {isFetched, data, params} = this.state
        return(
            <div>
            <Container>
                <Row> 

                <Col md={3}>
                
                </Col>
                
                <Col md={6}>
                <Card color = 'light' style = {{borderRadius : "40px", padding:20}} className = "shadow">
                <Input type="text" value={params} onChange = {(e) => this.setState ({ params : e.target.value })} className = "m-2" className="form-control" placeholder="Find Here" />

                <Button color = "primary" onClick={this.getItem} className = "mt-2" style = {{width : '20%'}}>Search</Button>
                </Card>
                
                </Col>
                
                <Col md={3}>
                
                </Col>
                {
                    // !this.props.searchname.isLoading&&
                    // this.props.searchname.data.map
                    isFetched && data.data.map(v=>(
                        <Col md key = {v.id_item} className = 'mt-5'>
                        <Link to = {`/details/${v.id_item}`} className = 'text-light'>
                        <Card color = 'light' style = {{borderRadius : "40px"}} className = "shadow">
                            {console.log(v.id_item)}
                            <div className = 'text-center text-dark mt-1' ><b>{v.name}</b></div><br/>
                            <div className = 'text-center'> <img src={APP_URL.concat(`storage/${v.image}`)} alt = {v.name}
                            style = {{width : "150px", height : "150px"}}/> </div> <br/>  
                            <div className = 'text-center'>
                                <StarRatings rating = {v.rating} starRatedColor="yellow" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                            </div>                       
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>Price : Rp. {v.price}</div>
                            <div className = 'text-center text-dark' style = {{fontSize : '12px'}}><b>{v.name_resto}</b></div>
                            <div className = 'text-center text-dark' style = {{fontSize : '10px', marginLeft: 5, marginRight: 5}}>{v.descriptions}</div><br/>
                            
                        </Card>
                        </Link> 
                        </Col>)
                    )
                }
                
                </Row>
            {/* <Row className = 'mt-5 mb-5'>
                <Col md={6} className = 'text-center'>
                    <Button onClick = {this.prevButton} color = 'primary'> Prev </Button>
                </Col>
                <Col md={6} className = 'text-center'>
                    <Button onClick = {this.nextButton} color = 'primary'> Next </Button>
                </Col>
            </Row> */}
            </Container>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
      searchrating: state.searchrating
    }
  }

export default connect (mapStateToProps) (Rating)