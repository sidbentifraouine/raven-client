import { combineReducers } from 'redux'
import { peers } from './peers'
import { actionsBar } from './actionBar'

export default combineReducers({
  peers,
  actionsBar
})
