<template src="./edit/EditProject.html"></template>
<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EditProject extends Vue {

    @Prop(String)
    public id!: string;

    public mounted() {
        console.log("loading ", this.id);
    }
}
</script>