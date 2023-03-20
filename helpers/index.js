import { get } from 'lodash'
import {
  AUTH_ROUTES,
} from '@/constants'

export const asyncTimeout = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const convertDateToFormat = (
  date = new Date(),
  format = 'mm/dd/yyyy',
  separator = '/'
) => {
  const dt = date.toISOString().split('T')[0]
  const [yyyy, mm, dd] = dt.split('-')
  const params = { dd, mm, yyyy }

  return format
    .split(separator)
    .reduce((res, key) => (params[key] ? [...res, params[key]] : res), [])
    .join(separator)
}

export const convertDateTimeToFormat = (
  date = new Date(),
  format = 'h:m mm/dd/yyyy'
) => {
  const [dt, tm] = date.toISOString().split('T')
  const [yyyy, mm, dd] = dt.split('-')
  const [h, m] = tm.split(':')

  return `${h}:${m} ${mm}/${dd}/${yyyy}`
}

export const convertDateTimeAmPmToFormat = (
  date = new Date(),
  isHtml = '',
  format = 'h:m mm/dd/yyyy'
) => {
  const space = isHtml === 'html' ? '&nbsp' : ' '
  const [dt, tm] = date.toISOString().split('T')
  const [yyyy, mm, dd] = dt.split('-')
  const [h, m] = tm.split(':')
  const ampm = h >= 12 ? 'pm' : 'am'
  let hours = h % 12
  hours = hours || 12 // the hour '0' should be '12'

  return `${mm}/${dd}/${yyyy} ${hours}:${m}${space}${ampm}`
}
export const genRandomUID = (prefix = 'UID', len = 7) => {
  return `${prefix}_${Math.random()
    .toString(36)
    .substr(2, len > 2 ? len : 5)
    .toUpperCase()}`
}
export const signOut = () => {
  window.location.href = AUTH_ROUTES.SIGN_OUT
}

export const assetIcon = (src, ext = 'svg') => {
  try {
    return require(`@/assets/icons/${src}.${ext}?raw`)
  } catch {
    return ''
  }
}
export const assetImage = (src, ext = 'svg') => {
  try {
    return require(`@/assets/img/${src}.${ext}?raw`)
  } catch {
    return ''
  }
}
export const reversedKeys = (actsList) => {
  return Object.keys(actsList).reverse();
}
