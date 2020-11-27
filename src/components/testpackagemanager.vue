<template>
  <div>
    <div>
      <h3>add packages</h3>
      <div>
        <input
          v-model="addPackageData.item"
          class="validate"
          placeholder="Item"
        />
        <input
          v-model="addPackageData.description"
          class="validate"
          placeholder="Description"
        />
        <input
          v-model="addPackageData.trackingnumber"
          class="validate"
          placeholder="tracking"
        />
      </div>
       <div>
          <button @click="addPackage()">add</button>
        </div>
    </div>

    <div>
      <h1>packages</h1>
      <div v-for="item in packages" v-bind:key="item.id" class="collection">
        <div class="collection-item">
          <div>{{ item.id }}</div>
          <div>{{ item.item }}</div>
          <div>{{ item.description }}</div>
          <div>{{ item.trackingnumber }}</div>
          <div>{{ item.carrier }}</div>
          <div>{{ item.timestamp }}</div>
          <div>{{ item.inbound }}</div>
        </div>
        <div>
          <button @click="deletePackage(item)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EmployeeList",
  data() {
    return {
      addPackageData: {
        item: "",
        description: "",
        trackingnumber: "",
        carrier: 1,
        inbound: true,
      },
    };
  },
  computed: {
    ...mapGetters(['packages']),
  },
  methods: {
    ...mapActions({
      addItem: 'addPackage',
      deleteItem: 'deletePackage',
    }),
    addPackage() {
      this.addItem(this.addPackageData);
    },
    deletePackage(item) {
      this.deleteItem(item);
    },
  },
  created() {
    this.$store.dispatch("retrievePackages");
  },
};
</script>

<style>
</style>