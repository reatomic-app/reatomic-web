<template src="./G6Graph.html"></template>
<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";
import G6, { Graph } from "@antv/g6";
import { GraphData } from '@antv/g6/lib/types';
import { AddEdgeByClickBehavior, UpdateNodePosition } from "@/commons/components/g6/behaviors";
import { Card, Link } from '../../../reatomic/projects/domain';
import projectManagerStore from "@/reatomic/projects/application/services/ProjectManagerStore";
import {
  ConclusionNode,
  DataSourceNode,
  FactNode,
  InsightNode
} from "@/commons/components/g6/nodes";
import { convertToData } from "./graph/index";

@Component
export default class G6Graph extends Vue {

    @Prop()
    public cards!: Card[];

    @Prop()
    public links!: Link[];

    @Ref("graph")
    public graphContainer!: HTMLElement;

    public graph!: Graph;

    public mounted() {
        if (this.graphContainer) {
            this.registerNodes();

            this.graph = new Graph({
              container: this.graphContainer,
              width: this.graphContainer.offsetWidth,
              height: this.graphContainer.offsetHeight,
              modes: {
                default: [
                "drag-canvas",
                "drag-node",
                "zoom-canvas",
                "click-add-edge",
                "update-node-position"
                ],
                addEdge: [
                  'click-add-edge', 'click-select'
                ]
              },
              defaultNode: {
                  type: 'card',
                  size: [200, 260],
              },
              defaultEdge: {
                type: "line",
                style: {
                  lineWidth: 2,
                  stroke: "#ABA4B2",
                },
              },
            });

            this.registerBehaviors();

            const data = convertToData(this.cards, this.links);

            this.graph.data(data);
            this.graph.setMode("default");
            this.graph.render();
            this.graph.moveTo(30,100);
        }
    }

    public registerBehaviors() {
      G6.registerBehavior('click-add-edge', AddEdgeByClickBehavior(this.graph, projectManagerStore));
      G6.registerBehavior('update-node-position', UpdateNodePosition());
    }

    public registerNodes() {
      G6.registerNode("data-source", DataSourceNode(this.$i18n), "single-node");
      G6.registerNode("fact", FactNode(), "single-node");
      G6.registerNode("insight", InsightNode(), "single-node");
      G6.registerNode("conclusion", ConclusionNode(), "single-node");
    }

    @Watch("cards")
    public onCardsChanged(val: Card[]) {
      const data = convertToData(val, this.links);
      this.refreshData(data);
    }

    @Watch("links")
    public onLinksChanged(val: Link[]) {
        const data = convertToData(this.cards, val);
        this.refreshData(data);
    }

    public refreshData(data: GraphData) {
        const zoom = this.graph.getZoom()
        this.graph.data(data);
        this.graph.refresh();
        this.graph.render();
        this.graph.moveTo(30,100);
        this.graph.zoom(zoom);
        // EL PROBLEMA ES QUE LOS NODOS SE CREARON EN UNAS COORDENADAS
        // Y ESAS COORDENADAS NO SE ACTUALIZAN POR LO QUE CUANDO SE
        // REFRESCA EL CANVAS SE VUELVEN A PINTAR CON LA UNICA INFORMACION
        // QUE TIENEN... LA DE INICIO
        //
        // HAY QUE ACTUALIZAR LAS COORDENADAS DE LAS TARJETAS CUANDO
        // SE MUEVEN
        //
        // on node:dragend => actualizar coordenadas
    }
}
</script>
