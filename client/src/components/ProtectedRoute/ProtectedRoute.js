import React from 'react'
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import authToken from '../login/authToken';





function ProtectedRoute({component: Component, ...restProps}) {
const authData = authToken();  

if(authData.token){
    return <Route {...restProps} component={Component}/>
}else{
    return <Redirect to='/' />
}
}

export default ProtectedRoute