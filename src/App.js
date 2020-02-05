import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/Header'

import Food from './pages/Food';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ApSurabaya from './pages/Restaurant/ApSurabaya';
import Haus from './pages/Restaurant/Haus';
import Bensu from './pages/Restaurant/Bensu';
import Tongtji from './pages/Restaurant/Tongtji';
import Warungss from './pages/Restaurant/Warungss';
import Checkout from './pages/Checkout';
import Review from './pages/Review';
import Details from './pages/Details';
import Sortprice from './pages/Sortprice';
import Name from './pages/Name';
import Chicken from './pages/Category/Chicken';
import Localdrinks from './pages/Category/Localdrinks';
import Thaitea from './pages/Category/Thaitea';
import Snack from './pages/Category/Snack';
import Vegetarian from './pages/Category/Vegetarian';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      navCollapsible : false
    }
  }
  render(){
    return(
      <Router>
        
        <div className = "fixed-top">
          <Header/>
        </div><br/><br/><br/><br/><br/>     

        <Switch>

              <Route path = '/' exact>
                <Home/>
              </Route>

              <Route path = '/Food' exact>
                <Food/>
              </Route>
              
              <Route path = '/ayam-penyet-surabaya' exact>
                <ApSurabaya/>
              </Route>

              <Route path = '/haus' exact>
                <Haus/>
              </Route>

              <Route path = '/geprek-bensu' exact>
                <Bensu/>
              </Route>

              <Route path = '/tongtji' exact>
                <Tongtji/>
              </Route>

              <Route path = '/warungss' exact>
                <Warungss/>
              </Route>

              <Route path = '/byprice' exact>
                <Sortprice/>
              </Route>

              <Route path = '/chickenfood' exact>
                <Chicken/>
              </Route>

              <Route path = '/localdrinks' exact>
                <Localdrinks/>
              </Route>

              <Route path = '/thaitea' exact>
                <Thaitea/>
              </Route>

              <Route path = '/snack' exact>
                <Snack/>
              </Route>

              <Route path = '/vegetarian' exact>
                <Vegetarian/>
              </Route>

              <Route path = '/name' exact>
                  <Name/>
              </Route>

              <Route path = '/details/:id' exact component = {Details}/>

              <Route path = '/cart/:id' exact component = {Cart}/>

              <Route path = '/checkout/:id' exact component = {Checkout}/>

              <Route path = '/review/:id' exact component = {Review}/>

              <Route path = '/profile/:id' exact component = {Profile}/>

        </Switch>     

      </Router>
    )
  }
}

export default App;
