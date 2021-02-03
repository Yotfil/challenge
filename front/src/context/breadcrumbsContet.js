import React, { useContext, useEffect, useState } from 'react';
import { ContextGlobal } from './contextGlobal';


const ContextBreadcrums = React.createContext();

const ProviderBreadcrumbs = ({children}) => {

    const [dataGlobal] = useContext(ContextGlobal)



    const [data, setData] = useState();

    useEffect(()=>{
        if(dataGlobal){
            setData(dataGlobal.categories)
        }
    },[dataGlobal])


    return (
        <ContextBreadcrums.Provider value={[data, setData]}>
            {children}
        </ContextBreadcrums.Provider>
     );
}

export {
    ContextBreadcrums,
    ProviderBreadcrumbs
}