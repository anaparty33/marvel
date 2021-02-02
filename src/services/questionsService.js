export const required = (result, column) => {
  let value = result[column];
  if (value === undefined || value === null || value === '') {
    return [false, 'this field cannot be empty']
  } else {
    return true
  }
}