import {atom} from "jotai";

export type appError = {
    message: string
    status: number
} | null

export type AppState = {
    error: appError
    isLoading: boolean
}

export type AuthState = {
    isAuthenticated: boolean
    otpStage: boolean
}

export const initialAuthState = {
    isAuthenticated: false,
    otpStage: false
}

export const initialAppState = {
    error: null,
    isLoading: false
}

export const AuthAtom = atom<AuthState>(initialAuthState)
export const AppAtom = atom<AppState>(initialAppState)
