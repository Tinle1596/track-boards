

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    getTrackingForUSPS: (context) => {
        Vue.axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then((resp) => {
                this.list = resp.data.data;
                console.warn(resp)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}