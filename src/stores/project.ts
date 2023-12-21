import { ref, computed } from 'vue'
import * as http from "../http";
import { defineStore } from 'pinia'
import type { Data, Project, ProjectFull, Card, Link } from "../domain";


interface State {
  projectList: Data<Project[]>;
  current: Data<ProjectFull>;
  cardData: Record<string, Data<string>>;
}

export const projectStore = defineStore('project', {
  state: () => ({
    projectList: {
      state: "empty"
    },
    current: {
      state: "empty"
    },
    cardData: {}
  } as State),

  getters: {
    datasources: (state) => state.current.data?.cards?.filter((c) => c.cardType === 'data-source')
  },
  
  actions: {
    async fetchProjectList() {
       http.load(this.projectList, () => http.fetchProjectList());
    },
    async createProject(project: Project): Promise<Project> {
      const result = await http.createProject(project);
      if (this.projectList.data) {
        this.projectList.data = [ result, ...this.projectList.data ];
      }
      return result;
    },
    async fetchProjectDetail(id: string) {
      http.load(this.current, () => http.fetchProjectDetail(id));
    },
    async fetchCardData(projectId: string, cardId: string) {
      if (!this.cardData[cardId]) {
        this.cardData[cardId] = {
          state: "empty"
        }
      }
      http.load(this.cardData[cardId], () => http.fetchCardData(projectId, cardId));
    },
    async updateCardData(projectId: string, cardId: string, data: string) {
      http.updateCardData(projectId, cardId, data);
    },
    async addCard(card: Card) {
      if (this.current.state === "fetched" && this.current.data) {
        const projectId = this.current.data.id;
        const result = await http.createCard(projectId, card);
        this.current.data.cards?.push(result);
        return result;
      }
    },
    async addLink(sourceId: string, targetId: string) {
      if (this.current.state === "fetched" && this.current.data) {
        const projectId = this.current.data.id;
        const result = await http.createLink(projectId, sourceId, targetId);
        this.current.data.links?.push(result);
      }
    },
    async updateCard(card: Card) {
      if (this.current.state === "fetched" && this.current.data) {
        const projectId = this.current.data.id;
        const newCard = await http.updateCard(projectId, card);
        this.current.data.cards?.map((it) => {
          if (it.id !== card.id) {
            return newCard;
          } else {
            return it;
          }
        });
      }
    },
    async removeCard(card: Card) {
      if (this.current.state === "fetched" && this.current.data) {
        const projectId = this.current.data.id;
        await http.removeCard(projectId, card);
        this.current.data.cards?.filter((it) => it.id !== card.id);
      }
    },
    async removeLink(link: Link) {
      if (this.current.state === "fetched" && this.current.data) {
        const projectId = this.current.data.id;
        await http.removeLink(projectId, link);
        this.current.data?.links?.filter((it) => it.source !== link.source || it.target !== link.target);
      }
    },
  }
});
