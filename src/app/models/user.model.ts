export class User {
    id: any;
    email: any;
    fullname: any;
    urlPhoto: any;
    role: any;
}
export class LoginUser {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
