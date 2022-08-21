import "./main.css";

import AppChartBars from "@components/app-chart-bars";
import AppChartBar from "@components/app-chart-bar";

customElements.define("app-chart-bar", AppChartBar, { extends: "li" });
customElements.define("app-chart-bars", AppChartBars, { extends: "ul" });
