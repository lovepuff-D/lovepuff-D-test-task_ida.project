import {createStore} from 'vuex'

export default createStore({
    state: {
        listOfProducts: [],
    },
    getters: {},
    mutations: {
        SET_PRODUCT(state, payload) {
            state.listOfProducts = JSON.parse(payload)
        },
        ADD_PRODUCT(state, payload) {
            state.listOfProducts.push(JSON.parse(payload))
        },
        DELETE_PRODUCT(state, id) {
            state.listOfProducts = state.listOfProducts.filter(el => el.id !== id)
        },
        SORT_PRODUCT(state, typeOfSort) {
            if (typeOfSort === 'Default') {
                //По дате добавления
                state.listOfProducts = state.listOfProducts.sort((a, b) => a.id - b.id)
            }
            if (typeOfSort === 'Name') {
                state.listOfProducts = state.listOfProducts.sort((a, b) => {
                    const nameA = a.name.toUpperCase()
                    const nameB = b.name.toUpperCase()
                    if (nameA < nameB) return -1;
                })
            }
            if (typeOfSort === 'Increase') {
                state.listOfProducts = state.listOfProducts.sort((a, b) => a.costNumber - b.costNumber)
            }
            if (typeOfSort === 'Decrease') {
                state.listOfProducts = state.listOfProducts.sort((a, b) => b.costNumber - a.costNumber)
            }
        }
    },
    actions: {},
    modules: {}
})
