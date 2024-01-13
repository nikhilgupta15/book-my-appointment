import { formatDateForAppointmentEmails } from "@/lib/utils";
import { Doctor, Patient } from "@prisma/client";
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const imagePath =
  "https://bookmyappointment.vercel.app/_next/image?url=%2Fwebsite-logo.png&w=128&q=75";

export const AppointmentScheduledMailForPatient = ({
  appointmentDate,
  patientData,
  doctorData,
}: {
  appointmentDate: Date;
  patientData: Patient;
  doctorData: Doctor;
}) => {
  const { name: patientName } = patientData;
  const { name: doctorName, address } = doctorData;

  return (
    <Html>
      <Head />
      <Preview>Appointment Confirmation - {doctorName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={paragraphContent}>
            <Text style={heading}>APPOINTMENT SCHEDULED</Text>
            <Text style={paragraph}>Dear {patientName},</Text>
            <Text style={paragraph}>
              Your appointment with Dr. {doctorName} has been scheduled for{" "}
              <b>{formatDateForAppointmentEmails(appointmentDate)}</b>.
            </Text>
            <Text>Clinic Address: {address}</Text>
            <Text>
              Please arrive 15 minutes before the scheduled time to complete any
              paperwork. Bring your valid ID proof.
            </Text>
            <Text>
              Please reply to this email if you need to reschedule the
              appointment.
            </Text>
            <Text>Let us know if you have any other questions.</Text>
            <Hr style={hr} />
          </Section>

          <Section style={paragraphContent}>
            <Row>
              <Column style={{ width: "85%" }}>
                <Text style={paragraph}>Thank you,</Text>
                <Text style={{ ...paragraph, fontSize: "20px" }}>
                  Book My Appointment Team
                </Text>
              </Column>
              <Column>
                <Img
                  src={imagePath}
                  width="75"
                  height="75"
                  alt="Website Logo"
                />
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AppointmentScheduledMailForPatient;

const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "10px",
};

const container = {
  margin: "30px auto",
  width: "610px",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};

const heading = {
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: "700",
  color: "#004dcf",
};

const paragraphContent = {
  padding: "0 40px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const hr = {
  borderColor: "#e8eaed",
  margin: "20px 0",
};
