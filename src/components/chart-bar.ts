class ChartBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    const template = document.getElementById("template-chart-bar") as HTMLTemplateElement;
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const trackElement = fragment.querySelector(".track");
    const dayElement = fragment.querySelector(".day");
    const day = this.getAttribute("day");
    const amount = this.getAttribute("amount");
    const height = this.getAttribute("height");
    const isMax = this.getAttribute("max") === "true";
    if (isMax) trackElement.classList.add("max");
    dayElement.textContent = day;
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
      }
      .track {
        flex: 0 0 auto;
        width: 100%;
        height: calc(${height} - 2.4rem);
        background-color: var(--color-soft-red);
        border-radius: 0.4rem;
      }
      .max {
        background-color: var(--color-cyan);
      }
      .day {
        box-sizing: border-box;
        flex: 0 0 auto;
        padding-top: 1.2rem;
        margin-top: 0;
        margin-bottom: 0;
        line-height: 1;
        font-family: var(--font);
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--color-medium-brown);
      }
      </style>
    `;
    this.shadowRoot.appendChild(fragment);
  }
}

export default ChartBar;