import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import DomainsPage from './pages/DomainsPage/DomainsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthPage from './pages/AuthPage/AuthPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/Domains" exact>
                    <DomainsPage />
                </Route>
                <Route path="/profile/:id">
                    <ProfilePage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}