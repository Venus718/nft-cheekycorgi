export const toReduced = (address, n=8) => address ? `${address.slice(0, n)}...${address.slice(-1 * n)}` : ''

export const isActiveAddress = (address) => (address != "0x0000000000000000000000000000000000000000") &&
  (address != "0x0000000000000000000000000000000000000001") &&
  (address != "0x000000000000000000000000000000000000dead") &&
  (address !="0x0000000000000000000000000000000000001004") &&
  (address !="0x0000000000000000000000000000000000000002")

export const isValidAddress = (address) => {
  return address && address.length === 42 && address.substring(0,2) === '0x'
}
