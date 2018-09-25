import { combineReducers } from 'redux'
import { peers } from './peers'
import { actionsBar } from './actionBar'
import { toolbar } from './toolbar'

export default combineReducers({
  peers,
  actionsBar,
  toolbar
})
