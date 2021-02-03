import React from 'react';
import ReactDOM from 'react-dom';
import { ProviderBreadcrumbs } from './context/breadcrumbsContet';
import { ProviderGlobal } from './context/contextGlobal';
import { ProductsApp } from './ProductsApp';
import './styles/style.sass'


ReactDOM.render(
        <ProviderGlobal>
            <ProviderBreadcrumbs>
                <ProductsApp />
            </ProviderBreadcrumbs>
        </ProviderGlobal>,
    document.getElementById('root')
);

