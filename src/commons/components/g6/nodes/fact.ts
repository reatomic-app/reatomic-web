import Group from "@antv/g-canvas/lib/group";
import { ShapeOptions } from "@antv/g6/lib/interface/shape";
import {
  ReatomicModel,
  resolveWidth,
  resolveHeight,
  createContentCard
} from "./base";

const icons = {
    HAPPY: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMiAyMkMxNy41MjI4IDIyIDIyIDE3LjUyMjggMjIgMTJDMjIgNi40NzcxNSAxNy41MjI4IDIgMTIgMkM2LjQ3NzE1IDIgMiA2LjQ3NzE1IDIgMTJDMiAxNy41MjI4IDYuNDc3MTUgMjIgMTIgMjJaIiBzdHJva2U9IiM0Nzk2OTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04IDE0QzggMTQgOS41IDE2IDEyIDE2QzE0LjUgMTYgMTYgMTQgMTYgMTQiIHN0cm9rZT0iIzQ3OTY5NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTkgOUg5LjAxIiBzdHJva2U9IiM0Nzk2OTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNSA5SDE1LjAxIiBzdHJva2U9IiM0Nzk2OTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgoK",
    SAD: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMiAyMkMxNy41MjI4IDIyIDIyIDE3LjUyMjggMjIgMTJDMjIgNi40NzcxNSAxNy41MjI4IDIgMTIgMkM2LjQ3NzE1IDIgMiA2LjQ3NzE1IDIgMTJDMiAxNy41MjI4IDYuNDc3MTUgMjIgMTIgMjJaIiBzdHJva2U9IiM0Nzk2OTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNiAxNkMxNiAxNiAxNC41IDE0IDEyIDE0QzkuNSAxNCA4IDE2IDggMTYiIHN0cm9rZT0iIzQ3OTY5NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTkgOUg5LjAxIiBzdHJva2U9IiM0Nzk2OTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNSA5SDE1LjAxIiBzdHJva2U9IiM0Nzk2OTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
    QUOTE: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMCkiPgo8cGF0aCBkPSJNMjMuNTU3IDEyLjA0OTdDMjIuODk0NSAxMC43NzYyIDIxLjc5MjggOS44MTkyNCAyMC40NDQ4IDkuMzQyODdDMjAuNDY0NSA5LjI1NTU1IDIwLjQ5NTYgOS4xMzY0NiAyMC41NDQ4IDguOTc1NDhDMjAuNzQ2NSA4LjMxNTk5IDIxLjg2NDEgNi40NTQyMiAyMi41MjEyIDUuNDM1NjRMMjMuMTkzNiA0LjM5MzQ0TDE5LjI2NzUgMy4xOTMxTDE4Ljg3NDkgMy41MzY0NEMxOC43MTkyIDMuNjcyNjUgMTUuMDM5NSA2Ljk0MTk1IDEzLjE4NzMgMTMuMDAwMkMxMi4yODA0IDE1Ljk2NjMgMTMuOTU1OCAxOS4xMTcyIDE2LjkyMTkgMjAuMDI0QzE5Ljg4OCAyMC45MzA4IDIzLjAzODkgMTkuMjU1NSAyMy45NDU3IDE2LjI4OTRDMjQuMzc5MyAxNC44NzEgMjQuMjQxMyAxMy4zNjU0IDIzLjU1NyAxMi4wNDk3Wk0xNy40NzAxIDE4LjIzMDlDMTUuNDkyNyAxNy42MjY0IDE0LjM3NTggMTUuNTI1OCAxNC45ODAzIDEzLjU0ODRDMTYuMzQxNSA5LjA5NjIgMTguODIwOSA2LjI1MDgxIDE5Ljc0NzUgNS4zMDA1NEwyMC4yOTEyIDUuNDY2NzdDMTkuNzI0MSA2LjQwMDM3IDE4Ljk3MDUgNy43MTE4OSAxOC43NTE4IDguNDI3MjlDMTguNTc4MiA4Ljk5NDk3IDE4LjQ4MDkgOS40NjM5MiAxOC41NzAzIDkuOTA3NTFDMTguNjUgMTAuMzAyNiAxOC45MDk5IDEwLjgyMzcgMTkuNjk0OSAxMS4wNjg0TDE5LjczMzcgMTEuMDgxM0MyMS42NjA0IDExLjcxMTUgMjIuNzQ1NSAxMy44MDE4IDIyLjE1MjYgMTUuNzQxMkMyMS41NDgxIDE3LjcxODYgMTkuNDQ3NSAxOC44MzU1IDE3LjQ3MDEgMTguMjMwOVoiIGZpbGw9IiM0Nzk2OTYiLz4KPHBhdGggZD0iTTEwLjgwNyAxMi4wNDk3QzEwLjE0NDUgMTAuNzc2MiA5LjA0Mjc3IDkuODE5MjQgNy42OTQ4MiA5LjM0Mjg3QzcuNzE0NDYgOS4yNTU1NSA3Ljc0NTYzIDkuMTM2NDYgNy43OTQ4NCA4Ljk3NTQ4QzcuOTk2NDcgOC4zMTU5OSA5LjExNDA3IDYuNDU0MjIgOS43NzEyIDUuNDM1NjRMMTAuNDQzNiA0LjM5MzQ0TDYuNTE3NDcgMy4xOTMxTDYuMTI0OTIgMy41MzY0NUM1Ljk2OTIyIDMuNjcyNjUgMi4yODk0NiA2Ljk0MTk1IDAuNDM3MjY0IDEzLjAwMDJDLTAuNDY5NTYzIDE1Ljk2NjMgMS4yMDU3OSAxOS4xMTcyIDQuMTcxODkgMjAuMDI0QzcuMTM3OTkgMjAuOTMwOCAxMC4yODg5IDE5LjI1NTUgMTEuMTk1NyAxNi4yODk0QzExLjYyOTMgMTQuODcxIDExLjQ5MTMgMTMuMzY1NCAxMC44MDcgMTIuMDQ5N1pNNC43MjAwOCAxOC4yMzA5QzIuNzQyNjggMTcuNjI2NCAxLjYyNTc4IDE1LjUyNTggMi4yMzAzNCAxMy41NDg0QzMuNTkxNTEgOS4wOTYyIDYuMDcwOTQgNi4yNTA4MSA2Ljk5NzUxIDUuMzAwNTRMNy41NDEyMiA1LjQ2Njc3QzYuOTc0MDkgNi40MDAzNyA2LjIyMDQ5IDcuNzExODkgNi4wMDE3NyA4LjQyNzI5QzUuODI4MjEgOC45OTQ5NyA1LjczMDkxIDkuNDYzOTIgNS44MjAzMyA5LjkwNzUxQzUuODk5OTYgMTAuMzAyNiA2LjE1OTg2IDEwLjgyMzcgNi45NDQ4OSAxMS4wNjg0TDYuOTgzNzIgMTEuMDgxM0M4LjkxMDQxIDExLjcxMTUgOS45OTU1NCAxMy44MDE4IDkuNDAyNjIgMTUuNzQxMkM4Ljc5ODA3IDE3LjcxODYgNi42OTc0OCAxOC44MzU1IDQuNzIwMDggMTguMjMwOVoiIGZpbGw9IiM0Nzk2OTYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
    HEART: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMC44NCA0LjYwOTk5QzIwLjMyOTIgNC4wOTkgMTkuNzIyOCAzLjY5MzY0IDE5LjA1NTQgMy40MTcwOEMxOC4zODc5IDMuMTQwNTIgMTcuNjcyNSAyLjk5ODE3IDE2Ljk1IDIuOTk4MTdDMTYuMjI3NSAyLjk5ODE3IDE1LjUxMjEgMy4xNDA1MiAxNC44NDQ2IDMuNDE3MDhDMTQuMTc3MiAzLjY5MzY0IDEzLjU3MDggNC4wOTkgMTMuMDYgNC42MDk5OUwxMiA1LjY2OTk5TDEwLjk0IDQuNjA5OTlDOS45MDgzIDMuNTc4MyA4LjUwOTAzIDIuOTk4NyA3LjA1IDIuOTk4N0M1LjU5MDk2IDIuOTk4NyA0LjE5MTY5IDMuNTc4MyAzLjE2IDQuNjA5OTlDMi4xMjgzIDUuNjQxNjkgMS41NDg3MSA3LjA0MDk2IDEuNTQ4NzEgOC40OTk5OUMxLjU0ODcxIDkuOTU5MDMgMi4xMjgzIDExLjM1ODMgMy4xNiAxMi4zOUw0LjIyIDEzLjQ1TDEyIDIxLjIzTDE5Ljc4IDEzLjQ1TDIwLjg0IDEyLjM5QzIxLjM1MSAxMS44NzkyIDIxLjc1NjMgMTEuMjcyOCAyMi4wMzI5IDEwLjYwNTNDMjIuMzA5NSA5LjkzNzg5IDIyLjQ1MTggOS4yMjI0OCAyMi40NTE4IDguNDk5OTlDMjIuNDUxOCA3Ljc3NzUxIDIyLjMwOTUgNy4wNjIxIDIyLjAzMjkgNi4zOTQ2NEMyMS43NTYzIDUuNzI3MTggMjEuMzUxIDUuMTIwNzUgMjAuODQgNC42MDk5OVY0LjYwOTk5WiIgc3Ryb2tlPSIjNDc5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K",
}

const resolveIcon = (key: string): string => {
    switch(key) {
        case "wish": return icons.HEART;
        case "pain": return icons.SAD;
        case "quote": return icons.QUOTE;
        default:
            return icons.HAPPY;
    }
}

export const createIcon = (x: number, y: number, group: Group, width: number, height: number, type: string): void => {
    group.addShape("image", {
        attrs: {
            x: x + (width * 0.1),
            y: y + (height * 0.1),
            width: 25,
            height: 25,
            img: resolveIcon(type),
        },
        name: "fact-type",
    })
}

export const FactNode = (): ShapeOptions => {
  return {
    draw: (cfg: ReatomicModel, group: Group) => {
      const x = cfg.x || 0;
      const y = cfg.y || 0;
      const width = resolveWidth(cfg.size);
      const height = resolveHeight(cfg.size);
      const attrs = {
        colors: {
            principal: "#CDE4E4",
            shadow: "#CDE4E4",
            text: "#479696"
        },
        iconType: cfg.factType,
      };

      const container = createContentCard(cfg, group, attrs.colors);

      if (attrs.iconType) {
        createIcon(x, y, group, width, height, attrs.iconType);
      }

      return container;
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
