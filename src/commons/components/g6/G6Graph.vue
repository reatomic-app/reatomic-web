<template src="./G6Graph.html"></template>
<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";
import G6, { Graph } from "@antv/g6";
import { AddEdgeByClickBehavior } from "@/commons/components/g6/custom-behavior";
import { GraphData } from '@antv/g6/lib/types';
import { Card, CardNodeConfig, LinkEdgeConfig, Link } from '../../../reatomic/projects/domain';
import projectManagerStore from "@/reatomic/projects/application/services/ProjectManagerStore";
import {
  ConclusionNode,
  DataSourceNode,
  FactNode,
  InsightNode
} from "@/commons/components/g6/nodes";

const convertToNodeConfig = (next: Card): CardNodeConfig => {
  return {...next} as CardNodeConfig
};

const convertToEdgeConfig = (next: Link): LinkEdgeConfig => {
  return {...next} as LinkEdgeConfig
};

const convertToData = (cards: Card[], links: Link[]): GraphData => {
  return {
    nodes: cards.map(convertToNodeConfig),
    edges: links.map(convertToEdgeConfig),
  }
};

@Component
export default class G6Graph extends Vue {

    @Prop()
    public cards!: Card[];

    @Prop()
    public links!: Link[];

    @Ref("graph")
    public projectGraphElement!: HTMLElement;

    public projectGraph!: Graph;

    public mounted() {
        if (this.projectGraphElement) {
            this.registerNodes();

            this.projectGraph = new Graph({
                container: this.projectGraphElement,
                width: this.projectGraphElement.offsetWidth,
                height: this.projectGraphElement.offsetHeight,
                modes: {
                  default: [
                   "drag-canvas",
                   "drag-node",
                   "zoom-canvas", "click-add-edge",
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

            G6.registerBehavior(
              'click-add-edge',
              AddEdgeByClickBehavior(
                this.projectGraph,
                projectManagerStore,
              )
            );

            const data = convertToData(this.cards, this.links);

            this.projectGraph.data(data);
            this.projectGraph.setMode("default");
            this.projectGraph.render();
            this.projectGraph.moveTo(30,100);
        }
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
        const zoom = this.projectGraph.getZoom()
        this.projectGraph.data(data);
        this.projectGraph.refresh();
        this.projectGraph.render();
        this.projectGraph.moveTo(30,100);
        this.projectGraph.zoom(zoom);
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
