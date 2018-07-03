const login = {
    state: {
        account: '',
        name: '',
        password: '',
        avatar: '',
    },
    mutations: {
        setAvatar(state, avatarUrl) {
            state.avatar = avatarUrl;
        },
        loginIn(state, {
            account,
            password,
            name
        }) {
            localStorage.account = account;
            localStorage.password = password;
            localStorage.name = name;

            state.account = account;
            state.password = password;
            state.name = name;
        },
        loginOut(state) {
            localStorage.removeItem('account');
            localStorage.removeItem('password');
            localStorage.removeItem('name');

            state.account = '';
            state.password = '';
            state.name = '';
        }
    }
}
export default login