const getters = {
    account: state => state.user.account,
    name: state => state.user.name,
    password: state => state.user.password,
    avatar: state => state.user.avatar,
}
export default getters