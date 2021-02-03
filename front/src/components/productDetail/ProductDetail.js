import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextBreadcrums } from '../../context/breadcrumbsContet';
import { Description } from '../description/Description';
import './productDetail.sass'


export const ProductDetail = () => {

    const [, setDataBreadcrumbs ] = useContext(ContextBreadcrums)

    let [data, setData] = useState()
    const {id} = useParams()

    useEffect(()=>{
        const url = `http://localhost:8000/api/items/${id}`
        const request = fetch(url)
        request
                .then(resp => resp.json())
                .then( (resData)=>{
                    setData(resData.item)
                })
                .catch(e => console.log(e))

            if(data){
                setDataBreadcrumbs(data.category)
            }

            }, [id, data, setDataBreadcrumbs])

    if(data){
        if(data.condition === 'new'){
            data.condition = 'Nuevo'
        }else if(data.condition === 'used'){
            data.condition = 'Usado'
        }
        const numberStr = data.price.amount.toString()
        if(numberStr.length === 4){
            const first = numberStr.slice(0, 1)
            const remain = numberStr.slice(1)
            const newNum = `${first}.${remain}`
            data.price.amount = newNum
        }
    }


    return data? (
        <main onChange={setData}>
            <div className="detail">
                <div className="detail__image">
                    <img src={data.picture} alt={data.title} className="detail__pic" />
                </div>
                <div className="detail__info">
                    <p className="detail__condition"> {data.condition} - {data.sold_quantity} vendidos</p>
                    <p className="detail__title"> {data.title} </p>
                    <p className="detail__price">$ {data.price.amount} </p>
                    <button type="button" className="detail__button">Comprar</button>
                </div>
            </div>
            <Description />
        </main>
    ):  <div></div>
}