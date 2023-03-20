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
  [NOTIFICATION_STATUS.SUCCESS]: 'Congratulation!',
  [NOTIFICATION_STATUS.WARNING]: 'Something went wrong!'
}

export const NOTIFICATION = {
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
  PASSWORD_UPDATE_SUCCESS: 'Password updated successfully',
  LOCALZONE_UPDATE_SUCCESS: 'LocalZone updated successfully',
  LOCALZONE_CREATE_SUCCESS: 'LocalZone created successfully',
  LOCALZONE_CATALOGUE_CREATE_SUCCESS:
    'LocalZone catalogue created successfully',
  SYNC_CATALOGUE_SUCCESS: 'Categories synced with main catalogue successfully',
  CATEGORIES_UPDATE_SUCCESS: 'Categories updated successfully',
  CATEGORY_UPDATE_SUCCESS: 'Category updated successfully',
  CATEGORY_CREATE_SUCCESS: 'Category created successfully',
  SCREENSAVER_UPLOAD_SUCCESS: 'Screensaver uploaded successfully',
  SCREENSAVER_REMOVE_SUCCESS: 'Screensaver removed successfully',
  PAYMENT_SUCCESS: 'Payment was successful',
  CARD_ADD_SUCCESS: 'Card added successfully',
  PAYPAL_ADD_SUCCESS: 'PayPal account added successfully',
  PAYMENT_ACCOUNT_REMOVE_SUCCESS: 'Payment account removed successfully',
  PAYMENT_CHANGE_SUCCESS: 'Payment changed successfully',
  COMPANY_UPDATE_SUCCESS: 'Company updated successfully',
  COMPANY_LOGO_UPDATE_SUCCESS: 'Company logo updated successfully',
  IMPORT_DATA_SUCCESS: 'Data imported successfully',
  SUPPLIER_CREATE_SUCCESS: 'Supplier invited successfully',
  STORE_INVITE_SUCCESS: 'Store invited successfully',
  STORE_CREATE_SUCCESS: 'Store created successfully',
  STORE_UPDATE_SUCCESS: 'Store updated successfully',
  SHOP_ADD_SUCCESS: 'Shops added successfully',
  EMPLOYEE_INVITE_SUCCESS: 'Employee created successfully',
  PARTNER_INVITATION_SUCCESS: 'Partner invited successfully'
}
