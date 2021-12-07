import axios from 'axios'

export const getGasPrice = async () => {
  try {
    let {data} = await axios.get('http://ethgas.watch/api/gas')
    return `${data.normal.gwei}`
  } catch(e) {
    
  }
  
  return "70"
}

