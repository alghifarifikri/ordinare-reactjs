import {combineReducers} from 'redux'

import food from './Food'
import apsurabaya from './Restaurant/ApSurabaya'
import haus from './Restaurant/Haus'
import bensu from './Restaurant/Bensu'
import tongtji from './Restaurant/Tongtji'
import warungss from './Restaurant/Warungss'
import chickenfood from './Category/Chicken'
import localdrinks from './Category/Localdrinks'
import snack from './Category/Snack'
import thaitea from './Category/Thaitea'
import vegetarian from './Category/Vegetarian'
import sort from './Sortprice'
import details from './Details'
import review from './Review'
import carts from './Cart'
import suggest from './Suggest'

const appReducer = combineReducers({
  food, 
  apsurabaya, 
  haus, 
  bensu, 
  tongtji, 
  warungss, 
  sort, 
  details,
  chickenfood,
  localdrinks,
  thaitea,
  snack,
  vegetarian,
  carts,
  review,
  suggest
})

export default appReducer
