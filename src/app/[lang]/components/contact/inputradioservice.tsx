import React, { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";

type ServiceOption = {
  label: string | undefined;
  value: string;
};

type InputCheckboxGroupProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  isFormValid: boolean;
  setIsFormValid: (valid: boolean) => void;
};

interface DictionaryData {
  contact: {
    help_headline: string;
    help: {
      web_design: string;
      web_dev: string;
      hosting_support: string;
      digital_web: string;
      content_management: string;
      other: string;
    };
  };
}

export default function InputCheckboxService({
  selected,
  setSelected,
  isFormValid,
  setIsFormValid,
  lang,
}: InputCheckboxGroupProps & { lang: Locale }) {
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);

  useEffect(() => {
    fetch(`/api/dictionary?locale=${lang}`)
      .then((response) => response.json())
      .then((data) => setDictionary(data))
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [lang]);

  const serviceOptions: ServiceOption[] = [
    { label: dictionary?.contact.help.web_design, value: "Web Design" },
    { label: dictionary?.contact.help.web_dev, value: "Web Development" },
    {
      label: dictionary?.contact.help.hosting_support,
      value: "Hosting Support",
    },
    {
      label: dictionary?.contact.help.digital_web,
      value: "Digital Web Strategy",
    },
    {
      label: dictionary?.contact.help.content_management,
      value: "CMS",
    },
    { label: dictionary?.contact.help.other, value: "Other" },
  ];

  const toggleSelected = (value: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value],
    );
  };

  useEffect(() => {
    if (selected) {
      setIsFormValid(true);
    }
  }, [selected, setIsFormValid]);

  const borderClass = isFormValid ? "" : "border-formValid";

  return (
    <div className="input-checkboxgroup">
      <span className="radiogroup-headline !mt-0">
        <h5>{dictionary?.contact.help_headline}</h5>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[8px]">
        {serviceOptions.map((option) => (
          <div
            key={option.value}
            className="mb-[8px] md:mb-[8px] radiogroup-space"
          >
            <input
              type="checkbox"
              id={option.value}
              checked={selected.includes(option.value)}
              onChange={() => toggleSelected(option.value)}
              className="hidden"
            />
            <label htmlFor={option.value} className="cursor-pointer">
              <div
                className={`${
                  selected.includes(option.value)
                    ? "radiogroup-checked"
                    : `radiogroup-bg ${borderClass}`
                } radiogroup-choice text-center`}
              >
                {option.label}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
