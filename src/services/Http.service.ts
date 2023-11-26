const mockResponse = (data: unknown, status: number) => {
}

export interface HttpServiceInterface {
    get<T>(url: string, options?: RequestInit): Promise<T>

    post<T>(url: string, data?: unknown, options?: RequestInit): Promise<T>

    put<T>(url: string, data?: unknown, options?: RequestInit): Promise<T>

    patch<T>(url: string, data?: unknown, options?: RequestInit): Promise<T>

    delete<T = void>(url: string, data?: unknown, options?: RequestInit): Promise<T>

    mockLogin(email: string, password: string): Promise<Response>

    mockRegister(email: string, password: string, username: string): Promise<Response>
}

const INCORRECT_EMAIL = 'incorrect@email.com';
const INCORRECT_PASSWORD = 'incorrect-password';

class HttpService implements HttpServiceInterface {
    baseApiUrl = `https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1`

    errorText = ({email, password}: { email?: string, password?: string }): string | null => {
        if (email && email === INCORRECT_EMAIL) {
            return 'Email is incorrect';
        }
        if (password && password === INCORRECT_PASSWORD) {
            return 'Password is incorrect';
        }
        return null
    }

    mockLogin = async (email: string, password: string): Promise<Response> => {
        const statusText = this.errorText({email, password});
        const isValid = statusText === null;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse: Response = new Response(
                    JSON.stringify({
                        data: {},
                        status: isValid ? 200 : 401,
                    }),
                    {
                        status: isValid ? 200 : 401,
                        statusText: statusText || 'Login failed',
                        headers: {'Content-type': 'application/json'},
                    }
                );
                resolve(mockResponse);
            }, 1000);
        });
    };

    mockRegister = async (email: string, password: string, username: string): Promise<Response> => {
        const statusText = this.errorText({email, password});
        const isValid = statusText === null;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse: Response = new Response(
                    JSON.stringify({
                        data: {},
                        status: isValid ? 200 : 400,
                    }),
                    {
                        status: isValid ? 200 : 400,
                        statusText: statusText || 'Login failed',
                        headers: {'Content-type': 'application/json'},
                    }
                );
                resolve(mockResponse);
            }, 1000);
        });
    }

    async baseFetch<T>(url: string, options?: RequestInit): Promise<T> {
        const response = await fetch(this.baseApiUrl + url, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        })

        if (!response.ok) {
            throw new Error(`${response.status}`)
        }

        return response.json()
    }

    async get<T>(url: string, options?: RequestInit): Promise<T> {
        return this.baseFetch<T>(url, {
            method: 'GET',
            ...options,
        })
    }

    async post<T>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.baseFetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options,
        })
    }

    async put<T>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.baseFetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options,
        })
    }

    async patch<T>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.baseFetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            ...options,
        })
    }

    async delete<T = void>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.baseFetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            ...options,
        })
    }
}

export default new HttpService()
