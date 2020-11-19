<template>
    <div>
        <h1>test</h1>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

export default {
    name: "EmployeeList",
    data(){
        return {list:undefined}
    },
    mounted(){
        Vue.axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then((resp) => {
                this.list=resp.data.data;
                console.warn(resp)
            })
    }
}
</script>

<style>

</style>