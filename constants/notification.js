import { get } from 'lodash'

const sendNotification = (dispatch, message, type) => {
  return dispatch(
    'notification/addNotification',
    {
      type,
      message
    },
    { root: true }
  )
}

export const sendSuccessNotification = (dispatch, message) => {
  if (message) {
    sendNotification(dispatch, message, NOTIFICATION_STATUS.SUCCESS)
  }
}

export const sendWarningNotification = (dispatch, message) => {
  if (message) {
    sendNotification(dispatch, message, NOTIFICATION_STATUS.WARNING)
  }
}

export const sendWarningNotificationThrowError = (dispatch, e) => {
  const { message } = get(e, 'response.data')
  sendWarningNotification(dispatch, message)
  throw e
}

export const NOTIFICATION_STATUS = {
  SUCCESS: 'success',
  WARNING: 'warning'
}

export const NOTIFICATION_TYPE = {
  [NOTIFICATION_STATUS.SUCCESS]: 'Дякуэмо!',
  [NOTIFICATION_STATUS.WARNING]: 'Щось не так!'
}

export const NOTIFICATION = {

}
