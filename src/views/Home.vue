<template>
  <div class="home">        
    <EmployeeList/>
  </div>
</template>

<script>
// @ is an alias to /src
import EmployeeList from '@/components/testpackagemanager.vue';

export default {
  name: "Home",
  components: {
    EmployeeList
  }
};
</script>
