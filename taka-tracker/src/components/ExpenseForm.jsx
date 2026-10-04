import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";

const CATEGORIES = ["food", "transport", "study", "other"];

export default function ExpenseForm({ onAdd }) {
  const { t } = useLang();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!title.trim() || !Number.isFinite(value) || value <= 0) return;
    onAdd({ title: title.trim(), amount: value, category });
    setTitle("");
    setAmount("");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <label>
        {t("title")}
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        {t("amount")}
        <input type="number" inputMode="decimal" min="1" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </label>
      <label>
        {t("category")}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{t(`cat.${c}`)}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="primary">{t("add")}</button>
    </form>
  );
}