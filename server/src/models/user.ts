export interface User {
    id: number
    password: string
    email: string
    name: string
    token: string
}

export interface Users {
    [key: number]: User
}