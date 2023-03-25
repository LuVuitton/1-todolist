import axios from "axios";

export const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '70ba2ec4-2ba1-411d-b8a2-7b24b30ac2ca'   //без ключа тоже работало
    }
}

export const toDoListsAPI = {
    getLists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1//todo-lists', setting)
            .then(r => r.data)
    },
    postList(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1//todo-lists', {title: title}, setting)
    },
    deleteList(listID: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1//todo-lists/${listID}`, setting)
    }
}