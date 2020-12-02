import axios from 'axios'
//const shippo = require('shippo')('shippo_live_5580d8e348403c0eab5117e2c85e30b20f35aee7');

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
        // console.log(payload.trackingnumber);
        // let request = 'https://api.goshippo.com/tracks/usps/${tracking}';
        // request = request.replace('${tracking}', payload.trackingnumber);
        // console.log(request);
        // var res = shippo.tracks.get(request)
        // console.log(res);

        let metadata = 'carrier=usps&tracking_number=${tracking}'
        metadata = metadata.replace('${tracking}', payload.trackingnumber)        
        axios.get('https://api.goshippo.com/tracks/', {
            method:'GET',
            headers: {
                'Authorization': 'ShippoToken shippo_live_5580d8e348403c0eab5117e2c85e30b20f35aee7',                
            },
            body: metadata
        })
            .then(res => res.json())
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