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

  constructor() {
    super();
    this.steps = [];
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      steps: { type: Array },
      title: { type: String },
    };
  }

  firstUpdated() {
    this.updateSteps(); //not sure what this does, searched it up
  }

  updated(changedProperties) {
    if (changedProperties.has("steps")) {
      this.updateSteps();
    }
  }

  updateSteps() {
    const children = [...this.children].filter(
      (child) => child.tagName.toLowerCase() === "ddd-steps-list-item"
    );
    children.forEach((child, index) => {
      child.step = index + 1;
    });
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        .step-container {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
        }
        body {
          font-family: "open sans", sans-serif;
          background: #f1f1f1;
        }
        #content {
          margin: 40px auto;
          text-align: center;
          width: 600px;
        }
        #content h1 {
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 40px 0;
          font-size: 25px;
          line-height: 30px;
        }
        .circle {
          width: 200px;
          height: 200px;
          line-height: 200px;
          border-radius: 50%; /* the magic */
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
          text-align: center;
          color: white;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 auto 40px;
        }

        .blue {
          background-color: #3498db;
        }
        .green {
          background-color: #16a085;
        }
        .red {
          background-color: #e74c3c;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <slot></slot>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);
