import React, { useContext, useEffect, useState } from 'react';
import './searchBox.sass'
import  {ContextGlobal}  from '../../context/contextGlobal.js'
import { Link, withRouter } from 'react-router-dom';
import { useForm } from '../../hook/useForm';


const SearchBox = ({history}) => {


    const [, getSearch] = useContext(ContextGlobal)

    const [search, setSearch] = useState()

    useEffect(()=>{
        getSearch(search)
    }, [search])


    const [ formValues, handleInputChange ] = useForm( {
        searchRequest: ''
    } );

    const { searchRequest } = formValues



    const searchItem = (e) => {
        e.preventDefault()
        setSearch(searchRequest)
        history.push(`?search=${ searchRequest }`)
    }


    return (
        <>
            <nav className="navbar">
                <div className="navbar__cont">
                    <Link to={`/`}>

                        <img src="/assets/Logo_ML@2x.png.png" alt="Logo de Mercado Libre" className="navbar__logo"/>
                    </Link>

                    <form action="" className="navbar__buscador" onSubmit={searchItem}>
                        <input
                            // onChange={e=> setSearch(e.target.value)}
                            type="text"
                            className="navbar__input"
                            placeholder="Nunca Dejes de Buscar"
                            name="searchRequest"
                            value={ searchRequest }
                            onChange={ handleInputChange }
                        />
                        <button type="submit">
                            <img src="/assets/ic_Search@2x.png" className="navbar__btn" alt="Buscador" />
                        </button>
                    </form>
                </div>
            </nav>
        </>
    );
}

export default withRouter(SearchBox);