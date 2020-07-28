import { ILayout } from "@antv/g6/lib/interface/layout";
import { NodeConfig } from "@antv/g6/lib/types"
import { List } from "immutable";
import { ReatomicModel } from '../nodes/base';

interface ReatomicLayoutCfg {
  layoutX: number;
  layoutY: number;
  rankSep: number;
  nodeSep: number;
}

interface ClusterInfo {
  y: number;
}

const CLUSTERS: Record<string, ClusterInfo> = {
  DATA_SOURCE: {
    y: 100,
  },
  FACT: {
    y: 450  ,
  },
  INSIGHT: {
    y: 800,
  },
  CONCLUSION: {
    y: 1200
  }
}

const resolveClusterInfo = (type: string | undefined): ClusterInfo => {
  switch (type) {
    case "data-source": return CLUSTERS.DATA_SOURCE;
    case "fact": return CLUSTERS.FACT;
    case "insight": return CLUSTERS.INSIGHT;
    case "conclusion": return CLUSTERS.CONCLUSION;
    default:
      return CLUSTERS.CONCLUSION;
  }
}

const byX = (node: NodeConfig) => node.x || 0;
const byName = (type: string) => (node: NodeConfig) => node.type === type;

const arrangeY = (info: ClusterInfo, nodes: List<NodeConfig>): void => {
  nodes.forEach((node: NodeConfig) => {
    node.y = info.y;
  });
}

const arrangeX = (info: ClusterInfo, nodes: List<NodeConfig>): void => {
  let counter = 0;
  // TODO CARD / REATOMICMODEL (NODECONFIG) ALL SHOULD CARRY INDEX AS PROPERTY
  nodes.sortBy((n: any) => n.index).forEach((node: NodeConfig) => {
    node.x = counter;
    counter += 275;
  });
}

const arrangeDataSources = (nodes: List<NodeConfig>): void => {
  console.log("arrange data-source nodes");
  const filteredList = nodes.filter(byName("data-source"));
  const nodesMaxX = filteredList.max(byX);
  const clusterInfo = CLUSTERS.DATA_SOURCE;

  arrangeY(clusterInfo, filteredList);
  arrangeX(clusterInfo, filteredList);
}

const arrangeFacts = (nodes: List<NodeConfig>): void => {
  console.log("arrange fact nodes");
  const filteredList = nodes.filter(byName("fact"));
  const nodesMaxX = filteredList.max(byX);
  const clusterInfo = CLUSTERS.FACT;

  arrangeY(clusterInfo, filteredList);
  arrangeX(clusterInfo, filteredList);
}

const arrangeInsights = (nodes: List<NodeConfig>): void => {
  console.log("arrange insight nodes");
  const filteredList = nodes.filter(byName("insight"));
  const nodesMaxX = filteredList.max(byX);
  const clusterInfo = CLUSTERS.INSIGHT;

  arrangeX(clusterInfo, filteredList);
  arrangeY(clusterInfo, filteredList);
}

const arrangeConclusions = (nodes: List<NodeConfig>): void => {
  console.log("arrange conclusion nodes");
  const filteredList = nodes.filter(byName("conclusion"));
  const nodesMaxX = filteredList.max(byX);
  const clusterInfo = CLUSTERS.CONCLUSION;

  arrangeX(clusterInfo, filteredList);
  arrangeY(clusterInfo, filteredList);
}

export const ReatomicLayout: Partial<ILayout<ReatomicLayoutCfg>> = {
  execute: function execute() {
    const nodeList = List(this.nodes || []);

    arrangeDataSources(nodeList);
    arrangeFacts(nodeList);
    arrangeInsights(nodeList);
    arrangeConclusions(nodeList);
  }
};
