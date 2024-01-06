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
import { format } from "date-fns";
import * as React from "react";

const imagePath =
  "https://bookmyappointment.vercel.app/_next/image?url=%2Fwebsite-logo.png&w=128&q=75";

export const AppointmentScheduledMail = ({
  appointmentDate,
  patientData,
  doctorData,
  appointmentDescription,
}: {
  appointmentDate: Date;
  patientData: Patient;
  doctorData: Doctor;
  appointmentDescription: string;
}) => {
  const { name: patientName, email, birthday, phone } = patientData;
  const { name: doctorName } = doctorData;

  return (
    <Html>
      <Head />
      <Preview>New Appointment - {patientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={paragraphContent}>
            <Text style={heading}>APPOINTMENT SCHEDULED</Text>
            <Text style={paragraph}>Dear Dr. {doctorName},</Text>
            <Text style={paragraph}>
              This email is to confirm your appointment with {patientName} on{" "}
              <b>{format(appointmentDate, "PPPPp")}</b>.
            </Text>
            <Text>Patient Details: </Text>
            <Text>
              Name: {patientName} <br />
              Date Of Birth:{" "}
              {format(
                new Date(birthday).toISOString().split("T")[0],
                "dd/MM/yyyy"
              )}{" "}
              <br />
              Email: {email} <br />
              Phone: {phone} <br />
              Appointment Description: {appointmentDescription}
            </Text>
            <Text>
              Please reply to this email to confirm you are available at the
              scheduled time or if you need to reschedule this appointment. Let
              us know if you need any additional information prior to the
              appointment.
            </Text>
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

export default AppointmentScheduledMail;

const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "10px",
};

const sectionLogo = {
  padding: "0 40px",
};

const headerBlue = {
  marginTop: "-1px",
};

const container = {
  margin: "30px auto",
  width: "610px",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};

const containerContact = {
  backgroundColor: "#f0fcff",
  width: "90%",
  borderRadius: "5px",
  overflow: "hidden",
  paddingLeft: "20px",
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

const paragraphList = {
  paddingLeft: 40,
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const link = {
  ...paragraph,
  color: "#004dcf",
};

const hr = {
  borderColor: "#e8eaed",
  margin: "20px 0",
};
