import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './description.sass'

export const Description = () => {

    let [data, setData] = useState()
    const {id} = useParams()


    const url = `http://localhost:8000/api/items/${id}/description`
    const request = fetch(url)
    useEffect(()=>{
        request
            .then(resp => resp.json())
            .then( (resData)=>{
                setData(resData.plain_text)
            })
            .catch(e => console.log(e))
    }, [request])

    return data? (
        <div className="description">
            <h3 className="description__title">Descripcion del producto</h3>
            <p className="description__text"> {data} </p>
        </div>
     ): <div></div>
}
