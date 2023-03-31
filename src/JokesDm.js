import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './JokesDm-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<jokes-dm></jokes-dm>
```

##styling-doc

@customElement jokes-dm
*/
export class JokesDm extends LitElement {
  static get is() {
    return 'jokes-dm';
  }

  // Declare properties
  static get properties() {
    return {
      name: { type: String, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.name = 'Cells';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('jokes-dm-shared-styles')
    ];
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      <p>Welcome to ${this.name}</p>
    `;
  }
}
