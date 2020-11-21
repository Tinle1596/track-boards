import db from '@/db'

const state = {
    packages: []
}

const getters = {
    packages() {        
        return state.packages
    }
}

const mutations = {
    RETRIEVE_PACKAGES: (state, payload) => {
        state.packages = payload;
    },
    
    ADD_PACKAGE: () => {
        console.log('Item Added')
    },
    DELETE_PACKAGE: () => {
        console.log('Item Deleted')
    }
}

const actions = {    
    //TODO: Replace hardcoded user to logged in user - ${userId}
    //retrieve entire list of active packages for specific user.    
    retrievePackages: (context) => {                
        let tempPackages = []
        db.collection('users/AbZboHaasVdgbxbPp6aQ/packages').get()                        
            .then(querySnapshot => {                
                querySnapshot.forEach(doc => {
                    const data = {
                        id: doc.id,
                        item: doc.data().item,
                        description: doc.data().description,
                        trackingnumber: doc.data().tracking_number,
                        carrier: doc.data().carrier,
                        timestamp: doc.data().timestamp,
                        inbound: doc.data().inbound
                    }                    
                    tempPackages.push(data);                    
                })                                
            })
            context.commit('RETRIEVE_PACKAGES', tempPackages);
    },    

    addPackage: (context, payload) => {        
        let tempPackage = payload;
        tempPackage.timestamp = Date.now();
        db.collection('users/AbZboHaasVdgbxbPp6aQ/packages').add({
            item: tempPackage.item,
            description: tempPackage.description,
            tracking_number: tempPackage.trackingnumber,
            carrier: tempPackage.carrier,
            timestamp: tempPackage.timestamp,
            inbound: tempPackage.inbound
        })
        .catch((error) => {
            console.log('Error adding document ', error);
        })
        .then(() => {
            context.commit('ADD_PACKAGE');
            context.dispatch('retrievePackages');                       
        });         
    },

    deletePackage: (context, payload) => {
        console.log(payload.id);
        db.collection('users/AbZboHaasVdgbxbPp6aQ/packages')
            .doc(payload.id)
            .delete()
            .catch((error) => {
                console.log('Error Deleting document', error);
            })
            .then(() => {
                context.commit('DELETE_PACKAGE');
                context.dispatch('retrievePackages');                
            });
                    
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}