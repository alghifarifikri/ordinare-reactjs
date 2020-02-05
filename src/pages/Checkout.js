import React from 'react'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import { Link, Route } from 'react-router-dom'
import { Button, Container, Row, Card, CardTitle, CardText, Input, Nav, Col } from 'reactstrap'
import { APP_URL } from '../resource/config';

const token = Cookie.get('token')
let decode = ''
if (token) {
    decode = Jwt(token)
}

class Checkout extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            isFetchedDataItem: false,
            subtotal: 0
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
          this.setState({subtotal: data.checkout})

        }
      }

    
    render(){
        const id_user = decode.id
        const {isFetchedDataItem, data} = this.state
        return(
            <Container>
                <Row>
                  <Col className = "col md-7 mt-4">
                {isFetchedDataItem&&
                    data.data.map((v,i)=>(
                  <div key={v.id_item}>
                    <Card className="mb-3 shadow" body style = {{borderRadius : "40px"}}>
                      <div className="row">
                        <div className="col-md-2">
                          <img style={{width: '100px', height:'100px'}} src={APP_URL.concat(`storage/${v.image}`)} alt="imgDetailItem" />
                        </div>
                        <div className="col-md-5 ml-5">
                          <CardTitle style={{fontSize: '20px'}}><b>{v.name}</b></CardTitle>
                          <CardText style={{fontSize: '15px'}}>{v.name_resto}</CardText>
                          <CardText>
                            <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>Price : {value}</div>} />
                          </CardText>
                          <CardText>
                            Qty : {v.quantity}
                          </CardText>
                          <CardText>
                            <NumberFormat value={v.price * v.quantity} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>Total : {value}</div>} />
                          </CardText>
 
                        </div>
                      </div>
                    </Card>
                  </div>
                  ))}
                  </Col>
                  <Col md = {4} className="mt-4">
                  <div>
                        <Card body style = {{borderRadius : "40px"}} className = "shadow">
                            <CardTitle className = "text-center" style={{fontSize: '25px'}}><b> Payment</b></CardTitle>
                            <hr />
                            <CardText>
                              Price : <NumberFormat value={this.state.subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                            </CardText>
                            <Link to ={`/review/${id_user}`} className = "text-light text-center"><Button color = "primary" >Checkout</Button></Link>
                        </Card>
                    </div>
                  </Col>
                </Row>
            </Container>
        )
    }
}
export default Checkout