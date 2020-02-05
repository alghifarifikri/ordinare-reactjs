import React from 'react'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Row } from 'reactstrap'
import { Login, Logout } from './ModalsLogin'
import Register from './ModalsRegister'
import { Link } from 'react-router-dom'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'

const token = Cookie.get('token')
let decode = ''
if (token) {
  decode = Jwt(token)
}

class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isOpen : false,
      ShowModalLogin : false,
      ShowModalRegister : false,
      ShowModalLogout : false,
      id : decode.id,
      search : ''
      }
    }

    toggle = () => {
      this.setState({
        isOpen : !this.state.isOpen
      })
    }

    toggleModalLogin = () => {
      this.setState({
        ShowModalLogin : !this.state.ShowModalLogin
      })
    }

    toggleModalRegister = () => {
      this.setState({
        ShowModalRegister : !this.state.ShowModalRegister
      })
    }

    toggleModalLogout = () => {
      this.setState({
        ShowModalLogout : !this.state.ShowModalLogout
      })
    }

    render(){
          const id = decode.id
          const {isOpen, ShowModalLogin, ShowModalRegister, ShowModalLogout} = this.state
    return(
      <Container-fluid>
          <div style = {{backgroundColor : "white"}}>
      
            <Navbar  light expand="md" className="  shadow">
              <NavbarBrand style = {{color : "blue"}}><b><i>Ordinare</i></b></NavbarBrand>
              
            <NavbarToggler color = "success" onClick={this.toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto mb-2" navbar>
      
                </Nav>
      
              {!token?
                          <Row className = "mr-2">  
                                <div>
                                  <Login 
                                    ShowModalLogin = {ShowModalLogin} toggle = {this.toggleModalLogin}/>
                                  </div>&nbsp;

                                  <div>
                                  <Register 
                                  ShowModalRegister = {ShowModalRegister} toggle = {this.toggleModalRegister}/>
                                </div>
                          </Row>
                          :
                            <Row>
                                <div>
                                    <Link to = {`/profile/${id}`}>
                                        <span style={{fontSize: '20px'}} className = "fa fa-user">
                                            &nbsp;Profile&nbsp;
                                        </span>
                                </Link>
                                </div>&nbsp;
                                <div className = 'mr-3'>
                                        <Logout
                                            ShowModalLogout = {ShowModalLogout}
                                            toggle={this.toggleModalLogout}
                                        />
                                </div>
                            </Row>
                            }
      
              </Collapse> 
            </Navbar>
          </div>
            
                  
          <div style = {{backgroundColor : "#007BFF", height : "50%"}}> 
            <Nav>
                  <NavItem>
                      <Link to ="/" className = "nav-link text-light">Home</Link>
                  </NavItem>
      
                  <NavItem>
                      <Link to ="/Food" className = "nav-link text-light">All Food</Link>
                  </NavItem>
                  
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className = "text-light">
                              Our Partners
                    </DropdownToggle>
                    <DropdownMenu left = "true">
      
                      <DropdownItem>
                          <NavItem>
                              <Link className = "nav-link" to ="/ayam-penyet-surabaya">Ayam Penyet Surabaya</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/haus">HAUS!</Link>
                          </NavItem>
                      </DropdownItem>
                      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/geprek-bensu">Geprek Bensu</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/tongtji">Tong Tji</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/warungss">Waroeng Spesial Sambal</Link>
                          </NavItem>
                      </DropdownItem>
                      
                      <DropdownItem divider />
                      <DropdownItem>
                      <NavItem>
                              <Link className = "nav-link" to ="/byprice">Sort by Price</Link>
                          </NavItem>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className = "text-light">
                              Category
                    </DropdownToggle>
                    <DropdownMenu left = "true">
      
                      <DropdownItem>
                          <NavItem>
                              <Link className = "nav-link" to ="/chickenfood">Chicken Food</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/localdrinks">Local Drinks</Link>
                          </NavItem>
                      </DropdownItem>
                      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/thaitea">Thai Tea</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/snack">Snack</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/vegetarian">Vegetarian</Link>
                          </NavItem>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className = "text-light">
                              Find Here
                    </DropdownToggle>
                    <DropdownMenu left = "true">
      
                      <DropdownItem>
                          <NavItem>
                              <Link className = "nav-link" to ="/name">Search Name</Link>
                          </NavItem>
                      </DropdownItem>
      
                      <DropdownItem>
                        <NavItem>
                              <Link className = "nav-link" to ="/haus">Search Price</Link>
                          </NavItem>
                      </DropdownItem>

                    </DropdownMenu>
                  </UncontrolledDropdown>
                  
                  {/* <NavItem style = {{width : "10%"}}>
                        <input type="username" className="form-control mt-1 mb-1" placeholder="Search here ..."/>
                  </NavItem>
                  <NavItem>
                        <Button className = "mt-1 mb-1">Search</Button>
                  </NavItem> */}
                  <NavItem>
                      <Link to ={`/cart/${id}`} className = "nav-link text-light fa fa-shopping-cart mt-1"></Link>
                  </NavItem>
            </Nav>
          </div>
          </Container-fluid>
    )
          
        }

      }
      export default Header