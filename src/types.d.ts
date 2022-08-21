namespace AppData {
  interface Bar {
    day: string;
    amount: number;
  }
  interface BarDay {
    day: string,
    dayNumber: number,
  }
}

namespace AppComponent {
  interface ChartBar extends HTMLLIElement {
    chartBarDay: AppData.BarDay;
    chartBarHeight: string;
    chartBarAmount: string;
    chartBarIndex: number;
  }
}
