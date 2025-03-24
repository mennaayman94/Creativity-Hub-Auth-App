import { Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import EntryPage from "./pages/entrypage";
import { Spin } from "antd";
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spin spinning={true} />}>
      <EntryPage/>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
