import { db } from "@/db";

const state = {
  packages: []
};

const getters = {
  getPackages: () => {
    return state.packages;
  }
};

const mutations = {
  RETRIEVE_PACKAGES: (state, payload) => {
    state.packages = payload;
  },

  ADD_PACKAGE: () => {
    console.log("Item Added");
  },
  DELETE_PACKAGE: () => {
    console.log("Item Deleted");
  },
  UPDATE_PACKAGE: () => {}
};

const actions = {
  retrievePackages: context => {
    let tempPackages = [];
    let collectionPath = "users/${userId}/packages";
    collectionPath = collectionPath.replace(
      "${userId}",
      context.rootState.authentication.user.uid
    ); //collection path

    db.collection(collectionPath)
      .get()
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
          };
          tempPackages.push(data);
        });
      });
    context.commit("RETRIEVE_PACKAGES", tempPackages);
  },

  addPackage: (context, payload) => {
    let collectionPath = "users/${userId}/packages";
    collectionPath = collectionPath.replace(
      "${userId}",
      context.rootState.authentication.user.uid
    ); //collection path
    db.collection(collectionPath)
      .add({
        item: payload.item,
        description: payload.description,
        tracking_number: payload.trackingnumber,
        carrier: payload.carrier,
        timestamp: Date.now(),
        inbound: payload.inbound
      })
      .then(() => {
        context.commit("ADD_PACKAGE");
        context.dispatch("retrievePackages");
      })
      .catch(error => {
        console.log("Error adding document ", error);
      });
  },

  deletePackage: (context, payload) => {
    let collectionPath = "users/${userId}/packages";
    collectionPath = collectionPath.replace(
      "${userId}",
      context.rootState.authentication.user.uid
    ); //collection path
    db.collection(collectionPath)
      .doc(payload.id)
      .delete()
      .then(() => {
        context.commit("DELETE_PACKAGE");
        context.dispatch("retrievePackages");
      })
      .catch(error => {
        console.log("Error Deleting document", error);
      });
  },

  updatePackage: (context, payload) => {
    let collectionPath = "users/${userId}/packages";
    collectionPath = collectionPath.replace(
      "${userId}",
      context.rootState.authentication.user.uid
    ); //collection path
    db.collection(collectionPath)
      .doc(payload.id)
      .set({
        item: payload.item,
        description: payload.description,
        tracking_number: payload.trackingnumber,
        carrier: payload.carrier,
        timestamp: Date.now(),
        inbound: payload.inbound
      })
      .then(() => {
        context.commit("UPDATE_PACKAGE");
        context.dispatch("retrievePackage");
      })
      .catch(error => {
        console.log("Error Updating document", error);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
