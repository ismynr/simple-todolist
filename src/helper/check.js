const notNull = (value) => {
  return value !== '' && value !== null && value !== undefined
}

module.exports = notNull