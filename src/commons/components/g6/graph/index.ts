import { Card, CardNodeConfig, LinkEdgeConfig, Link } from '@/reatomic/projects/domain';
import { GraphData } from '@antv/g6/lib/types';

const convertToNodeConfig = (next: Card): CardNodeConfig => {
  return {...next} as CardNodeConfig
};

const convertToEdgeConfig = (next: Link): LinkEdgeConfig => {
  return {...next} as LinkEdgeConfig
};

export const convertToData = (cards: Card[], links: Link[]): GraphData => {
  return {
    nodes: cards.map(convertToNodeConfig),
    edges: links.map(convertToEdgeConfig),
  }
};
