import api_account from '@/api/account'
import store from '@/store'

export default function getAvatar() {
    let param = {
        user_name: store.getters.account,
    }
    api_account.getAvatar(param)
        .then(avatarUrl => {
            store.commit("setAvatar", avatarUrl);
        })
}