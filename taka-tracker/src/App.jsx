import { useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useLang } from "./i18n/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const { t, formatMoney } = useLang();
  const [expenses, setExpenses] = useLocalStorage("expenses:v1", []);

  const total = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const addExpense = (data) =>
    setExpenses((prev) => [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...data },
      ...prev,
    ]);

  const removeExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  return (
    <main className="container">
      <header className="header">
        <h1>{t("appTitle")}</h1>
        <LanguageToggle />
      </header>

      <section className="card total">
        <span>{t("total")}</span>
        <strong>{formatMoney(total)}</strong>
      </section>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList items={expenses} onRemove={removeExpense} />
    </main>
  );
}