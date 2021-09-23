export class UserModel{
    access_token: string;
    token_type: string;
    user_id: number;
    is_superuser: boolean;
    has_perfil: boolean;
    constructor() {
        this.access_token = '';
        this.token_type = '';
        this.user_id = 0;
        this.is_superuser = true;
        this.has_perfil = true;
    }
}