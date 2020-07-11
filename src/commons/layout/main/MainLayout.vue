    <template src="./MainLayout.html"></template>
<style src="./MainLayout.css"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import XSidebar from "@/commons/components/x-sidebar/XSidebar.vue";
import XSidebarSwitch from "@/commons/components/x-sidebar/XSidebarSwitch.vue";

@Component({
    components: {
        XSidebar,
        XSidebarSwitch,
    },
})
export default class MainLayout extends Vue {}
</script>