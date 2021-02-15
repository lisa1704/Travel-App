import React, { useState } from 'react'

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = (props) => {
    const [CurrentUser, setCurrentUser] = useState({})
    const [updateEmail, setUpdateEmail] = useState({})
    const [isLoggedin, setisLoggedin] = useState(false)


    return (
        <AuthContext.Provider value={{
            CurrentUser: CurrentUser,
            setCurrentUser: setCurrentUser,
            setisLoggedin: setisLoggedin,
            isLoggedin: isLoggedin,
            updateEmail: updateEmail,
        }}>
            {props.children}
        </AuthContext.Provider>
    )



}


export { AuthContext, AuthProvider }