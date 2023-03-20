export const categoryId = (id) => {
  return !/^\d{3,9}$/.test(id) ? 'Must be 3-9 digits' : ''
}

export const has2Numbers = (str = '') => {
  const match = str.match(/(\d)/g)

  if (match && match[1]) {
    return true
  }

  return false
}

export const has2LowerCase = (str = '') => {
  const match = str.match(/([a-z])/g)

  if (match && match[1]) {
    return true
  }

  return false
}

export const has2UpperCase = (str = '') => {
  const match = str.match(/([A-Z])/g)

  if (match && match[1]) {
    return true
  }

  return false
}
