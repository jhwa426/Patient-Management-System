"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"

import CustomFormField from "./CustomFormField"
import SubmitButton from "../ui/SubmitButton"

import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { GenderOptions } from "@/constants"
import { Label } from "@/components/ui/label";


const RegisterForm = ({ user }: { user: User }) => {
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


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12 flex-1"
            >
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

                {/* NAME */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Jeff Hwang"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                {/* EMAIL & PHONE */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email address"
                        placeholder="jeffhwa411@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="(64) 123456789"
                    />
                </div>

                {/* BirthDate & Gender */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, index) => (
                                        <div key={option + index} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                {/* Address & Occupation */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    {/* TODO: start here */}
                </div>

                {/* Emergency Contact Name & Emergency Contact Number */}
                <div className="flex flex-col gap-6 xl:flex-row">
                </div>


                {/* PRIMARY CARE PHYSICIAN */}

                {/* INSURANCE & POLICY NUMBER */}
                <div className="flex flex-col gap-6 xl:flex-row">
                </div>

                {/* ALLERGY & CURRENT MEDICATIONS */}
                <div className="flex flex-col gap-6 xl:flex-row">
                </div>

                {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                <div className="flex flex-col gap-6 xl:flex-row">
                </div>



                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
}

export default RegisterForm;
