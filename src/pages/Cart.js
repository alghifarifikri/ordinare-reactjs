import React from 'react'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import { Link, Route } from 'react-router-dom'
import { Button, Container, Row, Card, CardTitle, CardText, Input, Nav, Col } from 'reactstrap'
import { APP_URL } from '../resource/config';
import { getCarts } from '../redux/action/Cart'
import { connect } from 'react-redux'

const token = Cookie.get('token')
let decode = ''
if (token) {
    decode = Jwt(token)
}

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            id_item : null,
            isFetchedDataItem: false,
            subtotal: 0
        }
    }
    async componentDidMount(){
        const {id} = this.props.match.params
        if(id == decode.id){
          this.props.dispatch(getCarts(id))
          const url = APP_URL.concat(`user/cart/${id}`)
          const item = await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
          })
          const {data} = item
          this.setState({data, isFetchedDataItem:!this.state.isFetchedDataItem})
          this.setState({subtotal: data.checkout})
          this.setState({quantity: data.data.map( v=>(v.quantity))})
          this.setState({subtotal: data.subtotal})
        }
      }

    buttonPlus = async(i)=>{
      const {id} = this.props.match.params
        const data = this.state.data.data
        const item = data.filter(v=>{
          if(v.id_item === i){
            v.quantity += 1
            const url = APP_URL.concat(`user/cart/update/${id}/${v.id_item}`)
            Axios.put(url, {
              quantity : v.quantity
            })
          }
          return v
        })
      this.setState({item})
      var subtotal = 0
      data.filter(v=>{
          var total1 = v.price * v.quantity
          subtotal += total1;
      })
      this.setState({subtotal: subtotal})
      
    }

    buttonMin = (i)=>{
      const {id} = this.props.match.params
      const data = this.state.data.data
        const item = data.filter(v=>{
          if(v.id_item === i){
            v.quantity -= 1
            const url = APP_URL.concat(`user/cart/update/${id}/${v.id_item}`)
            Axios.put(url, {
              quantity : v.quantity
            })
          }
          return v
        })
      this.setState({item})
      var subtotal = 0
      data.filter(v=>{
          var total1 = v.price * v.quantity
          subtotal += total1;
      })
      this.setState({subtotal: subtotal})
    }

    deleteCart = async (id) =>{
        const id_user = decode.id
        const url = APP_URL.concat(`user/deleteitem`)
        await Axios.delete(url,{ data: { id_item: id, id_user : id_user }})
        this.setState({isFetchedDataItem: false})
        this.componentDidMount();
        alert('Delete this item ?')
      }

    handleChange = (event,i)=>{
        this.setState({quantity: event.target.quantity[i]})
    }
    render(){
        const id_user = decode.id
        const {isFetchedDataItem, data} = this.state
        return(
            <Container>
                <Row>
                  <Col className = "col md-7 mt-4">
                {
                    // !this.props.carts.isLoading&&
                  // this.props.carts.data.map
                   isFetchedDataItem&&
                  data.data.map((v,i)=>(
                  <div key={v.id_item}>
                    <Card className="mb-3 shadow" body style = {{borderRadius : "40px"}}>
                      <div className="row">
                        <div className="col-md-2">
                          <img style={{width: '150px', height:'150px'}} src={APP_URL.concat(`storage/${v.image}`)} alt="imgDetailItem" />
                        </div>
                        <div className="col-md-5 ml-5">
                          <CardTitle style={{fontSize: '20px'}}><b>{v.name}</b></CardTitle>
                          <CardText style={{fontSize: '15px'}}>{v.name_resto}</CardText>
                          <CardText>
                              Rating : {v.rating}
                          </CardText>
                          <CardText>
                            <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>Price : {value}</div>} />
                          </CardText><CardText>
                            <NumberFormat value={v.price * v.quantity} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>Total : {value}</div>} />
                          </CardText>
                          {/* <CardText>{v.description}</CardText> */}
                        </div>
                        <div className="cold-md-5 ml-5">
                          <div className="text-center mb-4 mt-4">
                                <span className="text-center"><br/></span>
                          </div>
                        <Nav style={{width: '100%'}}>
                            <div className="cold-md-5">
                            <Link to = '#' onClick = {()=>this.deleteCart(v.id_item)} className = "fa fa-trash" style = {{ color : 'grey', fontSize : '25px' }}></Link>&nbsp;
                              <Button
                                color = 'primary' onClick={()=>this.buttonMin(v.id_item)}
                                disabled={v.quantity<=1?true:false}><b>-</b>
                              </Button>
                            </div>
                            <div key={v.id_item.toString} className="cold-md-2">
                              <Input style={{width: '80px',textAlign: 'center'}} onChange={this.handleChange[v.id_item]} value={v.quantity}></Input>
                            </div>
                            <div className="cold-md-5">
                              <Button color = 'primary' onClick={()=>this.buttonPlus(v.id_item, v.quantity, v.price)}><b>+</b></Button>
                            </div>
                        </Nav>
                        <div className = "text-center" style = {{ width : '100%', fontSize : '25px'}}>
                          {/* <Link to = '#' onClick = {()=>this.deleteCart(v.id_item)} className = "fa fa-trash" style = {{ color : 'grey  ' }}></Link> */}
                        </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  ))}
                  </Col>
                  <Col md = {4} className="mt-4">
                  <div>
                        <Card body style = {{borderRadius : "40px"}} className = "shadow">
                            <CardTitle className = "text-center" style={{fontSize: '25px'}}><b> Total Bill </b></CardTitle>
                            <hr />
                            <CardText>
                              Price : <NumberFormat value={this.state.subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                            </CardText>
                            <Link to ={`/checkout/${id_user}`} className = "text-light text-center"><Button color = "primary" >Pay</Button></Link>
                            {/* <Route path = '/checkout' exact>
                            </Route> */}
                        </Card>
                    </div>
                  </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state =>{
  return{
    carts: state.carts
  }
}

export default connect (mapStateToProps) (Cart)