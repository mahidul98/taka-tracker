import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [n, setN] = useLocalStorage("test", 0);
  return <button onClick={() => setN(n + 1)}>Clicked {n}</button>;
}