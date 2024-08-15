## Patient-Management-System

<p>
Built a healthcare management platform that streamlines patient registration, appointment scheduling, and medical records, as well as implemented complex forms and SMS notifications.

Project Logic: Fill out the registration form and create a personal patient profile. A patient can make a new appointment with the doctor. A patient will receive an SMS notification on appointment confirmation or cancellation (patients are required to enter an actual number in order to receive an SMS notification). On the other hand, an admin can efficiently view and handle all scheduled appointments, which necessitates a <b>passkey (123123)</b>. Admins can confirm and set appointment times to ensure they are properly scheduled. Once admin schedules or cancels appointments, a patient will receive an SMS notification about the appointment.

</p>

## [CarePulse](https://patient-management-system-carepulse.vercel.app/)

### Features

- Register as a Patient: Users can sign up and create a personal profile as a patient

- Book a New Appointment with Doctor: Patients can schedule appointments with doctors at their convenience and can book multiple appointments

- Manage Appointments on Admin Side <b>(Admin Passkey : 123123)</b>: Administrators can efficiently view and handle all scheduled appointments

- Confirm/Schedule Appointment from Admin Side: Admins can confirm and set appointment times to ensure they are properly scheduled

- Cancel Appointment from Admin Side: Administrators have the ability to cancel any appointment as needed

- Send SMS on Appointment Confirmation: Patients receive SMS notifications to confirm their appointment details

- Complete Responsiveness: The application works seamlessly on all device types and screen sizes

- File Upload Using Appwrite Storage: Users can upload and store files securely within the app using Appwrite storage services

- Manage and Track Application Performance Using Sentry: The application uses Sentry to monitor and track its performance and detect any errors

## Technical Skills 💻

<img align="left" alt="React/React Native" height="50px" src="https://cdn.svgporn.com/logos/react.svg" />
<img align="left" alt="Typescript" height="50px" src="https://cdn.svgporn.com/logos/typescript-icon.svg" />
<img align="left" alt="NextJS" height="50px" src="https://cdn.svgporn.com/logos/nextjs-icon.svg" />
<img align="left" alt="tailwindcss" height="50px" src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg" />
<img align="left" alt="appwrite" height="50px" src="https://cdn.svgporn.com/logos/appwrite-icon.svg" />
<img align="left" alt="twilio" height="50px" src="https://cdn.svgporn.com/logos/twilio-icon.svg" />
<img align="left" alt="ShadCN" height="50px" src="https://avatars.githubusercontent.com/u/139895814?s=280&v=4" />
<img align="left" alt="Git" height="50px" src="https://cdn.svgporn.com/logos/git-icon.svg" />
<img align="left" alt="Vercel" height="50px" src="https://cdn.svgporn.com/logos/vercel-icon.svg" />

<br />
<br />
<br />
<br />

# Getting Started

## Installation

<details>
1. Open Terminal.

2. Change the current working directory to the location where you want the cloned directory.

3. Clone the repository: `git clone https://github.com/jhwa426/Patient-Management-System`

4. Navigate to the project directory: `cd healthcare`

5. Install the dependencies: `npm install`

6. Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=123123
```

7. Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

8. Open your browser and visit: `http://localhost:3000`
</details>
