import { ModelConfig } from '@antv/g6/lib/types';
import Group from '@antv/g-canvas/lib/group';
import { IShape } from "@antv/g-base/lib/interfaces";
import { createIcon } from "./icons";

const resolveWidth = (dimensions: number | number[] | undefined): number => {
    return dimensions 
        ? typeof(dimensions) === "number" 
        ? dimensions 
        : dimensions[0]
        : 0;
}

const resolveHeight = (dimensions: number | number[] | undefined): number => {
    return dimensions 
        ? typeof(dimensions) === "number" 
        ? dimensions 
        : dimensions[1]
        : 0;
}

export const createContentCard = (cfg: ReatomicModel, group: Group, colors: CardColors): IShape => {
    const width = resolveWidth(cfg.size);
    const height = resolveHeight(cfg.size);

    console.log({width, height});

    const x = cfg.x || 0;
    const y = cfg.y || 0;
    // BACKGROUND
    const container = group.addShape('rect', {
        attrs: {
            x,
            y,
            width,
            height,                
            fill: colors.principal,
            stroke: 0,
            radius: 20,
        },            
        name: "card",
        draggable: true
    });  
    // BACKGROUND_DOWN
    group.addShape('rect', {
        attrs: {
            x,
            y,
            width,
            height: height + (height * 0.05),                
            fill: colors.shadow,
            // "rgba(196, 191, 217, 0.5)"
            stroke: 0,
            radius: 20,
        },
        
        name: "card",
        draggable: true
    });              
    // FOREGROUND
    group.addShape('rect', {
        attrs: {
            x: x + (width * 0.0075),
            y: y + (height * 0.0075),
            width: width - (width * 0.015),
            height: height - (height * 0.015),                
            fill: "#FFF",
            stroke: 0,
            radius: 20,
        },
        
        name: "card",
        draggable: true
    });  
    group.addShape('text', {
        attrs: {
            text: "A 7 neurologos",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.32),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-1',
    });        
    group.addShape('text', {
        attrs: {
            text: "implicados en el",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.385),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-2',
    });        
    group.addShape('text', {
        attrs: {
            text: "proyecto, con",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.45),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-3',
    });                
    group.addShape('text', {
        attrs: {
            text: "wireframes de apoyo.",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.52),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-4',
    });        
    group.addShape('text', {
        attrs: {
            text: "dfajspianpisjnd adfd",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.59),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-5',
    });            
    group.addShape('text', {
        attrs: {
            text: "dfajspianpisjnd adfd",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.66),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-6',
    });            
    group.addShape('text', {
        attrs: {
            text: "dfajspianpisjnd adfd",
            class: "card-text",
            x: x + (width * 0.1),
            y: y + (height * 0.73),
            textAnchor: "middle",
            fontSize: 16,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'text-line-7',
    });                    
    group.addShape('text', {
        attrs: {
            text: "source",
            class: "card-text",
            x: x + (width - (width * 0.34)),
            y: y + (height - (height * 0.1)),
            textAnchor: "middle",
            fontWeight: "bold",
            fontSize: 14,
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'source',
    });           

    return container;
};

export const createDataSourceCard = (cfg: ReatomicModel, group: Group, colors: CardColors): IShape => {
    const x = cfg.x || 0;
    const y = cfg.y || 0;
    const width = resolveWidth(cfg.size);
    const height = resolveHeight(cfg.size);

    const container = createContentCard(cfg, group, colors);

    group.addShape('text', {
        attrs: {
            text: "Entrevista",
            x: x + (width * 0.1),
            y: y + (height * 0.12),
            textAnchor: "middle",
            fontSize: 18,
            fontWeight: "bold",
            textBaseline: 'middle',
            fill: '#413673',
            cursor: 'pointer',
          },
          name: 'ip-text-shape',
    });                
    group.addShape('text', {
        attrs: {
            text: "29/03/2020",
            x: x + (width * 0.1),
            y: y + (height * 0.185),
            textAnchor: "middle",
            fontSize: 14,
            fontWeight: "bold",
            textBaseline: 'middle',
            fill: 'rgba(196, 191, 217, 1)',
            cursor: 'pointer',
          },
          name: 'ip-text-shape',
    });                        

    return container;
}

interface CardColors {
    principal: string;
    text: string;
    shadow: string;
}

interface FactAttrs {
    colors: CardColors;
    iconType: string;
}

export const createFactCard = (cfg: ReatomicModel, group: Group, attrs: FactAttrs): IShape => {
    const x = cfg.x || 0;
    const y = cfg.y || 0;
    const width = resolveWidth(cfg.size);
    const height = resolveHeight(cfg.size);

    const container = createContentCard(cfg, group, attrs.colors);
    createIcon(x, y, group, width, height, attrs.iconType);
    return container;
}

interface ReatomicModel extends ModelConfig {
    cardType: string;
    factType: string;
    insightType: string;
}

const resolveFactCard = (cfg: ReatomicModel, group: Group): any => {
    const facts = {
        colors: {
            principal: "#CDE4E4",
            shadow: "#F5F9F9",
            text: "#479696"
        },
        iconType: cfg.factType,
    };

    return createFactCard(cfg, group, facts)
}

const resolveExperimentCard = (cfg: ReatomicModel, group: Group): any => {
    const colors = {
        principal: "#C4BFD9",
        shadow: "#F0EEF7",
        text: "#413673"
    };
    return createDataSourceCard(cfg, group, colors);
};

const resolveInsightCard = (cfg: ReatomicModel, group: Group): any => {    
    const x = cfg.x || 0;
    const y = cfg.y || 0;

    const high = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZERDRFMyIvPgo8L3N2Zz4K";
    const low = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZFRjZENiIvPgo8L3N2Zz4K";
    const medium = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZERUFENCIvPgo8L3N2Zz4K";

    const cardColors = {
        principal: "#FEF1F8",
        shadow: "#FEF1F8",
        text: "#C93F8D",
    };

    const values = {
        high: {
            text: "high",
            image: high,
        },
        medium: {
            text: "medium",
            image: medium,
        },
        low: {
            text: "low",
            image: low,
        }
    }

    const resolved = cfg.insightType === "high" 
        ? values.high 
        : cfg.insightType === "low"
        ? values.low 
        : values.medium;

    const container = createContentCard(cfg, group, cardColors);
    group.addShape("image", {
        attrs: {
            x: x + (200 - 88),
            y, 
            width: 88,
            height: 36,
            img: resolved.image,
        }
    });

    group.addShape("text", {
        attrs: {
            x: x + (200 - (56 + resolved.text.length)),
            y: y + 20, 
            width: 88,
            height: 36,
            textAnchor: "middle",
            fontSize: 12,
            fontWeight: "normal",
            textBaseline: 'middle',
            fill: '#F60057',            
            text: resolved.text,
        }
    });    
    
    return container;
};

const resolveConclusionCard = (cfg: ReatomicModel, group: Group): any => {
    const cardColors = {
        principal: "#FFE0DB",
        shadow: "#FFE0DB",
        text: "#FF5345",
    };

    return createContentCard(cfg, group, cardColors);
};

const resolveCard = (cfg: ReatomicModel, group: Group): any => {
    switch(cfg.cardType) {
        case "fact": return resolveFactCard(cfg, group);
        case "insight": return resolveInsightCard(cfg, group);
        case "conclusion": return resolveConclusionCard(cfg, group);
        default: 
            return resolveExperimentCard(cfg, group);
    }
}

export const CardNode: any = {
    draw: (cfg: ReatomicModel, group: Group) => {   
        return resolveCard(cfg, group);
    },
};

