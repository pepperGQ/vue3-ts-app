export interface loginFormInt {
    userName: String,
    password: String,
}

export class initData {
    loginForm: loginFormInt = {
        userName: '',
        password: ''
    }
}