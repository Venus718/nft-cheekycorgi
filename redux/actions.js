export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_NETWORK = 'SET_NETWORK'
export const SET_BALANCE = 'SET_BALANCE'
export const SET_WALLET = 'SET_WALLET'
export const SET_ONBOARD = 'SET_ONBOARD'
export const SET_CONNECTED = 'SET_CONNECTED'

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
})

export const setNetwork = (network) => ({
  type: SET_NETWORK,
  payload: network
})

export const setBalance = (balance) => ({
  type: SET_BALANCE,
  payload: balance
})

export const setWallet = (wallet) => ({
  type: SET_WALLET,
  payload: wallet
})

export const setOnboard = (onboard) => ({
  type: SET_ONBOARD,
  payload: onboard
})

export const setConnected = (connected) => ({
  type: SET_CONNECTED,
  payload: connected
})
