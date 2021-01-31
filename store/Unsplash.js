import axios from "axios";
const API = process.env.API
const ACCCESS_KEY = 'rR3iBHa1Nz1c8FCsuY7ElhX2H5f_xpdqkTyY0zvf6xk'
const USER_TOKEN = 'kEm6k5XTRqkBQlH70ZmdI2M7O7rcJ-KqorLhi_-g4Lc'
const state = () => ({
    randomArray: [],
    photosArray: [],
    photo: {},
    likeList: []
})

const getters = {
    STATE: state => state
}

const mutations = {
    SET_STOCK: (state, data) => {
        if (data.status === 200) {
            state.randomArray = data.data
        }
    },
    SET_NEW_STOCK: (state, data) => {
        if (data.status === 200) {
            state.randomArray = [...state.randomArray, ...data.data]
        }
    },
    EMPTY_STOCK: (state) => {
        state.randomArray = []
    },
    SET_SEARCH_PHOTOS: (state, data) => {
        if (data.status === 200) {
            state.photosArray = [...state.photosArray, ...data.data.results]           
        }
    },
    EMPTY_SEARCH: (state) => {
        state.photosArray = []
    },
    SET_PHOTO: (state, data) => {
        if (data.status === 200) {
            state.photo = data.data
        }
    },
    SET_LIKE_LIST: (state, data) => {
        if (data.status === 200) {
            state.likeList = data.data
        }
    },
    SET_LIKE_ITEM: (state, data) => {
        let index = state.randomArray.findIndex(x => x.id === data.data.photo.id);
        if (index < 1) {
            index = state.photosArray.findIndex(x => x.id === data.data.photo.id);
            if(index < 1) {
                index = state.likeList.findIndex(x => x.id === data.data.photo.id);
                state.randomArray[index].liked_by_user = true
            } else {
                state.randomArray[index].liked_by_user = true
            }
        } else {
            state.randomArray[index].liked_by_user = true
        }
    },
    SET_DISLIKE_ITEM: (state, data) => {
        let index = state.randomArray.findIndex(x => x.id === data.data.photo.id);
        if (index < 1) {
            index = state.photosArray.findIndex(x => x.id === data.data.photo.id);
            if(index < 1) {
                index = state.likeList.findIndex(x => x.id === data.data.photo.id);
                state.likeList[index].liked_by_user = false
            } else {
                state.photosArray[index].liked_by_user = false
            }
        } else {
            state.randomArray[index].liked_by_user = false
        }
    }
}

const actions = {
    setEmpty({commit}, data) {
        if (data === 'search') {
            commit('EMPTY_SEARCH')
        } else {
            commit('EMPTY_STOCK')
        }
    },
    async getRandomPhoto({commit}) {
        try {
            const data = await axios.get(`${API}photos/random`, {
                params: {
                    client_id: ACCCESS_KEY,
                    count: 30
                },
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            commit('SET_STOCK', data)
        }
        catch (error) {
            console.error(error)
        }
    },
    async getNexPhotos({commit}) {
        try {
            const data = await axios.get(`${API}photos/random`, {
                params: {
                    client_id: ACCCESS_KEY,
                    count: 30
                },
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            commit('SET_NEW_STOCK', data)
        }
        catch (error) {
            console.error(error)
        }
    },
    async searchPhotos({commit}, input) {
        try {
            const data = await axios.get(`${API}search/photos`, {
                params: {
                    client_id: ACCCESS_KEY,
                    query: input.query,
                    page: input.page,
                    per_page: input.per_page
                },
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            commit('SET_SEARCH_PHOTOS', data)
        }
        catch (error) {
            console.error(error)
        }
    },
    async downloadPhoto({commit}, input) {
        try {
            console.log(input)
            const url = await axios.get(`${API}photos/${input}/download`, {
                params: {
                    client_id: ACCCESS_KEY
                }
            });
            axios({
                url: url.data.url,
                method: 'GET',
                responseType: 'blob', // Important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', input + '.jpg'); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
        }
        catch(error) {
            console.error(error)
        }
    },
    async getPhoto({commit}, input) {
        try {
            const data = await axios.get(`${API}photos/${input}`, {
                params: {
                    client_id: ACCCESS_KEY
                },
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            commit('SET_PHOTO', data)
        }
        catch(error) {
            console.error(error);
        }
    },
    async likePhoto({commit}, input) {
        try {
            const data = await axios.post(`${API}photos/${input}/like`, {}, {
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            if (data.status === 201) {
                commit('SET_LIKE_ITEM', data)
                return true
            } else {
                return false
            }
        }
        catch(error) {
            console.error(error);
            return false
        }
    },
    async unlikePhoto({commit}, input) {
        try {
            const data = await axios.delete(`${API}photos/${input}/like`, {
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            if (data.status == 200) {
                commit('SET_DISLIKE_ITEM', data)
                return true
            } else {
                return false
            }
        }
        catch (error) {
            console.error(error)
            return false
        }
    },
    async getListLiked({commit}, input) {
        try {
            const data = await axios.get(`${API}users/${input.username}/likes`, {
                params: {
                    client_id: ACCCESS_KEY,
                    page: input.page,
                    per_page: 999
                },
                headers: {
                    Authorization: 'Bearer ' + USER_TOKEN
                }
            });
            commit('SET_LIKE_LIST', data);
        }
        catch(error) {
            console.error(error);
        }
    }
}

export default {
state,
getters,
mutations,
actions
}