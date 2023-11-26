import {AppAtom, AuthAtom, initialAuthState} from "../store";
import {HttpServiceInterface} from "../services/Http.service";
import {useAtom} from "jotai";
import LocalstorageService from "../services/Localstorage.service";
import {useEffect} from "react";

const AuthHook = (httpService: HttpServiceInterface) => {
    const [authState, setAuthState] = useAtom(AuthAtom)
    const [appState, setAppState] = useAtom(AppAtom)

    const handleLoading = (isLoading: boolean) => {
        setAppState({
            ...appState,
            isLoading
        })
    }

    const handleError = (text: string) => {
        setAppState({
            ...appState,
            error: {
                message: text,
                status: 400
            }
        })
    }

    const enterOtp = () => {
        setAuthState({
            isAuthenticated: true,
            otpStage: false
        })
        LocalstorageService.setItem('auth', true)
    }

    const login = async ({email, password}: { email: string, password: string }) => {
        handleLoading(true)
        const response = await httpService.mockLogin(email, password)
        handleLoading(false)

        if (!response?.ok) {
            setAuthState({
                ...authState,
                otpStage: false
            })
            handleError(response?.statusText || 'Login failed')
            return
        }
        setAuthState({
            ...authState,
            otpStage: true
        })
        return response

    }

    const logout = () => {
        setAuthState(initialAuthState)
        LocalstorageService.removeItem('auth')
    }

    const register = async ({email, password, username}: { email: string, password: string, username: string }) => {
        handleLoading(true)
        const response = await httpService.mockRegister(email, password, username)
        handleLoading(false)

        if (!response?.ok) {
            setAuthState(initialAuthState)
            handleError(response?.statusText || 'Register failed')
            return
        }

        setAuthState({
            otpStage: false,
            isAuthenticated: true,
        })
        LocalstorageService.setItem('auth', true)
    }

    useEffect(() => {
        const auth = LocalstorageService.getItem<boolean>('auth')
        if (auth) {
            setAuthState({
                isAuthenticated: auth,
                otpStage: false
            })
        }
    }, [])

    return {
        enterOtp,
        logout,
        login,
        register,
        isAuthenticated: authState.isAuthenticated
    }
}

export default AuthHook
