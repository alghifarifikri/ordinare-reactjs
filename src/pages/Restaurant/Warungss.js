import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Row, Col, Container, Button, Card} from 'reactstrap'
import { APP_URL } from '../../resource/config'
import { connect } from 'react-redux'
import { getWarung } from '../../redux/action/Restaurant/Warungss'

class Warungss extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            isFetched : false
        }
    }
    async componentDidMount(){
        
        this.props.dispatch(getWarung())
        // const {data} = await axios.get(APP_URL.concat('items/page?page=1&limits=5'))
        // this.setState({data, isFetched:!this.state.isFetched})
    }

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
        // const {isFetched, data} = this.state
        return(
            
            <Container>
                <Row> 
                {
                    // isFetched&&data.data.map
                    !this.props.warungss.isLoading&&
                    this.props.warungss.data.map(v=>(
                    <Col md key = {v.id_item} className = 'mt-5'>
                        <Link to = {`/details/${v.id_item}`} className = 'text-light'>
                        <Card color = 'light' style = {{borderRadius : "40px"}} className = "shadow">
                        <div className = 'text-center text-dark mt-1' ><b>{v.name}</b></div><br/>
                        <div className = 'text-center'> <img src={APP_URL.concat(`storage/${v.image}`)} alt = {v.name}
                        style = {{width : "150px", height : "150px"}}/> </div> <br/>                       
                        <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>Price : Rp. {v.price}</div>
                        {/* <div className = 'text-center' style = {{fontSize : '12px'}}>{v.name_resto}</div> */}
                        <div className = 'text-center text-dark' style = {{fontSize : '12px'}}>{v.descriptions}</div><br/>
                        {/* <Container>
                            <Button color = "primary" className = "float-left mb-3 ml-2" > 
                             Detail 
                            </Button>
                        </Container> */}
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
        warungss: state.warungss
    }
  }

export default connect (mapStateToProps) (Warungss)