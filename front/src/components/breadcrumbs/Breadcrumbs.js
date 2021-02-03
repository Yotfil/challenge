import React, { useContext, useEffect, useState } from 'react';
import { ContextBreadcrums } from '../../context/breadcrumbsContet';
import './breadcrumbs.sass'

export const Breadcrumbs = () => {

    const [data] = useContext(ContextBreadcrums)
    console.log(data);

    let [breadcrumbs, setBreacrumbs] = useState()
    useEffect(()=>{
        if(data){
            const url = `http://localhost:8000/api/categories/${data}`
            const request = fetch(url)
            request
            .then(resp => resp.json())
            .then( (resData)=>{
                let breadcrumb = []
                resData.parents.forEach((item)=>{
                    breadcrumb.push(item.name)
                })
                setBreacrumbs(breadcrumb)
            })
        }
        }, [data])

       return breadcrumbs? (
            <>
                <div className="breadcrumbs">
                    <p >
                    {
                        breadcrumbs.map((e, i)=>{
                          return  <span key={i}  className="breadcrumbs__text"> {e} </span>
                        })
                    }
                    </p>
                </div>
            </>
        ): <div className="breadcrumbs ">
            <p className="breadcrumbs__mold"></p>
        </div>

    }
