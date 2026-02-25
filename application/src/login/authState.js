export class Auth_State {
    static Unknown = new Auth_State('unknown');
    static Authenticated = new Auth_State('authenticated');
    static Unauthenticated = new Auth_State('unauthenticated');

    constructor(name) {
        this.name = name;
    }
}