import { ModelConfig } from "@antv/g6/lib/types";

export interface ReatomicModel extends ModelConfig {
  description: string;
  cardType: string;
  dataSourceType: string;
  factType: string;
  insightType: string;
  date: Date;
  url: string;
}
