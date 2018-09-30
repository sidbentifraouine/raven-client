import { connect } from 'react-redux'
import { JOIN_ROOM_PENDING, SET_PINNED_SPEAKER } from '../../actions'
import Conference from './Conference'

const mapStateToProps = state => ({
  peers: state.peers.ids,
  pinnedSpeaker: state.peers.pinnedSpeaker,
  activeSpeaker: state.peers.activeSpeaker
})

const mapDispatchToProps = dispatch => ({
  joinRoom: roomId => dispatch({ type: JOIN_ROOM_PENDING, payload: { roomId } }),
  setPinnedSpeaker: id => dispatch({ type: SET_PINNED_SPEAKER, payload: { id } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Conference)
