import { createContext, useState } from "react";

export const LgContext = createContext();

export const LgProvider = ({children}) => {

    const [pgLanguage, setPgLanguage] = useState("en_US");

    return(
        <LgContext.Provider value={{pgLanguage, setPgLanguage}}>
            {children}
        </LgContext.Provider>
    )
}