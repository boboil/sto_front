import moment from 'moment'
import {
  AUTH_ROUTES,
} from '@/constants'

export const convertDateToFormat = (
  date = new Date(),
  format = 'mm/dd/yyyy',
  separator = '/'
) => {
  const dt = date.toISOString().split('T')[0]
  const [yyyy, mm, dd] = dt.split('-')
  const params = {dd, mm, yyyy}

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

export const dividedActList = (list, param) => {
  return list.reduce((acc, item) => {
    const divider = item[param]
    if (!acc[divider]) {
      acc[divider] = []
    }
    acc[divider].push(item)
    return acc
  }, {});
}

export const formatDate = date => moment(date).format('DD-MM-YYYY');

export const formatDateForDiagnostic = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}


export const handleDelivery = (deliveryStatus) => {
  let delivery
  let isButtonShown = false
  switch (deliveryStatus) {
    case 'Все_замовити':
      delivery = 'Вже погоджено клієнтом'
      break
    case 'На_погодженні':
      delivery = 'Натисніть для підтвердження замовлення'
      isButtonShown = true
      break;
    case 'ОПРАЦЬОВАНО_СКЛАДОМ':
    case 'Процінити':
      delivery = 'Опрацьовуємо, трішки зачекайте'
      break
    case 'Очікуємо_на_склад':
    case 'Частково_замовити':
      delivery = 'Вже погоджено клієнтом'
      break
    case '':
    case null:
      delivery = 'Опрацьовуємо, трішки зачекайте'
      break
    case 'Відмовлено_клієнтом':
      delivery = 'Скасовано клієнтом'
      isButtonShown = true
      break
  }
  return {delivery, isButtonShown}
}
