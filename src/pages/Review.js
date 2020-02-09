import React from 'react'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import { Link, Route } from 'react-router-dom'
import { Button, Container, Row, Card, CardTitle, CardText, Input, Nav, Col, Label } from 'reactstrap'
import { APP_URL } from '../resource/config';
import StarRatings from 'react-star-ratings'

const token = Cookie.get('token')
let decode = ''
if (token) {
    decode = Jwt(token)
}

class Review extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            isFetchedDataItem: false,
            rating : 0,
            review : [],
            id_item : 0
        }
    }
    async componentDidMount(){
        const {id} = this.props.match.params
        if(id == decode.id){
          const url = APP_URL.concat(`user/cart/${id}`)
          const item = await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
          })
          const {data} = item
          this.setState({data, isFetchedDataItem:!this.state.isFetchedDataItem})
          // this.setState({subtotal: data.checkout})
          console.log(data)

        }
      }

      addReview = async (id_item) =>{
        const id_user = decode.id
        const url = APP_URL.concat(`user/inputreview`)
        const result =await Axios.post(url, {
            rating : this.state.rating,
            review : this.state.review,
            id_user : id_user,
            id_item : id_item            
        },
        {headers: {
            Authorization: 'Bearer ' + token}})
            alert('success')
            window.location.reload()
      } 

      changeRating = (newRating) => {
        this.setState({
          rating: newRating
        });
      }
    
    render(){
        const id_user = decode.id
        const {isFetchedDataItem, data, review, rating, id_item} = this.state
        return(
            <Container>
                <Row>
                  <Col className = "col md-7 mt-4">
                {isFetchedDataItem&&
                    data.data.map((v,i)=>(
                  <div key = {v.id_item}> 
                    <Card className="mb-3 shadow" body style = {{borderRadius : "40px"}}>
                      <div className="row">
                        <div className="col-md-2">
                          <img style={{width: '200px', height:'200px'}} src={APP_URL.concat(`storage/${v.image}`)} alt="imgDetailItem" />
                        </div>
                        <div className="col-md-5 ml-5">
                          <CardTitle style={{fontSize: '20px'}}><b>{v.name}</b></CardTitle>
                          <CardText style={{fontSize: '15px'}}>{v.name_resto}</CardText>
                          {/* <Label for="exampleSelect">Rating</Label>
                            <Input type="select" name="select" value = {i.rating} onChange = {(e) => this.setState ({ rating : e.target.value })}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input> */}
                            <StarRatings
                                rating={this.state.rating}
                                starRatedColor="yellow"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                                starDimension="40px"
                                starSpacing="2px"
                              /><br/>
                            <Label for="exampleText">Review</Label>
                                <Input type="textarea" name="text" value = {i.review} onChange = {(e) => this.setState ({ review : e.target.value })} /><br/>
                            
                            <Button color = "primary" onClick =  {() => this.addReview(v.id_item)}>Submit</Button>
 
                        </div>
                      </div>
                    </Card>
                  </div>
                  ))}
                  </Col>
                </Row>
            </Container>
        )
    }
}
export default Review