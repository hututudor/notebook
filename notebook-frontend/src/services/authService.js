import http from './httpService';
import config from './config';

http.setJwt(getJwt());

async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('jwt');
    return getUser(jwt);
  } catch (ex) {
    return null;
  }
}

async function getUser(jwt) {
  return http.get(config.url + '/user');
}

function getJwt() {
  return localStorage.getItem('jwt');
}

export default {
  getCurrentUser
};
