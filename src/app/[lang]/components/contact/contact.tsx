"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/actions/sendEmail";
import Link from "next/link";
import { Locale } from "@/i18n.config";

//components
import InputRadioService from "@/app/[lang]/components/contact/inputradioservice";
import InputRadioBudget from "@/app/[lang]/components/contact/inputradiobudget";
import InputRadioTime from "@/app/[lang]/components/contact/inputradiotime";
import SelectPages from "@/app/[lang]/components/contact/selectpages";

interface DictionaryData {
  contact: {
    headline: string;
    subtitle: string;
    name: {
      name_headline: string;
      name_placeholder: string;
    };
    email: {
      email_headline: string;
      email_placeholder: string;
    };
    company: {
      company_headline: string;
      company_placeholder: string;
    };
    textarea: {
      textarea_headline: string;
      textarea_placeholder: string;
    };
    form_button: string;
    terms_of_use: string;
    terms_of_use_a: string;
    form_valid: {
      select_pages_valid: string;
      select_service_valid: string;
      select_time_valid: string;
      select_budget_valid: string;
    };
  };
}

export default function ContactContent({ lang }: { lang: Locale }) {
  const router = useRouter();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);

  //FORM VALIDATION
  const [isValidService, setIsValidService] = useState(true);
  const [isValidPages, setIsValidPages] = useState(true);
  const [isValidTime, setIsValidTime] = useState(true);
  const [isValidBudget, setIsValidBudget] = useState(true);

  useEffect(() => {
    fetch(`/api/dictionary?locale=${lang}`)
      .then((response) => response.json())
      .then((data) => setDictionary(data))
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValidForm = true;

    if (!selectedService.length) {
      setIsValidService(false);
      isValidForm = false;
    } else {
      setIsValidService(true);
    }

    if (!selectedValue) {
      setIsValidPages(false);
      isValidForm = false;
    } else {
      setIsValidPages(true);
    }

    if (!selectedTime) {
      setIsValidTime(false);
      isValidForm = false;
    } else {
      setIsValidTime(true);
    }

    if (!selectedBudget) {
      setIsValidBudget(false);
      isValidForm = false;
    } else {
      setIsValidBudget(true);
    }

    if (!isValidForm) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("senderName", e.currentTarget.senderName.value);
    formData.append("senderCompany", e.currentTarget.senderCompany.value);
    formData.append("senderEmail", e.currentTarget.senderEmail.value);
    formData.append("senderBudget", selectedBudget || "");
    formData.append("senderDuration", selectedTime || "");
    formData.append("senderPages", selectedValue || "");
    selectedService.forEach((service) => {
      formData.append("senderService", service);
    });
    formData.append("senderMessage", e.currentTarget.senderMessage.value);

    try {
      const response = await sendEmail(formData).catch((error) =>
        console.error("Uncaught error:", error),
      );
      if (response?.error) {
        console.error("Fehler: ", response.error);
      }
      setIsLoading(false);
      router.push(`/${lang}/thank-you`);
    } catch (error) {
      console.error("Es gab einen Fehler beim Senden der E-Mail:", error);
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="beside-container">
        <div className="md:max-w-[680px] mx-auto">
          <div className="section-heading">
            <h1>{dictionary?.contact.headline}</h1>
            <h6>{dictionary?.contact.subtitle}</h6>
          </div>
        </div>
        <div className="form-card md:max-w-[680px] mx-auto">
          <form onSubmit={handleSubmit}>
            <InputRadioService
              selected={selectedService}
              setSelected={setSelectedService}
              isFormValid={isValidService}
              setIsFormValid={setIsValidService}
              lang={lang}
            />
            {!isValidService && (
              <p className="formValid">
                {dictionary?.contact.form_valid.select_service_valid}
              </p>
            )}
            <div className="grid grid-cols-1">
              <SelectPages
                selected={selectedValue}
                setSelected={setSelectedValue}
                isFormValid={isValidPages}
                setIsFormValid={setIsValidPages}
                lang={lang}
              />
            </div>
            {!isValidPages && (
              <p className="formValid">
                {dictionary?.contact.form_valid.select_pages_valid}
              </p>
            )}
            <InputRadioTime
              selected={selectedTime}
              setSelected={setSelectedTime}
              isFormValid={isValidTime}
              setIsFormValid={setIsValidTime}
              lang={lang}
            />
            {!isValidTime && (
              <p className="formValid">
                {dictionary?.contact.form_valid.select_time_valid}
              </p>
            )}
            <InputRadioBudget
              selected={selectedBudget}
              setSelected={setSelectedBudget}
              isFormValid={isValidBudget}
              setIsFormValid={setIsValidBudget}
              lang={lang}
            />
            {!isValidBudget && (
              <p className="formValid">
                {dictionary?.contact.form_valid.select_budget_valid}
              </p>
            )}
            <div className="input-field-container">
              <div className="grid grid-cols-1 md:grid-cols-2 mb-[8px] gap-[8px] md:gap-[8px]">
                <div className="input-field">
                  <span className="radiogroup-headline">
                    <h5>{dictionary?.contact.name.name_headline}</h5>
                  </span>
                  <input
                    type="text"
                    name="senderName"
                    placeholder={dictionary?.contact.name.name_placeholder}
                    required
                  />
                </div>
                <div className="input-field">
                  <span className="radiogroup-headline">
                    <h5>{dictionary?.contact.email.email_headline}</h5>
                  </span>
                  <input
                    type="email"
                    name="senderEmail"
                    placeholder={dictionary?.contact.email.email_placeholder}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="input-field">
                <span className="radiogroup-headline">
                  <h5>{dictionary?.contact.company.company_headline}</h5>
                </span>
                <input
                  type="text"
                  name="senderCompany"
                  placeholder={dictionary?.contact.company.company_placeholder}
                  required
                />
              </div>
            </div>
            <div className="formTextarea">
              <span className="radiogroup-headline">
                <h5>{dictionary?.contact.textarea.textarea_headline}</h5>
              </span>
              <textarea
                rows={12}
                name="senderMessage"
                className="resize-none input-textarea input-textarea-bg"
                placeholder={dictionary?.contact.textarea.textarea_placeholder}
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:items-center mt-[32px]">
              <div className="sendFormMessage">
                <button type="submit" className="beside-btn btn-form">
                  {isLoading ? "Loading..." : dictionary?.contact.form_button}
                </button>
              </div>
              <span className="md:ml-auto submitTerms">
                {dictionary?.contact.terms_of_use}{" "}
                <Link href={`/${lang}/privacy-policy`}>
                  {dictionary?.contact.terms_of_use_a}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
