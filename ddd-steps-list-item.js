/**
 * Copyright 2025 ritazheng1011
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
/**
 * `ddd-steps-list`
 *
 * @demo index.html
 * @element ddd-steps-list
 */
class DddStepsListItem extends DDDSuper(I18NMixin(LitElement)) {
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
