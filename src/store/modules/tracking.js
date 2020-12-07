import axios from 'axios'

const state = {
    currentPackageDetails: {}
}

const getters = {
    getCurrentPackageDetails:() => {
        return state.currentPackageDetails;
    }
}

const mutations = {
    UPDATE_PACKAGE_DETAILS:(state, payload) => {                
        state.currentPackageDetails = payload.data;    
    }
}

const actions = {
    //TODO: update all 
    getTrackingDetail:(context, payload) => {
        let request = 'http://shipit-api.herokuapp.com/api/carriers/${carrier}/${trackingnumber}';

        request = request.replace('${carrier}', payload.carrier);
        request = request.replace('${trackingnumber}', payload.trackingnumber);

        //wait to get request before updating data
        axios.get(request)
            .then(response => {  
                console.log(response)             
                context.commit('UPDATE_PACKAGE_DETAILS', response);
            })
        err => {
            alert(err);
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}