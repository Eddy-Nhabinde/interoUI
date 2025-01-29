import { useLocation } from 'react-router-dom'

const redirect = () => {
    const redirectTo = () => {
        console.log(useLocation())
        if (useLocation().pathname === '/')
            return '/login'
        return useLocation().pathname
    }
    return { redirectTo }
}

export { redirect }