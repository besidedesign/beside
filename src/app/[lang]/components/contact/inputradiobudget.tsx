import { RadioGroup } from "@headlessui/react";
import { Locale } from "@/i18n.config";
import { useEffect, useState } from "react";

type BudgetOption = {
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
    budget_headline: string;
    budget: {
      budget_option_one: string;
      budget_option_two: string;
      budget_option_three: string;
      budget_option_four: string;
    };
  };
}

export default function InputRadioBudget({
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

  const budgetOptions: BudgetOption[] = [
    { label: dictionary?.contact.budget.budget_option_one, value: "€1k - €2k" },
    { label: dictionary?.contact.budget.budget_option_two, value: "€2k - €4k" },
    {
      label: dictionary?.contact.budget.budget_option_three,
      value: "€4k - €8k",
    },
    { label: dictionary?.contact.budget.budget_option_four, value: "€8k+" },
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
        name="senderBudget"
        aria-required
      >
        <RadioGroup.Label className="radiogroup-headline">
          <h5>{dictionary?.contact.budget_headline}</h5>
        </RadioGroup.Label>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-[8px]">
          {budgetOptions.map((option) => (
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
