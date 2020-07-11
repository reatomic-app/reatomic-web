
import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "@/store";
import { Project } from "@/reatomic/projects/domain";
import { CreateProjectUseCase, CreateProjectInput } from '../CreateProjectUseCase';


@Module({ stateFactory: true, dynamic: true, namespaced: true, name: "projects:create", store })
export class CreateProjectStore extends VuexModule implements CreateProjectUseCase {
    public project: Project | null = null;

    @Mutation
    public setProject(project: Project) {
        this.project = project;
    }

    @Action({ commit: "setProject" })
    public create(input: CreateProjectInput) {
        return input;
    }
}

export default getModule(CreateProjectStore);