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
class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "ddd-steps-list";
  }

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
    return css`
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
