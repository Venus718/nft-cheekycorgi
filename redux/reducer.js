import * as actions from './actions'

const defaultState = {
  connected: false,
  address: null,
  network: null,
  balance: null,
  wallet: null,
  onboard: null
}

export default function walletReducer(state = defaultState, action) {
  switch(action.type) {
    case actions.SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      }
    
    case actions.SET_NETWORK:
      return {
        ...state,
        network: action.payload
      }

    case actions.SET_BALANCE:
      return {
        ...state,
        balance: action.payload
      }

    case actions.SET_WALLET:
      return {
        ...state,
        wallet: action.payload
      }

    case actions.SET_ONBOARD:
      return {
        ...state,
        onboard: action.payload
      }

    case actions.SET_CONNECTED:
      return {
        ...state,
        connected: action.payload
      }
      
    default:
      return state;
  }
}
