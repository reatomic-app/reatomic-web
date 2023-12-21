
import type { Data, Project, ProjectFull, Card, Link } from "./domain";

const BASE = "http://localhost:3000"

async function query<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE}/${url}`, {
    method: "get",
    mode: "cors",
  });
  if (response.status >= 400) {
    throw new Error("Error: " + response.status + " " + response.statusText);
  }
  return response.json() as T;
}

async function post<Response>(
  url: string, data: unknown
): Promise<Response> {
  const response = await fetch(`${BASE}/${url}`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status >= 400) {
    throw new Error("Error: " + response.status + " " + response.statusText);
  }
  return response.json() as Response;
}

async function put<Response>(
  url: string, data: unknown
): Promise<Response> {
  const response = await fetch(`${BASE}/${url}`, {
    method: "put",
    mode: "cors",
    body: JSON.stringify(data),
  });
  if (response.status >= 400) {
    throw new Error("Error: " + response.status + " " + response.statusText);
  }
  return response.json() as Response;
}

async function del(url: string): Promise<boolean> {
  await fetch(`${BASE}/${url}`, {
    method: "delete",
    mode: "cors"
  });
  if (response.status >= 400) {
    throw new Error("Error: " + response.status + " " + response.statusText);
  }
  return true;
}

export async function load<T>(data: Data<T>, valfn: () => Promise<T>) {
  data.state = 'loading';
  try {
    const value = await valfn();
    data.data = value;
    data.state = "fetched";
  } catch(err) {
    console.error(err);
    data.state = "error";
    data.error = err;
  }
}

export async function fetchProjectList(): Promise<Project[]> {
  const data = await query<{result: Project[]}>("projects");
  return data.result.reverse();
}

export async function fetchProjectDetail(id: string): Promise<ProjectFull> {
  const project = await query(`projects/${id}`);

  project.cards?.map((it: Card) => {
    it.date = it.date ? new Date(it.date) : undefined;
    return it;
  });

  return project;
}

export async function createProject(project: Project): Promise<Project> {
  return post(`projects`, project);
}

export async function createCard(projectId: string, card: Card): Promise<Card> {
  const result = await post(`projects/${projectId}/cards`, card);
  result.date = result.date ? new Date(result.date) : undefined;
  return result;
}

export async function createLink(projectId: string, source: string, target: string): Promise<Link> {
  return post(`projects/${projectId}/links`, { source, target });
}

export async function updateCard(projectId: string, card: Card): Promise<Card> {
  const result = await post(`projects/${projectId}/cards/${card.id}`, card);
  result.date = result.date ? new Date(result.date) : undefined;
  return result;
}

export async function removeCard(projectId: string, card: Card): Promise<boolean> {
  return del(`projects/${projectId}/cards/${card.id}`);
}

export async function removeLink(projectId: string, link: Link): Promise<boolean> {
  return del(`projects/${projectId}/links/${link.source}/${link.target}`);
}
