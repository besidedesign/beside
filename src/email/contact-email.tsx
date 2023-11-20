import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

type ContactFormEmailProps = {
  name: string;
  company: string;
  email: string;
  service: string[];
  budget: string;
  duration: string;
  pages: string;
  message: string;
};

export default function ContactFormEmail({
  name,
  company,
  email,
  service,
  budget,
  duration,
  pages,
  message,
}: ContactFormEmailProps) {
  const serviceString = service.join(", ");

  return (
    <Html>
      <Head />
      <Preview>New Offer Request for Beside</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New offer request</Heading>
          <Text style={{ ...text, marginBottom: "14px" }}>
            Hey Beside, you got a new offer request. Please respond in the next
            24 hours! Request details:
          </Text>
          <div style={code}>
            Name: {name}
            <br />
            Company: {company}
            <br />
            Email: {email}
            <br />
            Request: {serviceString}
            <br />
            Budget: {budget}
            <br />
            Duration: {duration}
            <br />
            Pages: {pages}
            <br />
            Message: {message}
          </div>
          <Text style={footer}>
            <Link
              href="https://beside.design"
              target="_blank"
              style={{ ...link, color: "#898989" }}
            >
              beside.design
            </Link>
            , Webdesign &amp; Growth Agency
            <br />
            developed by beside
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
