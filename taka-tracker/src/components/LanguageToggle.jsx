import { useLang } from "../i18n/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="toggle" role="group" aria-label="Language">
      <button className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <button className={lang === "bn" ? "active" : ""} aria-pressed={lang === "bn"} onClick={() => setLang("bn")}>বাংলা</button>
    </div>
  );
}