"use server";
import React from "react";
import { Resend } from "resend";
import { validateString } from "@/lib/validate";
import ContactFormEmail from "@/email/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("senderName");
  const company = formData.get("senderCompany");
  const email = formData.get("senderEmail");
  const services = formData
    .getAll("senderService")
    .filter((item): item is string => typeof item === "string");
  const budget = formData.get("senderBudget");
  const duration = formData.get("senderDuration");
  const pages = formData.get("senderPages");
  const message = formData.get("senderMessage");

  const serviceArray = Array.isArray(services) ? services : [services];

  if (serviceArray.length === 0) {
    console.log("Service array is empty");
    return { error: "No service selected" };
  }

  if (
    !validateString(name, 200, true) ||
    !validateString(company, 300, true) ||
    !validateString(email, 500, true) ||
    !validateString(serviceArray.join(", "), 400, true) ||
    !validateString(budget, 600, true) ||
    !validateString(duration, 700, true) ||
    !validateString(message, 5000, true)
  ) {
    console.log("Invalid input. Detailed values:", {
      name: validateString(name, 200, true),
      company: validateString(company, 300, true),
      email: validateString(email, 500, true),
      services: validateString(serviceArray.join(", "), 400, true),
      budget: validateString(budget, 600, true),
      duration: validateString(duration, 700, true),
      message: validateString(message, 5000, true),
    });
    return {
      error: "Invalid input",
    };
  }

  try {
    const emailData = {
      from: "Beside Form <onboardin@resend.dev>",
      to: "business@beside.design",
      subject: "Message from contact form",
      reply_to: email as string,
      react: React.createElement(ContactFormEmail, {
        name: name as string,
        company: company as string,
        email: email as string,
        service: serviceArray,
        budget: budget as string,
        duration: duration as string,
        pages: pages as string,
        message: message as string,
      }),
    };
    await resend.emails.send(emailData);
    return { success: true };
  } catch (error: unknown) {
    console.error("Send Email Error:", error);
    return { error: "An error occurred" };
  }
};
