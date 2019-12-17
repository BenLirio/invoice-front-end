import { apiUrl } from '../config'
export const signUp = function (data) {
  console.log(data)
  return postRequest('sign-up', data)
}

export const signIn = function (data) {
  return postRequest('sign-in', data)
}

const postRequest = function(name, data) {
  return $.ajax({
    url: `${apiUrl}/${name}`,
    method: 'POST',
    data
  })
}