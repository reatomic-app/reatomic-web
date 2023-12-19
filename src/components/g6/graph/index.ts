import type { Card, CardNodeConfig, LinkEdgeConfig, Link } from '../../../domain';
import type { GraphData } from '@antv/g6/lib';

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
