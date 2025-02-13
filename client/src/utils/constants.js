export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth"

export const SIGNUP_ROUTE = `${HOST}/${AUTH_ROUTES}/signup`

export const LOGIN_ROUTE = `${HOST}/${AUTH_ROUTES}/login`