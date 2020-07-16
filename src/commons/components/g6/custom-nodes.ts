import Group from '@antv/g-canvas/lib/group';
import { IShape } from "@antv/g-base/lib/interfaces";
import { createIcon } from "./icons";
import VueI18n from 'vue-i18n';
import { ReatomicModel } from "./custom-model";

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

interface TextLines {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
}

// inspired by https://j11y.io/snippets/wordwrap-for-javascript/
const convertTextToLines = (text: string, width = 20): TextLines => {
    if (!text) {
        return {
            line1: "", line2: "", line3: "", line4: "", line5: "", line6: "", line7: ""
        };
    }

    /* eslint-disable no-useless-escape */
    const regex = '.{1,' +width+ '}(\s|$)' + '|.{' +width+ '}|.+$';
    /* eslint-enable no-useless-escape */
    const found = text.match(RegExp(regex, 'g'));

    return {
        line1: found && found.length >= 1 ? found[0].trim() : "",
        line2: found && found.length >= 2 ? found[1].trim() : "",
        line3: found && found.length >= 3 ? found[2].trim() : "",
        line4: found && found.length >= 4 ? found[3].trim() : "",
        line5: found && found.length >= 5 ? found[4].trim() : "",
        line6: found && found.length >= 6 ? found[5].trim() : "",
        line7: found && found.length >= 7 ? found[6].trim() : "",
    }
};

export const createContentCard = (cfg: ReatomicModel, group: Group, colors: CardColors): IShape => {
    const width = resolveWidth(cfg.size);
    const height = resolveHeight(cfg.size);
    const x = cfg.x || 0;
    const y = cfg.y || 0;
    const textLines: TextLines = convertTextToLines(cfg.description);
    const commonTextAttrs = {
        class: "card-text",
        textAnchor: "middle",
        fontSize: 14,
        fontFamily: "Cabin",
        textBaseline: 'middle',
        fill: colors.text,
        cursor: 'pointer',
    };

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
            text: textLines.line1,
            x: x + (width * 0.1),
            y: y + (height * 0.32),
            ...commonTextAttrs,
          },
          name: 'text-line-1',
    });
    group.addShape('text', {
        attrs: {
            text: textLines.line2,
            x: x + (width * 0.1),
            y: y + (height * 0.385),
            ...commonTextAttrs,
          },
          name: 'text-line-2',
    });
    group.addShape('text', {
        attrs: {
            text: textLines.line3,
            x: x + (width * 0.1),
            y: y + (height * 0.45),
            ...commonTextAttrs,
          },
          name: 'text-line-3',
    });
    group.addShape('text', {
        attrs: {
            text: textLines.line4,
            x: x + (width * 0.1),
            y: y + (height * 0.52),
            ...commonTextAttrs,
          },
          name: 'text-line-4',
    });
    group.addShape('text', {
        attrs: {
            text: textLines.line5,
            x: x + (width * 0.1),
            y: y + (height * 0.59),
            ...commonTextAttrs,
          },
          name: 'text-line-5',
    });
    group.addShape('text', {
        attrs: {
            text: textLines.line6,
            x: x + (width * 0.1),
            y: y + (height * 0.66),
            ...commonTextAttrs,
          },
          name: 'text-line-6',
    });
    group.addShape('text', {
        attrs: {
            text: textLines.line7,
            x: x + (width * 0.1),
            y: y + (height * 0.73),
            ...commonTextAttrs,
          },
          name: 'text-line-7',
    });
    group.addShape('text', {
        attrs: {
            text: "source",
            class: "card-text",
            x: x + (width - (width * 0.3)),
            y: y + (height - (height * 0.09)),
            textAnchor: "middle",
            fontWeight: "600",
            fontSize: 14,
            fontFamily: "Cabin",
            textBaseline: 'middle',
            fill: colors.text,
            cursor: 'pointer',
          },
          name: 'source',
    });

    return container;
};

export const createDataSourceCard = (cfg: ReatomicModel, group: Group, colors: CardColors, i18n: VueI18n): IShape => {
    const x = cfg.x || 0;
    const y = cfg.y || 0;
    const width = resolveWidth(cfg.size);
    const height = resolveHeight(cfg.size);

    const container = createContentCard(cfg, group, colors);

    group.addShape('text', {
        attrs: {
            text: cfg.dataSourceType,
            x: x + (width * 0.1),
            y: y + (height * 0.12),
            textAnchor: "middle",
            fontSize: 20,
            fontFamily: "Cabin",
            fontWeight: "bold",
            textBaseline: 'middle',
            fill: '#413673',
            cursor: 'pointer',
          },
          name: 'ip-text-shape',
    });
    group.addShape('text', {
        attrs: {
            text: i18n.d(cfg.date, "short", "es-ES"),
            x: x + (width * 0.1),
            y: y + (height * 0.21),
            textAnchor: "middle",
            fontSize: 14,
            fontFamily: "Cabin",
            fontWeight: "normal",
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

const resolveFactCard = (cfg: ReatomicModel, group: Group, i18n: VueI18n): any => {
    const facts = {
        colors: {
            principal: "#CDE4E4",
            shadow: "#CDE4E4",
            text: "#479696"
        },
        iconType: cfg.factType,
    };

    return createFactCard(cfg, group, facts)
}

const resolveExperimentCard = (cfg: ReatomicModel, group: Group, i18n: VueI18n): any => {
    const colors = {
        principal: "#C4BFD9",
        shadow: "#C4BFD9",
        text: "#413673"
    };
    return createDataSourceCard(cfg, group, colors, i18n);
};

const resolveInsightCard = (cfg: ReatomicModel, group: Group, i18n: VueI18n): any => {
    const x = cfg.x || 0;
    const y = cfg.y || 0;

    const high = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZERDRFMyIvPgo8L3N2Zz4K";
    const low = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZFRjZENiIvPgo8L3N2Zz4K";
    const medium = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZERUFENCIvPgo8L3N2Zz4K";

    const cardColors = {
        principal: "#F1DAE7",
        shadow: "#F1DAE7",
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
            y: y + 24,
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

const resolveConclusionCard = (cfg: ReatomicModel, group: Group, i18n: VueI18n): any => {
    const cardColors = {
        principal: "#FFD3CC",
        shadow: "#FFD3CC",
        text: "#FF5345",
    };

    return createContentCard(cfg, group, cardColors);
};

const resolveCard = (cfg: ReatomicModel, group: Group, i18n: VueI18n): any => {
    switch(cfg.cardType) {
        case "fact": return resolveFactCard(cfg, group, i18n);
        case "insight": return resolveInsightCard(cfg, group, i18n);
        case "conclusion": return resolveConclusionCard(cfg, group, i18n);
        default:
            return resolveExperimentCard(cfg, group, i18n);
    }
}

export const CardNode = (i18n: VueI18n): any => {
  return {
    draw: (cfg: ReatomicModel, group: Group) => {
        return resolveCard(cfg, group, i18n);
    },
    getAnchorPoints: () => {
      return [
        [0.5, 0], // middle of top side
        [1, 0.5], // middle of right side
        [0.5, 1.05], // middle of bottom side
        [0, 0.5], // middle of left side
      ];
    },
  };
}

