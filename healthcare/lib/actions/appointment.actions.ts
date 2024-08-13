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
import { Appointment } from "@/types/appwrite.types";



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


//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        };

        const counts = (appointments.documents as Appointment[]).reduce(
            (accumulate, appointment) => {
                switch (appointment.status) {
                    case "scheduled":
                        accumulate.scheduledCount++;
                        break;
                    case "pending":
                        accumulate.pendingCount++;
                        break;
                    case "cancelled":
                        accumulate.cancelledCount++;
                        break;
                }
                return accumulate;
            },
            initialCounts
        );

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents,
        }

        return parseStringify(data);

    } catch (error) {
        console.error(
            "An error occurred while retrieving the recent appointments:",
            error
        );
    }
}


//  UPDATE APPOINTMENT
export const updateAppointment = async ({
    userId,
    appointmentId,
    appointment,
    type,
}: UpdateAppointmentParams) => {
    try {
        // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        );

        if (!updatedAppointment) {
            throw Error;
        }

        // TODO: SMS notification


        revalidatePath("/admin");

        return parseStringify(updatedAppointment);

    } catch (error) {
        console.error("An error occurred while scheduling an appointment:", error);
    }
}