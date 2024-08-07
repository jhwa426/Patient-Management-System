"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import CustomFormField from "./CustomFormField"
import SubmitButton from "../ui/SubmitButton"

import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";

const AppointmentForm = ({
    userId,
    patientId,
    patientName,
    type = "create",
}: {
    userId: string;
    patientId: string;
    patientName: string;
    type: "create" | "schedule" | "cancel";
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })


    // Submit handler.
    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            const userData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            const newUser = await createUser(userData);

            if (newUser) {
                router.push(`/patients/${newUser.$id}/register`);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    let buttonLabel;
    switch (type) {
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            buttonLabel = "Submit Appointment";
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi {patientName}, 👨🏻‍⚕️👩🏻‍⚕️🩺</h1> {/* {patientName.split(" ")[0]} */}
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request a new appointment in 1 minute.</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor, i) => (
                                <SelectItem key={doctor.name + i} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt="doctor"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected Appointment Date"
                            showTimeSelect
                            dateFormat="dd/MM/yyyy - h:mm aa"
                        />

                        <div className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}>
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Appointment Reason"
                                placeholder="Annual Monthly Check-Up"
                                disabled={type === "schedule"}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Comments / Notes"
                                placeholder="Prefer afternoon appointments, if possible"
                                disabled={type === "schedule"}
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason For Cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
}

export default AppointmentForm;
