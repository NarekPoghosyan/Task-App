import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)

    const login = useCallback((jwtToken) => {
        setToken(jwtToken)

        localStorage.setItem('userData', JSON.stringify({
            token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token }
}