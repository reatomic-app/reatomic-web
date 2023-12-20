import type { Card, CardNodeConfig, LinkEdgeConfig, Link } from '../../../domain';
import type { GraphData } from '@antv/g6/lib';


function convertToNodeConfig(cards: Cards[]): CardNodeConfig[] {
  const result = [] as CardNodeConfig[];
  const positionX = {
    "data-source": 0,
    "fact": 0,
    "insight": 0,
    "conclusion": 0
  };
  const positionY = {
    "data-source": 10,
    "fact": 10 + 260 * 1 + 10 * 1,
    "insight": 10 + 260 * 2 + 10 * 2,
    "conclusion": 10 + 260 * 3 + 10 * 3,
  };

  for (const next of cards) {
    const cardConf = {
      type: next.cardType,
      ...next,
      size: [200, 260],
      x: positionX[next.cardType] + 10,
      y: positionY[next.cardType]
    };
    result.push(cardConf);
    positionX[next.cardType] = cardConf.x + 200;
  }
  return result;
}

function convertToEdgeConfig(links: Link): LinkEdgeConfig[] {
  const result = [] as LinkEdgeConfig[];

  for (const next of links) {
    result.push({
      ...next,
      sourceAnchor: 2,
      targetAnchor: 0,
    });
  }

  return result;
};

export const convertToData = (cards: Card[], links: Link[]): GraphData => {
  try {
    const result = {
      nodes: convertToNodeConfig(cards),
      edges: convertToEdgeConfig(links),
    };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
