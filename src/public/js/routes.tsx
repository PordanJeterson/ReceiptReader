import * as React from 'react'
import {Route} from 'react-router-dom'
import Root from './Root'
import Home from './components/Home'

export const Routes = (
    <Root>
        <Route exact path="/" component={Home}/>
    </Root>
);