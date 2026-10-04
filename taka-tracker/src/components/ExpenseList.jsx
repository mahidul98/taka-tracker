import { useLang } from "../i18n/LanguageContext";

export default function ExpenseList({ items, onRemove }) {
  const { t, formatMoney, formatDate } = useLang();
  if (items.length === 0) return <p className="empty">{t("empty")}</p>;

  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className="card row">
          <div className="row-main">
            <strong>{item.title}</strong>
            <small>{t(`cat.${item.category}`)} · {formatDate(item.createdAt)}</small>
          </div>
          <div className="row-side">
            <span className="money">{formatMoney(item.amount)}</span>
            <button className="ghost" onClick={() => onRemove(item.id)}>{t("delete")}</button>
          </div>
        </li>
      ))}
    </ul>
  );
}