<template>
  <div>
    <input type="email" placeholder="email" v-model="user.email" />
    <br />
    <input type="password" placeholder="password" v-model="user.password" />
    <br />
    <button>Account</button>
    <button @click="loginUser()">Login</button>
    <button @click="logOutUser()">Logout</button>
    <p>
      Need an account? <router-link to="/signup"></router-link>
      <br />
      <input type="email" placeholder="email" v-model="cred.email" />
      <br />
      <input type="password" placeholder="password" v-model="cred.password" />
      <br />
      <input type="name" placeholder="name" v-model="cred.name" />
      <br />
      <br />
      <button @click="signUp()">Sign Up</button>
    </p>
    {{ userInfo }}
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      cred: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    })
  },
  methods: {
    ...mapActions({
      SignUp: "createUser",
      Login: "logIn",
      LogOut: "logOut"
    }),
    signUp() {
      this.SignUp(this.cred);
    },
    loginUser() {
      this.Login(this.user);
    },
    logOutUser() {
      this.LogOut();
    }
  }
};
</script>

<style></style>
