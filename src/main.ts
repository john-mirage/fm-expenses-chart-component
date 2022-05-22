import "./main.css";
import bars from "@data/bars.json";
import ChartBar from "@components/chart-bar";

const chartBars = document.getElementById("chat-bars");

customElements.define("chart-bar", ChartBar);

const barAmounts = bars.map((bar) => bar.amount);
const barAmountMax = Math.max(...barAmounts);

bars.forEach((bar) => {
  const percent = Math.round((bar.amount * 100) / barAmountMax);
  const chartBar = document.createElement("chart-bar");
  chartBar.setAttribute("day", bar.day);
  chartBar.setAttribute("amount", bar.amount);
  chartBar.setAttribute("height", `${String(percent)}%`);
  if (bar.amount === barAmountMax) chartBar.setAttribute("max", "true");
  chartBars.appendChild(chartBar);
});