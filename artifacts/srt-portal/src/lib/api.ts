export type Lead = {
  id: number;
  leadNumber: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  source: string;
  requirement: string;
  estimatedValue: number;
  status: string;
  assignedToId: number | null;
  assignedToName: string | null;
  nextFollowUpDate: string | null;
  notes: string | null;
  createdAt: string;
};

export type Followup = {
  id: number;
  entityType: "ticket" | "lead";
  entityId: number;
  action: string;
  note: string;
  byEmployeeId: number | null;
  byEmployeeName: string | null;
  nextActionDate: string | null;
  createdAt: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  listLeads: () => request<Lead[]>("/leads"),
  getLead: (id: number) => request<Lead>(`/leads/${id}`),
  createLead: (body: Partial<Lead>) =>
    request<Lead>("/leads", { method: "POST", body: JSON.stringify(body) }),
  updateLead: (id: number, body: Partial<Lead>) =>
    request<Lead>(`/leads/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  leadsSummary: () =>
    request<{
      total: number;
      byStatus: { status: string; count: number; value: number }[];
      hotLeads: number;
      pipelineValue: number;
      wonValue: number;
    }>("/leads/summary"),

  listFollowups: (entityType: "ticket" | "lead", entityId: number) =>
    request<Followup[]>(`/followups?entityType=${entityType}&entityId=${entityId}`),
  createFollowup: (body: {
    entityType: "ticket" | "lead";
    entityId: number;
    action: string;
    note: string;
    byEmployeeId?: number | null;
    nextActionDate?: string | null;
  }) =>
    request<Followup>("/followups", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
