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


// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );

        return parseStringify(appointment);

    } catch (error) {
        console.error(
            "An error occurred while retrieving the existing patient:",
            error
        );
    }
}