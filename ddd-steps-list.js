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
        position: relative;
        background-color: var(--ddd-theme-default-white, #ffffff);
        padding: var(--ddd-spacing-4, 24px);
      }

      :host([data-accent]) {
        background-color: var(--ddd-theme-default-warmGray8, #f5f3f0);
      }
    `;
  }

  // Lit render the HTML
  render() {
    return html` <slot></slot> `;
  }

  firstUpdated() {
    this._validateChildren();
  }

  _validateChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;
    children.forEach((child) => {
      if (child.tagName.toLowerCase() === "ddd-steps-list-item") {
        const isTitle = child.hasAttribute("data-title");
        child.step = isTitle ? null : ++stepCount;

        //change
        if (this.dddPrimary) {
          child.setAttribute("data-primary", "");
        } else {
          child.removeAttribute("data-primary");
        }
      } else {
        this.removeChild(child);
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      this._validateChildren();
    }
  }
}
globalThis.customElements.define(DddStepsList.tag, DddStepsList);
