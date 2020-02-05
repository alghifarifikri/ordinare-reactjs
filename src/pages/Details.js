/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { Container, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  Button, 
  CardHeader,
  Nav,
  Col,
  Row,
  Alert} from 'reactstrap';
import { Link } from 'react-router-dom'
import {APP_URL} from '../resource/config' 
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import StartRatings from 'react-star-ratings'
import { getDetails } from '../redux/action/Details';
import { getReview } from '../redux/action/Review'
import { getSuggest } from '../redux/action/Suggest'
import { connect } from 'react-redux';

const token = Cookie.get('token')

let decode = ''
if(token) {
  decode = Jwt(token)
}

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // data: null,
      // data1: null,
      // Suggest : null,
      isFetchedDataItem: false,
      quantity : 1,
      // dataItem : null,
      paramsId_item : null,
      isLoading : true,
      id : decode.id,
    }
  }
  
  async componentDidMount(){
    const {id} = this.props.match.params
    this.props.dispatch(getDetails(id))
    this.props.dispatch(getReview(id))
    this.props.dispatch(getSuggest(id))

   
    
    // const url = APP_URL.concat(`items/details/${id}`)
    // const item = await axios.get(url)
    // const {Suggest, data} = item

    // const review = APP_URL.concat(`items/review/${id}`)
    // const comment = await axios.get(review)
    // const data1 = comment.data
    
    this.setState(
        {isFetchedDataItem:true, paramsId_item : id})
    
  }

  addCart = async () =>{
    const id_user = decode.id
    const {id} = this.props.match.params
    const url = APP_URL.concat(`user/selectitem`)
    await axios.post(url, {
        id_user : id_user,
        id_item : id,
        quantity : this.state.quantity
    },
    {headers: {
      Authorization: 'Bearer ' + token}})
  }

  beforeLogin = async () => {
    alert('You Must Be Login First !')
  }

  buttonClickedPlus = ()=> {
    this.setState({quantity: this.state.quantity + 1})
  }

  buttonClickedMin = ()=> {
    this.setState({quantity: this.state.quantity - 1})
  }

  render() {
    const id_user = decode.id
    const {isFetchedDataItem, data, data1, Suggest, paramsId_item } = this.state
    if (paramsId_item != this.props.match.params.id && paramsId_item != null){
        this.componentDidMount()
    }

    return (
      <Container className="p-0">
      {
      // isFetchedDataItem&& 
      // !this.state.isLoading&&
      this.props.details.data.map((v, i)=>(
        <div className="row" key = {i}>
            <div className="col-md-7">
              <Card className="mb-3 shadow" body style = {{borderRadius : "40px"}}>
                <div className="row">
                  <div className="col-md-3">
                    <img src={APP_URL.concat(`storage/${v.image}`)} className="imgDetailItem" 
                    width = "300px" height = "300px"/>
                  </div>
                  <div align = 'right' className="col-md-8 ml-5">
                    <CardTitle style = {{fontSize : "30px"}}><b><i>{v.name}</i></b></CardTitle>
                    <CardText><i>Category : {v.category}</i> </CardText>
                    <CardText><b>From : {v.name_resto}</b></CardText>
                    <CardText>{v.descriptions}</CardText>

                    <CardText>
                      <StartRatings rating = {v.rating} starRatedColor="yellow" numberOfStars={5} starDimension = "25px" starSpacing = "1px"/>
                    </CardText>
                    
                    <CardText><small className = "text-muted"><i>Price : Rp. {v.price}</i></small></CardText>
                  </div>
                </div>
              </Card>
            </div>
            <div className = 'col-md-4'>
                    <Card style = {{borderRadius : "40px"}} className = "shadows"><br/>
                        <CardTitle className = "text-center"><b> Select Quantity </b></CardTitle>
                        <Nav style = {{width : "100%"}}>

                                    <div className = "col-md-2">
                                    <Button color = "primary" onClick={this.buttonClickedMin}
                                    disabled = {this.state.quantity <= 1 ?true : false}> - </Button>
                                    </div>
                                    <div className = "col-md-8">
                                     <input type="text" className="form-control text-center" value = {this.state.quantity}/>
                                     </div>
                                     <div className = "col-md-2"> 
                                     {token ? 
                                    <Button color = "primary" onClick={this.buttonClickedPlus}> + </Button>
                                     : <Button color = "primary" onClick={this.beforeLogin}> + </Button> }
                                    </div>
                                  
                            </Nav>
        
                            {token?
                              <Link to = {`../cart/${id_user}`} className = 'text-light text-center' > <Button color = "primary" className = "m-2" onClick = {this.addCart}> 
                              Add to Cart</Button></Link> 
                            :
                            <Link to = {'#'} className = 'text-light text-center' > <Button color = "danger" className = "m-2" onClick = {this.beforeLogin}> 
                              Add to Cart</Button></Link>  }
                     </Card>
              </div>


          </div>

      ))
      
          
      }
        {
          // isFetchedDataItem&&
          // data1.data.map
          // !this.state.isLoading&&
          this.props.review.data.map((v, i)=>(
            
            <div className="row" key = {i}>
            <div className="col-md-12">
              <Card className=" mb-3 shadow" style = {{borderRadius : "40px"}}>
                <CardHeader><b><h6>{v.username}</h6></b></CardHeader>
                <CardBody>
                <CardText>
                      <StartRatings rating = {v.rating} starRatedColor="yellow" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                    </CardText>
                    <CardText md key = {v.id_item}>{v.review}</CardText>  
                </CardBody>
                
              </Card>
            </div>
          </div>
        )
            )
          
  }
  
  <Row>
          {
            // isFetchedDataItem&&
            // data.Suggest.map
             !this.props.suggest.isLoading&&
             this.props.suggest.data.map(v=>(
                    <Col md key = {v.id_item} className = 'mt-5'>
                        
                        <Card  color = 'light' style = {{borderRadius : "40px"}} className = "shadow">
                        <div className = 'text-center'><b>{v.name}</b></div><br/>
                        <div className = 'text-center'> <img src={APP_URL.concat(`storage/${v.image}`)} alt = {v.name}
                        style = {{width : "150px", height : "150px"}}/> </div> 
                          <CardText className = 'text-center'>
                      <StartRatings rating = {v.rating} starRatedColor="yellow" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                    </CardText>                       
                        <div className = 'text-center'>Price : Rp. {v.price}</div>
                        <div className = 'text-center'>{v.name_resto}</div>
                        <div className = 'text-center' style = {{fontSize : "12px"}}>{v.descriptions}</div><br/>
                        <Container>
                            <Button color = "primary" className = "float-left mb-2 ml-2" > 
                            <Link to = {`/details/${v.id_item}`} className = 'text-light'> Detail </Link> 
                            </Button>
                        </Container>
                        </Card>

                    </Col>)
                    )
                }
       </Row> 
      
      </Container>
    )
  }
}

const mapStateToProps = state =>{
  return{
    details : state.details,
    review : state.review,
    suggest  : state.suggest
  }
}


export default connect (mapStateToProps) (Details)
// export default Details