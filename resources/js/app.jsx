import React from "react";
import ReactDOM from "react-dom/client";
import RecordsChart from "./Pages/RecordsChart";

function App() {
    return <RecordsChart />
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);