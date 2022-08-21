import data from "@data/bars.json";

class AppChartBars extends HTMLUListElement {
  #initialCall: boolean = true;
  #chartBars: AppData.Bar[] = data;
  protected appChartBar: AppComponent.ChartBar = <AppComponent.ChartBar>document.createElement("li", { is: "app-chart-bar" });

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialCall) {
      const currentDate = new Date();
      const chartBarAmounts = this.#chartBars.map((bar) => bar.amount);
      const maxAmount = Math.max(...chartBarAmounts);
      const gridItems = String(this.#chartBars.length);
      this.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
      this.classList.add("chart__bars");
      this.#chartBars.forEach((chartBar, index) => {
        const height = String(Math.round((chartBar.amount * 100) / maxAmount));
        const appChartBar = <AppComponent.ChartBar>this.appChartBar.cloneNode(true);
        appChartBar.chartBarDay = { day: chartBar.day, dayNumber: currentDate.getDay() };
        appChartBar.chartBarAmount = String(chartBar.amount);
        appChartBar.chartBarHeight = height;
        appChartBar.chartBarIndex = index;
        this.append(appChartBar);
      });
      this.#initialCall = false;
    }
  }
}

export default AppChartBars;