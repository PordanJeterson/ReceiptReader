import * as React from 'react';
import * as ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';
import {Routes} from './routes';

ReactDom.render(
    <BrowserRouter children={Routes}/>,
    document.getElementById('react-app')
);