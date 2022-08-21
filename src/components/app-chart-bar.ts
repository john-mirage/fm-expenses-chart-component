const days = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat"
];

const growUpAnimation: Keyframe[] = [
  { transform: 'scaleY(0)' },
  { transform: 'scaleY(1)' }
];

const growUpAnimationTiming = (chartBarIndex: number): KeyframeAnimationOptions => {
  return {
    duration: 300,
    delay: chartBarIndex * 300,
    easing: "ease-in-out",
    fill: "backwards",
  }
}

class AppChartBar extends HTMLLIElement {
  #chartBarDay?: AppData.BarDay;
  #chartBarHeight?: string;
  #chartBarAmount?: string;
  #chartBarIndex?: number;
  #initialCall: boolean = true;
  protected trackElement: HTMLDivElement = document.createElement("div");
  protected progressElement: HTMLDivElement = document.createElement("div");
  protected amountElement: HTMLDivElement = document.createElement("div");
  protected dayElement: HTMLParagraphElement = document.createElement("p");

  get chartBarDay() {
    if (typeof this.#chartBarDay === "object" && !Array.isArray(this.#chartBarDay)) {
      return this.#chartBarDay;
    }
    throw new Error("The chart bar day is not defined");
  }

  get chartBarHeight() {
    if (typeof this.#chartBarHeight === "string") {
      return this.#chartBarHeight;
    }
    throw new Error("The chart bar height is not defined");
  }

  get chartBarAmount() {
    if (typeof this.#chartBarAmount === "string") {
      return this.#chartBarAmount;
    }
    throw new Error("The chart bar amount is not defined");
  }

  get chartBarIndex() {
    if (typeof this.#chartBarIndex === "number") {
      return this.#chartBarIndex;
    }
    throw new Error("The chart bar index is not defined");
  }

  set chartBarDay(chartBarDay: AppData.BarDay) {
    this.#chartBarDay = chartBarDay;
    this.dayElement.textContent = this.chartBarDay.day;
    this.classList.add("bar", days[this.chartBarDay.dayNumber] === this.chartBarDay.day ? "bar--cyan" : "bar--red");
  }

  set chartBarHeight(chartBarHeight: string) {
    this.#chartBarHeight = `${chartBarHeight}%`;
    this.progressElement.style.height = this.chartBarHeight;
  }

  set chartBarAmount(chartBarAmount: string) {
    this.#chartBarAmount = `$${chartBarAmount}`;
    this.amountElement.textContent = this.chartBarAmount;
  }

  set chartBarIndex(chartBarIndex: number) {
    this.#chartBarIndex = chartBarIndex;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialCall) {
      this.classList.add("bar");
      this.trackElement.classList.add("bar__track");
      this.progressElement.classList.add("bar__progress");
      this.amountElement.classList.add("bar__amount");
      this.dayElement.classList.add("bar__day");
      this.progressElement.append(this.amountElement);
      this.trackElement.append(this.progressElement);
      this.append(this.trackElement, this.dayElement);
      this.#initialCall = false;
    }
    this.progressElement.animate(growUpAnimation, growUpAnimationTiming(this.chartBarIndex));
  }
}

export default AppChartBar;