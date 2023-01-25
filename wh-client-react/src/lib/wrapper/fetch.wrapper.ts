import AuthService from "@/services/auth.service";

export { useFetchWrapper };

function useFetchWrapper() {

    let token: string = ''

    return {
        get: request('GET'),
        post: request('POST'),
        patch: request('PATCH'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return (url: string, body?: any, isFile: boolean = false) => {

            const requestOptions: any = {
                method,
                headers: authHeader(url)
            };

            if (body) {
                if (isFile) {
                    requestOptions.body = body;
                } else {
                    
                    requestOptions.headers['Content-Type'] = 'application/json';
                    requestOptions.body = JSON.stringify(body);    
                }
                
            }
            
            return fetch(url, requestOptions).then(handleResponse);
        }
    }
    
    // helper functions
    
    function authHeader(url: string) {
        // return auth header with jwt if user is logged in and request is to the api url

        token = AuthService.getToken() || ''

        const isLoggedIn = !!token;
        if (isLoggedIn) {
            return { Authorization: `${token}` }
        } else {
            return {}
        }
    }

    function handleResponse(response: any) {

        return response.json().then((data: any) => {

            if (!response.ok) {
                if ([401, 403].includes(response.status) && token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(data);
            }
    
            return data;
        });
    }    
}