"use server";

import { ID, Query } from "node-appwrite";

import {
    APPOINTMENT_COLLECTION_ID,
    DATABASE_ID,
    databases,
    messaging,
} from "../appwrite.config";

import { revalidatePath } from "next/cache";
import { formatDateTime, parseStringify } from "../utils";



//  CREATE APPOINTMENT
export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointmentData
        );

        revalidatePath("/admin");
        return parseStringify(newAppointment);

    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
}