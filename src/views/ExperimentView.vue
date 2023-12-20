<script lang="ts" setup>
 const props = defineProps({
   id: String,
   experimentId: String
 });

</script>

<template>
  <h1>{{id}} - {{experimentId}}</h1>
</template>
