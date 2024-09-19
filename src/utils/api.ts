import { Urls } from "@/constants/urls";

export const fetchApiWithToken = async (url: string, method: string, token: string, body?: any) : Promise<any> => {
    const res = await fetch(`${Urls.baseUrl}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: method,
        body: method === 'GET' ? null : JSON.stringify(body)
    });
    return res;
}

export const fetchApi = async (url: string, method: string, body?: any) : Promise<any> => {
    const res = await fetch(`${Urls.baseUrl}${url}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: method,
        body: method === 'GET' ? null : JSON.stringify(body)
    });
    return res;
}