export interface User {
    id: number,
    registeredAt: number,
    fio: string,
    position: string,
    login: string,
    pass: string,
    phone: string
}

export interface UserFilterParams {
    id?: string,
    fio?: string,
    position?: string,
    login?: string
}

export interface ServerResponse_UserList {
    users: User[],
    currenPage: number,
    pagesCount: number,
}