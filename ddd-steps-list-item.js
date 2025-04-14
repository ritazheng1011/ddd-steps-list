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
        color: var(--ddd-theme-default-white, #fff);
        position: relative;
      }
      :host(:last-child) {
        margin-bottom: 0;
      }

      :host([data-title]) .step-line,
      :host(:nth-last-of-type(1)) .step-line {
        display: none;
      }

      .step-wrapper {
        display: flex;
        align-items: flex-start;
        position: relative;
        z-index: 2;
      }

      .step-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid var(--ddd-theme-default-beaverBlue, #1e407c);
        background-color: var(--ddd-theme-default-white, #ffffff);
        color: var(--ddd-theme-default-beaverBlue, #1e407c);
        font-size: 18px;
        font-weight: bold;
        margin: var(--ddd-spacing-4, 16px) 0;
        flex-shrink: 0;
        position: relative;
        z-index: 3;
      }

      :host([data-primary]) .step-circle {
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: var(--ddd-theme-default-white, #ffffff);
      }

      .step-line {
        position: absolute;
        left: 25px;
        top: 48px;
        width: 2px;
        height: calc(100% - 8px);
        background: repeating-linear-gradient(
          to bottom,
          var(--ddd-theme-default-beaverBlue, #1e407c),
          var(--ddd-theme-default-beaverBlue, #1e407c) 4px,
          transparent 4px,
          transparent 8px
        );
        z-index: 1;
      }

      .step-content {
        flex: 1;
        color: var(--ddd-theme-default-black, #000);
        margin-left: var(--ddd-spacing-4, 16px);
      }

      ::slotted(h1),
      ::slotted(h2),
      ::slotted(h3),
      ::slotted(h4),
      ::slotted(h5),
      ::slotted(h6) {
        color: var(--ddd-theme-default-beaverBlue, #1e407c);
      }

      @media screen and (max-width: 600px) {
        .step-wrapper {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .step-content {
          margin-left: 0;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="step-wrapper">
        ${this.step
          ? html`
              <div class="step-circle">${this.step}</div>
              <div class="step-line"></div>
            `
          : null}
        <div class="step-content"><slot></slot></div>
      </div>
    `;
  }
}
customElements.define("ddd-steps-list-item", DddStepsListItem);
