import { Project } from "@/reatomic/projects/domain";

export interface CreateProjectInput {
    name: string;
    description: string;
}

export interface CreateProjectUseCase {
    create: (input: CreateProjectInput) => Project;
}