<template src="./XDialog.html"></template>
<style src="./XDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component, Emit, Prop } from "vue-property-decorator";

@Component
export default class XDialog extends Vue {

    @Prop(String)
    public name!: string;

    @Prop(String)
    public title!: string;

    @Prop(String)
    public cancelCaption!: string;

    @Prop(String)
    public acceptCaption!: string;

    @Emit("onCreate")
    public handleClickCreate() {
        this.$modal.hide(this.name);
    }

    @Emit("onCancel")
    public handleClickCancel() {
        this.$modal.hide(this.name);
    }

    public handleClickClose() {
        this.$modal.hide(this.name);
    }
}
</script>