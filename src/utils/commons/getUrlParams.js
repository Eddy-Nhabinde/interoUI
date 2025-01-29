import { useLocation } from 'react-router-dom'

export const GetUrlParams = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    return {
        startDate: params.get('startDate') ? new Date(params.get('startDate')) : undefined,
        endDate: params.get('endDate') ? new Date(params.get('endDate')) : undefined,
        params
    }
}