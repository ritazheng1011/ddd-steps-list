/**
 * Copyright 2025 ritazheng1011
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./ddd-steps-list-item.js";
/**
 * `ddd-steps-list`
 *
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "ddd-steps-list";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      dddPrimary: { type: String, attribute: "ddd-primary", reflect: true },
    };
  }

  constructor() {
    super();
    this.dddPrimary = "default";
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 16px;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`<slot></slot>`;
  }

  firstUpdated() {
    this._validateChildren();
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      this._validateChildren();
    }
  }

  _validateChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;

    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag !== "ddd-steps-list-item") {
        console.warn(`Invalid child removed: <${tag}>`);
        this.removeChild(child);
      } else {
        stepCount++;
        child.step = stepCount;
        child.setAttribute("step", stepCount);
        child.requestUpdate("step", 0);
        if (this.dddPrimary) {
          child.setAttribute("data-primary", this.dddPrimary);
        } else {
          child.removeAttribute("data-primary");
        }
      }
    });
  }
}
globalThis.customElements.define(DddStepsList.tag, DddStepsList);

//new class

import { LitElement, html, css } from "lit";
import "./ddd-steps-list-item.js";

class DddStepsListItem extends LitElement {
  static get properties() {
    return {
      step: { type: Number, reflect: true },
    };
  }

  constructor() {
    super();
    this.step = 0;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: var(--ddd-spacing-6, 24px);
      }
      :host(:last-child) {
        margin-bottom: 0;
      }

      .step-wrapper {
        display: flex;
        align-items: flex-start;
      }

      .step-circle {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid var(--ddd-theme-default-beaverBlue, #1e407c);
        background-color: white;
        color: var(--ddd-theme-default-beaverBlue, #1e407c);
        text-align: center;
        line-height: 48px;
        font-size: 18px;
        font-weight: bold;
        margin: 16px;
        flex-shrink: 0;
      }

      :host([data-primary="7"]) .step-circle {
        border-color: var(--ddd-theme-default-coolGray, #7d8a99);
        color: var(--ddd-theme-default-coolGray, #7d8a99);
      }

      .step-content {
        flex: 1;
      }

      .step-content ::slotted(h3) {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        color: var(--ddd-text-color, #1e407c);
      }

      .step-content ::slotted(p) {
        margin: 8px 0;
        font-size: 16px;
        color: #333;
      }

      .step-content ::slotted(ul) {
        margin: 8px 0 0 0;
        padding-left: 20px;
      }

      @media (max-width: 600px) {
        .step-wrapper {
          flex-direction: column;
          align-items: flex-start;
        }

        .step-circle {
          margin-bottom: var(--ddd-spacing-2, 8px);
        }
      }
    `;
  }

  render() {
    return html`
      <div class="step-wrapper">
        <div class="step-circle">${this.step}</div>
        <div class="step-content"><slot></slot></div>
      </div>
    `;
  }
}
customElements.define("ddd-steps-list-item", DddStepsListItem);
