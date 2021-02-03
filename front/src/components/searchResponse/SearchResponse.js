import React, { useEffect, useContext } from 'react';
import './searchResponse.sass'
import '../../styles/_variables.sass'
import { ContextGlobal } from '../../context/contextGlobal'
import { Link } from 'react-router-dom';
import { ContextBreadcrums } from '../../context/breadcrumbsContet';


export const SearchResponse = () => {



    const [data] = useContext(ContextGlobal)
    const [, setDataBreadcrumbs] = useContext(ContextBreadcrums)

    if(data){
        data.items.forEach((item)=>{
            const numberStr = item.price.amount.toString()
            if(item.price.amount.length === 4){
                const first = numberStr.slice(0, 1)
                const remain = numberStr.slice(1)
                const newNum = `${first}.${remain}`
                item.price.amount = newNum
            }
        })
    }
    useEffect(()=>{
        if(data){
            setDataBreadcrumbs(data.categories)
        }
    }, [data, setDataBreadcrumbs])

    const itemVacios = [1, 2 ,3 ,4 ,5 ,6 ,7]

    return data? (
        <main>
            {
                data.items.map((data) => (
                   <div className="item" key={data.id} >
                       <Link to={`./items/${data.id}`} className="item__img">
                            <img className="item__pic" src={data.picture} alt={data.title} />
                       </Link>
                        <div className="item__info">
                            <div className="item__info-desc info">
                                <div className="info__cont-price">
                                    <p className="info__price"> $ {data.price.amount} </p>
                                    {data.free_shipping && <img src="./assets/ic_shipping@2x.png" alt={data.title} className="info__icon"/> }
                                </div>

                                <p className="info__title">{data.title} </p>
                            </div>
                            <div className="item__condition">
                                    <p> {data.address} </p>
                            </div>
                        </div>
                   </div>

                ))
            }
        </main>
    ): <main>
        {
        itemVacios.map((data, index) => (
                   <div className="item" key={index} >
                       <Link to={`./items`} className="item__img item__img--mold">
                            <img className="item__pic item__pic--mold" src="" alt="" />
                       </Link>
                        <div className="item__info item__info--mold">
                            <div className="item__info-desc item__info-desc--mold info info--mold">
                                <div className="info__cont-price info__cont-price--mold">
                                    <p className="info__price info__price--mold"></p>
                                </div>

                                <p className="info__title info__title--mold"></p>
                            </div>
                            <div className="item__condition item__condition--mold">
                                    <p> </p>
                            </div>
                        </div>
                   </div>

                ))
        }
    </main>
}