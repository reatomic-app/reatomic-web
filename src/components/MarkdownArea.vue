<script lang="ts" setup>
 import EasyMDE from "easymde";
 import { marked } from "marked";
 import { ref, onMounted, computed, watch } from "vue";

 const props = defineProps({
   editing: Boolean,
   modelValue: String
 });

 const emit = defineEmits(['update:modelValue']);
 const areaRef = ref(null);

 const current = ref(props.modelValue);
 const currentHtml = computed(() => {
   try {
     return marked.parse(current.value || "");
   } catch(err) {
     console.error(err);
     return "";
   }
 });

 onMounted(() => { initMarkdown(); });
 watch(areaRef, () => { initMarkdown(); });

 watch(() => props.modelValue, (v) => { current.value = v; });

 function initMarkdown() {
   if (areaRef.value) {
     const easyMDE = new EasyMDE({
       element: areaRef.value,
       status: false,
     });

     if (current?.value) {
       easyMDE.value(current.value);
     }

     easyMDE.codemirror.on("change", () => {
       current.value = easyMDE.value();
       emit("update:modelValue", current.value);
     });
   }
 }
</script>

<template>
  <div v-if="editing">
    <textarea ref="areaRef"></textarea>
  </div>
  <div class="markdown-render" v-if="!editing" v-html="currentHtml"></div>
</template>

<style>
 .markdown-render {
   h1 {
     font-family: montserrat;
     font-size: 40px;
     font-weight: 700;
   }
 }
</style>
