import type { ModelConfig, IShape, IGroup } from "@antv/g6/lib";
import type { ShapeAttrs } from "@antv/g-base/lib";
import icons from "./icons";

export interface ReatomicModel extends ModelConfig {
  description: string;
  cardType: string;
  dataSourceType: string;
  factType: string;
  insightType: string;
  date: Date;
  url: string;
}

export interface CardColors {
  principal: string;
  text: string;
  shadow: string;
}

export const resolveWidth = (dimensions: number | number[] | undefined): number => {
  return dimensions
    ? typeof(dimensions) === "number"
    ? dimensions
    : dimensions[0]
  : 0;
}

export const resolveHeight = (dimensions: number | number[] | undefined): number => {
  return dimensions
    ? typeof(dimensions) === "number"
    ? dimensions
    : dimensions[1]
  : 0;
}

export interface TextLines {
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

export const createContentCard = (cfg: ReatomicModel, group: IGroup, colors: CardColors): IShape => {
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
    textBaseline: "middle" as ShapeAttrs['textBaseline'],
    fill: colors.text,
    cursor: 'pointer',
  };

  const backgroundGroup = group.addGroup({
    id: "background",
    draggable: true
  });

  // BACKGROUND
  const container = backgroundGroup.addShape('rect', {
    attrs: {
      x,
      y,
      width,
      height,
      fill: colors.principal,
      radius: 20,
    },
    name: "card",
  });

  // BACKGROUND_DOWN
  backgroundGroup.addShape('rect', {
    attrs: {
      x,
      y,
      width,
      height: height + (height * 0.05),
      fill: colors.shadow,
      radius: 20,
    },
    name: "card",
    draggable: true
  });

  // FOREGROUND
  const foregroundGroup = group.addGroup({
    id: "foreground",
    draggable: true
  });

  foregroundGroup.addShape('rect', {
    attrs: {
      x: x + (width * 0.0075),
      y: y + (height * 0.0075),
      width: width - (width * 0.015),
      height: height - (height * 0.015),
      fill: "#FFF",
      radius: 20,
    },
    name: "card",
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line1,
      x: x + (width * 0.1),
      y: y + (height * 0.32),
      ...commonTextAttrs,
    },
    name: 'text-line-1',
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line2,
      x: x + (width * 0.1),
      y: y + (height * 0.385),
      ...commonTextAttrs,
    },
    name: 'text-line-2',
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line3,
      x: x + (width * 0.1),
      y: y + (height * 0.45),
      ...commonTextAttrs,
    },
    name: 'text-line-3',
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line4,
      x: x + (width * 0.1),
      y: y + (height * 0.52),
      ...commonTextAttrs,
    },
    name: 'text-line-4',
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line5,
      x: x + (width * 0.1),
      y: y + (height * 0.59),
      ...commonTextAttrs,
    },
    name: 'text-line-5',
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line6,
      x: x + (width * 0.1),
      y: y + (height * 0.66),
      ...commonTextAttrs,
    },
    name: 'text-line-6',
  });
  foregroundGroup.addShape('text', {
    attrs: {
      text: textLines.line7,
      x: x + (width * 0.1),
      y: y + (height * 0.73),
      ...commonTextAttrs,
    },
    name: 'text-line-7',
  });

  if (cfg.url) {
    foregroundGroup.addShape('text', {
      attrs: {
        text: "source",
        class: "card-text",
        x: x + (width - (width * 0.3)),
        y: y + (height - (height * 0.09)),
        textAnchor: "middle",
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: "Cabin",
        textBaseline: 'middle',
        fill: colors.text,
        cursor: 'pointer',
      },
      name: 'source',
    });
  }

  // const plusBtn = group.addGroup({
  //   id: "plusBtn"
  // });

  // plusBtn.addShape('circle', {
  //   attrs: {
  //     x: x + (width / 2),
  //     y: y + height,
  //     fill: "red",
  //     r: 20,
  //   },
  //   name: "buttonBackground",
  // });

  const plusBtn = group.addGroup({
    id: "plusBtn",
    attrs: {
      opacity: 0,
      cursor: "pointer"
    }
  });

  const circleX = x + (width / 2);
  const circleY = y + height;

  plusBtn.addShape('circle', {
    attrs: {
      x: circleX,
      y: circleY,
      fill: "white",
      stroke: colors.principal,
      lineWidth: 3,
      r: 20,
      cursor: "pointer"
    },
    name: "buttonBackground",
  });

  plusBtn.addShape("image", {
    attrs: {
      x: circleX - 15,
      y: circleY - 15,
      width: 30,
      height: 30,
      img: icons.PlusIcon(colors.text),
      cursor: "pointer"
    },
    name: "plus-icon-image"
  });
  
  return container;
};
