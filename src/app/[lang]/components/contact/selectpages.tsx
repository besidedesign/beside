import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";

type PagesOption = {
  label: string | undefined;
  value: string;
};

type InputRadioGroupProps = {
  selected: string | null;
  setSelected: (value: string | null) => void;
  isFormValid: boolean;
  setIsFormValid: (valid: boolean) => void;
};

interface DictionaryData {
  contact: {
    pages_headline: string;
    pages: {
      page_option_one: string;
      page_option_two: string;
      page_option_three: string;
      page_option_four: string;
    };
  };
}

export default function SelectPages({
  selected,
  setSelected,
  isFormValid,
  setIsFormValid,
  lang,
}: InputRadioGroupProps & { lang: Locale }) {
  const [dictionary, setDictionary] = useState<DictionaryData | null>(null);

  useEffect(() => {
    fetch(`/api/dictionary?locale=${lang}`)
      .then((response) => response.json())
      .then((data) => setDictionary(data))
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [lang]);

  const pagesOptions: PagesOption[] = [
    { label: dictionary?.contact.pages.page_option_one, value: "1 - 2 pages" },
    { label: dictionary?.contact.pages.page_option_two, value: "3 - 4 pages" },
    {
      label: dictionary?.contact.pages.page_option_three,
      value: "5 - 6 pages",
    },
    { label: dictionary?.contact.pages.page_option_four, value: "7+ pages" },
  ];

  useEffect(() => {
    if (selected) {
      setIsFormValid(true);
    }
  }, [selected, setIsFormValid]);

  const borderClass = isFormValid ? "" : "border-formValid";

  return (
    <div className="input-radiogroup">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        name="senderPages"
        aria-required
      >
        <RadioGroup.Label className="radiogroup-headline">
          <h5>{dictionary?.contact.pages_headline}</h5>
        </RadioGroup.Label>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-[8px]">
          {pagesOptions.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              className="radiogroup-space"
            >
              {({ active, checked }) => (
                <div
                  className={`${
                    active || checked ? "radiogroup-active" : ""
                  } cursor-pointer border-none`}
                >
                  <div
                    className={`${
                      checked
                        ? "radiogroup-checked"
                        : `radiogroup-bg ${borderClass}`
                    } radiogroup-choice text-center border-none`}
                  >
                    {option.label}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
