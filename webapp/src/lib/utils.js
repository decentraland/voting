import { MESSAGE } from './constants'
/*-------------------  Browser  ---------------------*/
export function isChrome() {
  // please note,
  // that IE11 now returns undefined again for window.chrome
  // and new Opera 30 outputs true for window.chrome
  // and new IE Edge outputs to true now for window.chrome
  // and if not iOS Chrome check
  // so use the below updated condition
  const isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf('OPR') > -1,
    isIEedge = winNav.userAgent.indexOf('Edge') > -1,
    isIOSChrome = winNav.userAgent.match('CriOS')

  if (isIOSChrome) {
    return false
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true
  } else {
    return false
  }
}

/*-------------------  Message  ---------------------*/
export function generateMessage (sequence, address, vote) {
  return MESSAGE
  .replace('{sequence}', sequence)
  .replace('{address}', address)
  .replace('{vote}', vote)
  .replace('{date}', new Date())
}
