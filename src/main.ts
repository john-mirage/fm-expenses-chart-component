import "./main.css";
import bars from "@data/bars.json";

interface Bar {
  day: string;
  amount: number;
}

interface ChartBarsProps {
  bars: Bar[];
}

const barProgressAnimation: Keyframe[] = [
  { transform: 'scaleY(0)' },
  { transform: 'scaleY(1)' }
];

const barProgressTiming: KeyframeAnimationOptions = {
  duration: 300,
  iterations: 1,
  fill: "forwards"
}

class ChartBars extends HTMLElement {
  bars: Bar[] | false;

  constructor() {
    super();
    this.bars = false;
  }

  createBar(
    bar: Bar,
    index: number,
    maxAmount: number
  ) {
    const height = String(Math.round((bar.amount * 100) / maxAmount));
    const template = document.getElementById("template-bar") as HTMLTemplateElement;
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const chartBar = fragment.querySelector(".bar") as HTMLDivElement;
    const chartBarProgress = fragment.querySelector(".bar__progress") as HTMLDivElement;
    const chartBarDay = fragment.querySelector(".bar__day") as HTMLParagraphElement;
    const chartBarAmount = fragment.querySelector(".bar__amount") as HTMLParagraphElement;
    chartBarDay.textContent = bar.day;
    chartBarAmount.textContent = `$${String(bar.amount)}`;
    chartBar.classList.add(bar.amount === maxAmount ? "bar--cyan" : "bar--red");
    chartBarProgress.style.height = `${height}%`;
    this.appendChild(chartBar);
    if (index > 0) {
      setTimeout(() => {
        chartBarProgress.animate(barProgressAnimation, barProgressTiming);
      }, index * 300);
    } else {
      chartBarProgress.animate(barProgressAnimation, barProgressTiming);
    }
  }

  connectedCallback() {
    if (this.bars) {
      const barAmounts = this.bars.map((bar) => bar.amount);
      const maxAmount = Math.max(...barAmounts);
      const gridItems = String(this.bars.length);
      this.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
      this.classList.add("chart__bars");
      this.bars.forEach((bar, index) => this.createBar(bar, index, maxAmount));
    } else {
      console.warn("The chart bars web component has no bars");
    }
  }
}

customElements.define("chart-bars", ChartBars);

const chartTitle = document.getElementById("chart-title") as HTMLHeadingElement;
const chartBars = document.createElement("chart-bars") as HTMLElement & ChartBarsProps;

chartBars.bars = bars;
chartTitle.after(chartBars);