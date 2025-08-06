import { createContext, useContext } from "react";

const authContext = createContext({
    state:{
        status: false,
        data: null,
    },

    login: () => { },
    logout: () => { }
})

export const AuthContextProvider = authContext.Provider
export const useAuthContext = () => {
    return useContext(authContext);
}