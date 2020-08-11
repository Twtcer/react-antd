//存放授权相关的方法 

function getToken() {
   return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function isLogined() { 
    if (localStorage.getItem('token')) {
        return true;
    }
    else
        return false;
}

export {
    isLogined,
    setToken,
}
