import axios from 'axios'

const state = {

}

const getters = {

}

const mutations = {
    UPDATE_PACKAGE_DETAILS() {
        alert('Successful api request');
    }
}

const actions = {

    //Determine which carrier to track 
    // getTrackingDetails:(context, payload) => {

    // },
    //Tracking detail for USPS
    //TODO: replace hardcoded tracking number w/ actual tracking number
    getTrackingDetailForUSPS:(context, payload) => {

        //Create dictionary
        let carriers = {
            1: 'usps',
            2: 'ups',
            3: 'fedex',
            4: 'ontrac',
            5: 'dhl',
            6: 'amazon'
        };
        let packageCarrier = carriers[payload.carrier];        
        let request = 'http://shipit-api.herokuapp.com/api/carriers/${carrier}/${trackingnumber}';

        request = request.replace('${carrier}', packageCarrier)
        request = request.replace('${trackingnumber}', payload.trackingnumber);
        console.log(request);

        axios.get(request)
            .then(response => {
                console.log(response);
                context.commit('UPDATE_PACKAGE_DETAILS');
            })
            err => {
                console.log(err);
            }
    },

    // //Tracking for UPS
    // async GetTrackingDetailForUPS({}){

    // },

    // //Tracking for FedEx
    // async GetTrackingDetailForFedEx() {

    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}