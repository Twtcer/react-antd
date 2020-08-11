import { post } from '../utils/request';


export function login(user) {
   return post('/api/v1/auth/manager_login', user);
}