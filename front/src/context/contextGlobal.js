import React, { useState } from 'react';

/* Creando el estado global */
const ContextGlobal = React.createContext();

const ProviderGlobal = ({children}) => {
    const [data, setData] = useState()

    const getSearch = (item)=>{
        const url = `http://localhost:8000/api/items?q=${item}`
        const request = fetch(url)

        request
            .then(resp => resp.json())
            .then( (data)=>{
                setData(data)
            })

    }


    return (
        <ContextGlobal.Provider value={[data, getSearch, setData]}>
            {children}
        </ContextGlobal.Provider>
    );
}

export {
    ContextGlobal,
    ProviderGlobal
};