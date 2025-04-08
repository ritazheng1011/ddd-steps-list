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
  static get properties() {
    return {
      dddPrimary: { type: Boolean, attribute: "ddd-primary", reflect: true },
    };
  }

  constructor() {
    super();
    this.dddPrimary = false;
  }

  // Lit scoped styles
  static get styles() {
    return;
    css`
      :host {
        display: block;
      }
    `;
  }

  // Lit render the HTML
  render() {
    return html`<slot></slot>`;
  }

  firstUpdated() {
    this._validateChildren();
  }

  _validateChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;
    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag !== "ddd-steps-list-item") {
        this.removeChild(child);
      } else {
        stepCount++;
        child.step = stepCount;
        if (this.dddPrimary) {
          child.setAttribute("data-primary", "");
        } else {
          child.removeAttribute("data-primary");
        }
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      const items = this.querySelectorAll("ddd-steps-list-item");
      items.forEach((item) => {
        if (this.dddPrimary) {
          item.dddPrimary = this.dddPrimary;
        } else {
          item.removeAttribute("data-primary");
        }
      });
    }
  }
}
globalThis.customElements.define(DddStepsList.tag, DddStepsList);

//new class

import { LitElement, html, css } from "lit";

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

      :host([data-primary]) .step-circle {
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: var(--ddd-theme-default-white, #fff);
      }

      .step-content {
        flex: 1;
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
