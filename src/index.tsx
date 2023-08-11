import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Calendar from "./Calendar";

const option: any = {
  container: {
    width: 500,
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    weekdayColor: "black",
    satColor: "blue",
    sunColor: "red",
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Calendar option={option} />);
