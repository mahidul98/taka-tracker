import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { translations } from "./translations";

const LanguageContext = createContext(null);
const defaultLang = navigator.language?.startsWith("bn") ? "bn" : "en";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useLocalStorage("lang", defaultLang);

  const value = useMemo(() => {
    const locale = lang === "bn" ? "bn-BD" : "en-US";
    const t = (key) => translations[lang][key] ?? translations.en[key] ?? key;
    const moneyFmt = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "BDT",
      currencyDisplay: "narrowSymbol",
    });
    const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
    return {
      lang,
      setLang,
      t,
      formatMoney: (n) => moneyFmt.format(n),
      formatDate: (iso) => dateFmt.format(new Date(iso)),
    };
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = value.t("appTitle");
  }, [lang, value]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}