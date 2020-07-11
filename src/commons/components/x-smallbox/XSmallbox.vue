<template src="./XSmallbox.html"></template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class XSmallbox extends Vue {
     
    @Prop(String)
    public icon!: string;

    @Prop(String)
    public title!: string;

    @Prop(String)
    public level!: string;

    @Prop(String)
    public description!: string;

    @Prop(Boolean)
    public ctaEnabled!: boolean;

    @Prop(String)
    public cta!: string;
}
</script>