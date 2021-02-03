import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { Breadcrumbs } from '../components/breadcrumbs/Breadcrumbs'
import { ProductDetail } from '../components/productDetail/ProductDetail'
import SearchBox  from '../components/searchBox/SearchBox'
import { SearchResponse } from '../components/searchResponse/SearchResponse'

export const AppRouter = () => {
    return (
        <Router>
            <div>

                <SearchBox />
                <Breadcrumbs />

                <Switch>
                    <Route exact path="/items/:id" component={ ProductDetail } />
                    <Route exact path="/">
                        <Redirect to="/items" />
                    </Route>
                    <Route exact path="/items" component={SearchResponse}/>
                </Switch>
            </div>
        </Router>
    )
}