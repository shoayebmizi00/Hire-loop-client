"use server";

import { MongoClient } from "mongodb";

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
