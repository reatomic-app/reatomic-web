<script setup lang="ts">
 import { RouterLink, RouterView } from 'vue-router'
 import { container } from "jenesius-vue-modal";
 import MainLayout from './components/MainLayout.vue';

 const ModalContainer = container;
 
</script>

<template>
  <main-layout>
    <router-view />
  </main-layout>

  <ModalContainer/>
</template>

<style src="./App.css"></style>
