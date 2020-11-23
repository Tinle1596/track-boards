import { auth, db } from '@/db'

const state = {
    user: {}
}

const getters = {
    getUserInfo: () => {
        return state.user
    }
}

const mutations = {
    USER_LOGOUT: () => {
        state.user = {}
        alert('Successfully Logged Out');
    },
}

const actions = {
    createUser(context, payload) {
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                cred => {
                    db.collection('users').doc(cred.user.uid).set({
                        Name: payload.name
                    })
                    let user = auth.currentUser;
                    user.updateProfile({
                        displayName: payload.name
                    }).then(() => {
                        alert('Update Successful');
                    }).catch((error) => {
                        alert('Something went wrong', error);
                    })
                    state.user = user;
                },
                err => {
                    alert(err)
                }
            )
    },

    logIn(context, payload) {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((cred) => {
                state.user = cred.user;
            })
            .catch((error) => {
                console.log('Error Logging in', error)
            })

    },

    logOut(context) {
        auth.signOut()
            .then(() => {
                context.commit('USER_LOGOUT')
                console.log('User signed out')
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}