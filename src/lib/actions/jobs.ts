"use server";

import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// Same MongoDB the auth uses (URI from .env, db: Hire-Loop)
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Hire-Loop");
const jobs = db.collection("jobs");

export const createJob = async (data: FormData) => {
    try {
        const job = {
            title: String(data.get("title") ?? ""),
            company: String(data.get("company") ?? ""),
            category: String(data.get("category") ?? ""),
            // from the hidden inputs (React state)
            jobType: String(data.get("jobType") ?? ""),
            isRemote: data.get("isRemote") === "true",
            location: String(data.get("location") ?? ""),
            deadline: String(data.get("deadline") ?? ""),
            minSalary: Number(data.get("minSalary")) || null,
            maxSalary: Number(data.get("maxSalary")) || null,
            payFrequency: String(data.get("payFrequency") ?? ""),
            responsibilities: String(data.get("responsibilities") ?? ""),
            qualifications: String(data.get("qualifications") ?? ""),
            createdAt: new Date(),
        };

        const result = await jobs.insertOne(job);

        return { success: true, id: result.insertedId.toString() };
    } catch (error) {
        console.error("Create job error:", error);
        return { success: false };
    }
};

// Read all jobs (newest first) for the manage-jobs table
export const getJobs = async () => {
    try {
        const docs = await jobs
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        // Turn Mongo docs into plain objects the page can render
        return docs.map((doc) => ({
            id: doc._id.toString(),
            title: doc.title as string,
            company: doc.company as string,
            category: doc.category as string,
            jobType: doc.jobType as string,
            isRemote: doc.isRemote as boolean,
            location: doc.location as string,
            deadline: doc.deadline as string,
            minSalary: doc.minSalary as number | null,
            maxSalary: doc.maxSalary as number | null,
            payFrequency: doc.payFrequency as string,
            responsibilities: doc.responsibilities as string,
            qualifications: doc.qualifications as string,
            createdAt: (doc.createdAt as Date).toISOString(),
        }));
    } catch (error) {
        console.error("Get jobs error:", error);
        return [];
    }
};

// Update one job by id (only fields present in the FormData are changed)
export const updateJob = async (id: string, data: FormData) => {
    try {
        const updates: Record<string, unknown> = {};

        if (data.get("title")) updates.title = String(data.get("title"));
        if (data.get("company")) updates.company = String(data.get("company"));
        if (data.get("category")) updates.category = String(data.get("category"));
        if (data.get("jobType")) updates.jobType = String(data.get("jobType"));
        if (data.get("isRemote") !== null)
            updates.isRemote = data.get("isRemote") === "true";
        if (data.get("location")) updates.location = String(data.get("location"));
        if (data.get("deadline")) updates.deadline = String(data.get("deadline"));
        if (data.get("minSalary")) updates.minSalary = Number(data.get("minSalary")) || null;
        if (data.get("maxSalary")) updates.maxSalary = Number(data.get("maxSalary")) || null;
        if (data.get("payFrequency")) updates.payFrequency = String(data.get("payFrequency"));
        if (data.get("responsibilities")) updates.responsibilities = String(data.get("responsibilities"));
        if (data.get("qualifications")) updates.qualifications = String(data.get("qualifications"));

        const result = await jobs.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        // tell Next.js to re-render the manage-jobs table
        revalidatePath("/dashboard/recruiter/manage-jobs");

        return { success: result.matchedCount === 1 };
    } catch (error) {
        console.error("Update job error:", error);
        return { success: false };
    }
};

// Delete one job by id
export const deleteJob = async (id: string) => {
    try {
        const result = await jobs.deleteOne({ _id: new ObjectId(id) });

        // tell Next.js to re-render the manage-jobs table
        revalidatePath("/dashboard/recruiter/manage-jobs");

        return { success: result.deletedCount === 1 };
    } catch (error) {
        console.error("Delete job error:", error);
        return { success: false };
    }
};
