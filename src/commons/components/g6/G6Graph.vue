<template src="./G6Graph.html"></template>
<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";
import G6, { Graph } from "@antv/g6";
import { CardNode } from "@/commons/components/g6/custom-nodes";
import { NodeConfig, EdgeConfig } from '@antv/g6/lib/types';

@Component
export default class G6Graph extends Vue {

    @Prop()
    public nodes!: NodeConfig[];

    @Prop()
    public edges!: EdgeConfig[];
    
    @Ref("graph")
    public projectGraphElement!: HTMLElement;

    public projectGraph!: Graph;

    public mounted() {
        if (this.projectGraphElement) {
            G6.registerNode('card', CardNode, 'single-node');

            this.projectGraph = new Graph({
                container: this.projectGraphElement,
                width: this.projectGraphElement.offsetWidth,
                height: this.projectGraphElement.offsetHeight,                
                modes: {
                  default: [
                   "drag-canvas", "zoom-canvas"
                  ],
                },
                defaultNode: {
                    type: 'card',
                    size: [200, 260],
                },

            });

            this.projectGraph.data({
                nodes: this.nodes,
                edges: this.edges,
            })
            this.projectGraph.render();
            this.projectGraph.fitView();
            this.projectGraph.moveTo(0,0);
        }
    }

    @Watch("nodes")
    public onNodesChanged(val: NodeConfig[]) {
        this.projectGraph.data({
            edges: this.edges,
            nodes: val,
        });
        this.projectGraph.refresh();
        this.projectGraph.render();
            this.projectGraph.fitView();
            this.projectGraph.moveTo(0,0);        
    }
}
</script>