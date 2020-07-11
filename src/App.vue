<template>  
  <main-layout>
    <router-view/>
  </main-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MainLayout from "@/commons/layout/main/MainLayout.vue";

@Component({
  components: {    
    MainLayout,
  }
})
export default class App extends Vue {}
</script>

<style src="./App.css">
</style>
