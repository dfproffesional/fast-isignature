import PageEditorComponent from "./page_editor.component.js";

export default class HeaderComponent extends HTMLElement 
{
  constructor()
  {
    super();
  }

  #component = {
    style: '/app/components/header.component.css',
    html: '/app/components/header.component.html'
  }

  static setRole(){
    $('header[role="disabled"]').attr('role', '');
  }

  async #setRender()
  {
    $('head').append($(`<link rel="stylesheet" href="${this.#component.style}">`).get(0));
    this.innerHTML = (await axios.get(this.#component.html)).data;
  }

  #addEvents()
  {
    this.#onclickApps();
  }

  #onclickApps()
  {
    this.querySelector('ion-icon[name="apps"]').onclick = ({target}) => {
      if ($('header[role="disabled"]').length) return; 

      const $subheader = $('header + .subheader');

      if ($subheader.hasClass('invisible')) {
        $subheader.removeClass('invisible');
      }
      else {
        $subheader.addClass('invisible');
      }
    };
  }

  async connectedCallback()
  {
    await this.#setRender();
    this.#addEvents();
    
  }
}