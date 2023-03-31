import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './JokesDm-styles.js';
import '@bbva-web-components/bbva-core-generic-dp/bbva-core-generic-dp'
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

  normalizeResponse(resp) {
    //opcion si trae 2 respuestas
    if(resp.jokes){
      return resp.jokes.map((r) => {
        const {setup, delivery, ...rest} = r;
        return{
          joke: `${setup} \n ${delivery}`,   
          ...rest,
        }
      })
    }
    //Una respuesta
    const {error, ...rest} = resp;
    const result = {
      error,
      amount:1,
      jokes: [
        {
       joke: `${setup} \n ${delivery}`,          
      ...rest,
          }
        ],
    };
    console.log(result);
    return result;
  }

  firstUpdated() {
    const athleapRecipesDP = this.shadowRoot.querySelector(
      '#jokes-dm'
    );
    // 2. Lanzar un evento, para avisar que el request iniciará
    this.dispatchEvent(
      new CustomEvent('jokes-dm-request-start', {
        detail: true,
        bubbles: true,
        composed: true,
      })
    );
    // 3. Ejecutar el DP
    athleapRecipesDP
      .generateRequest()
      .then(({ response }) => {
        console.log(response)
        // 4-A. Normalizar la respuesta
        const normalizedResponse = this.normalizeResponse(response);
        // 5-A. Reaccionar a la respuesta exitosa
        /*this.dispatchEvent(
          new CustomEvent('jokes-dm-success', {
            bubbles: true,
            composed: true,
            detail: normalizedResponse,
          })
        );*/
      })
      // 5-B. Reaccionar a la respuesta fallida
      .catch((err) => {
        this.dispatchEvent(
          new CustomEvent('jokes-dm-error', {
            bubbles: true,
            composed: true,
            detail: err,
          })
        );
      });
  }

  // Define a template
  render() {
    return html`
    <bbva-core-generic-dp
        id="jokes-dm"
        method="GET"
        host="https://v2.jokeapi.dev"
        path="/joke/Any?type=twopart&amount=2"
      ></bbva-core-generic-dp>
    `;
  }
}
