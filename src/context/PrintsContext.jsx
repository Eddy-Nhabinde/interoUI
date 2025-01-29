import React,{createContext} from "react";

const PrintsContext = createContext();

const PrintsProvider = ({children}) => {
    return(
        <PrintsContext.Provider>
            {children}
        </PrintsContext.Provider>
    )
}

export {PrintsContext,PrintsProvider};