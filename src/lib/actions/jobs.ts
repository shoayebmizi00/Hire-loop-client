"use server";

import { revalidatePath } from "next/cache";

// Where the Express backend (hire-loop-server) is running.
// You can override it in the client's .env with NEXT_PUBLIC_API_URL
const API_URL = process.env.BASE_API_URL ?? "http://localhost:5000";

// One job, exactly the shape the pages expect
export type Job = {
  id: string;
  title: string;
  company: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: number | null;
  maxSalary: number | null;
  payFrequency: string;
  responsibilities: string;
  qualifications: string;
  createdAt: string;
};

// FormData (what the form gives us) -> plain object, so it's easy to read
function formToObject(data: FormData) {
  return Object.fromEntries(data.entries());
}

// Create a job — sends JSON to POST /jobs on the Express server
export const createJob = async (data: FormData) => {
  try {
    const form = formToObject(data);

    const job = {
      title: String(form.title ?? ""),
      company: String(form.company ?? ""),
      category: String(form.category ?? ""),
      // from the hidden inputs (React state)
      jobType: String(form.jobType ?? ""),
      isRemote: form.isRemote === "true",
      location: String(form.location ?? ""),
      deadline: String(form.deadline ?? ""),
      minSalary: Number(form.minSalary) || null,
      maxSalary: Number(form.maxSalary) || null,
      payFrequency: String(form.payFrequency ?? ""),
      responsibilities: String(form.responsibilities ?? ""),
      qualifications: String(form.qualifications ?? ""),
      // NOTE: no createdAt here — the server sets it now
    };

    const res = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    if (!res.ok) return { success: false };

    const created = await res.json();
    return { success: true, id: created.id as string };
  } catch (error) {
    console.error("Create job error:", error);
    return { success: false };
  }
};

// Read all jobs (newest first) for the manage-jobs table
export const getJobs = async (): Promise<Job[]> => {
  try {
    const res = await fetch(`${API_URL}/jobs`, { cache: "no-store" });

    if (!res.ok) return [];

    // the server sends Mongo docs: "_id" + ISO date strings
    const docs = (await res.json()) as Array<Record<string, unknown>>;

    // turn each doc into the plain object the pages can render
    return docs.map((doc) => ({
      id: String(doc._id),
      title: doc.title as string,
      company: doc.company as string,
      category: doc.category as string,
      jobType: doc.jobType as string,
      isRemote: doc.isRemote as boolean,
      location: doc.location as string,
      deadline: (doc.deadline as string) ?? "",
      minSalary: (doc.minSalary as number | null) ?? null,
      maxSalary: (doc.maxSalary as number | null) ?? null,
      payFrequency: (doc.payFrequency as string) ?? "",
      responsibilities: (doc.responsibilities as string) ?? "",
      qualifications: (doc.qualifications as string) ?? "",
      createdAt: String(doc.createdAt ?? new Date().toISOString()),
    }));
  } catch (error) {
    console.error("Get jobs error:", error);
    return [];
  }
};

// Update one job by id (only fields present in the FormData are changed)
export const updateJob = async (id: string, data: FormData) => {
  try {
    const form = formToObject(data);

    const updates: Record<string, unknown> = {};

    if (form.title) updates.title = String(form.title);
    if (form.company) updates.company = String(form.company);
    if (form.category) updates.category = String(form.category);
    if (form.jobType) updates.jobType = String(form.jobType);
    if ("isRemote" in form) updates.isRemote = form.isRemote === "true";
    if (form.location) updates.location = String(form.location);
    if (form.deadline) updates.deadline = String(form.deadline);
    if (form.minSalary) updates.minSalary = Number(form.minSalary) || null;
    if (form.maxSalary) updates.maxSalary = Number(form.maxSalary) || null;
    if (form.payFrequency) updates.payFrequency = String(form.payFrequency);
    if (form.responsibilities)
      updates.responsibilities = String(form.responsibilities);
    if (form.qualifications)
      updates.qualifications = String(form.qualifications);

    const res = await fetch(`${API_URL}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) return { success: false };

    // tell Next.js to re-render the manage-jobs table
    revalidatePath("/dashboard/recruiter/manage-jobs");

    return { success: true };
  } catch (error) {
    console.error("Update job error:", error);
    return { success: false };
  }
};

// Delete one job by id
export const deleteJob = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/jobs/${id}`, { method: "DELETE" });

    if (!res.ok) return { success: false };

    // tell Next.js to re-render the manage-jobs table
    revalidatePath("/dashboard/recruiter/manage-jobs");

    return { success: true };
  } catch (error) {
    console.error("Delete job error:", error);
    return { success: false };
  }
};
