import React from 'react'






const authToken = () => {
  
    const Token={
      token: JSON.parse(localStorage.getItem('token')),
      role: JSON.parse(localStorage.getItem('role'))
  }
return Token
  
}

export default authToken