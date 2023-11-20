import { RadioGroup } from "@headlessui/react";
import { Locale } from "@/i18n.config";
import { useEffect, useState } from "react";

type TimeOption = {
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
    time_headline: string;
    time: {
      time_option_one: string;
      time_option_two: string;
      time_option_three: string;
      time_option_four: string;
    };
  };
}

export default function InputRadioTime({
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

  const timeOptions: TimeOption[] = [
    { label: dictionary?.contact.time.time_option_one, value: "< 1 weeks" },
    { label: dictionary?.contact.time.time_option_two, value: "1 - 2 weeks" },
    { label: dictionary?.contact.time.time_option_three, value: "2 - 4 weeks" },
    { label: dictionary?.contact.time.time_option_four, value: "5+ weeks" },
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
        name="senderDuration"
        aria-required
      >
        <RadioGroup.Label className="radiogroup-headline">
          <h5>{dictionary?.contact.time_headline}</h5>
        </RadioGroup.Label>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-[8px]">
          {timeOptions.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              className="radiogroup-space"
            >
              {({ active, checked }) => (
                <div
                  className={`${
                    active || checked ? "radiogroup-active" : ""
                  } cursor-pointer`}
                >
                  <div
                    className={`${
                      checked
                        ? "radiogroup-checked"
                        : `radiogroup-bg ${borderClass}`
                    } radiogroup-choice text-center`}
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
