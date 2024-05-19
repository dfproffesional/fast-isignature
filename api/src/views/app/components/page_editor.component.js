import { Inspector } from "../store/inspector.js";
import HeaderComponent from "./header.component.js";

export default class PageEditorComponent extends HTMLElement
{
  constructor()
  {
    super();
  }
  
  #component = {
    html: '/app/components/page_editor.component.html'
  }

  /**@returns {void} */
  async #setRender()
  {
    this.innerHTML = (await axios.get(this.#component.html)).data;
  }
  
  /**@returns {HTMLButtonElement} */
  get #buttonUpload()
  {
    return this.querySelector('#btn__upload-pdf');
  }
  
  /**@returns {HTMLInputElement} */
  get #inputFile()
  {
    return this.querySelector('#upload__pdf');
  }
  
  /**@returns {void} */
  #addEvents()
  {
    this.#onClickUploadPDF();
    this.#onChangeInputFilePDF();
  }
  
  /**@returns {void} */
  #onClickUploadPDF()
  { 
    this.#buttonUpload.onclick = () => {
      this.#inputFile.click();
    }
  }
  
  /**@returns {void} */
  #onChangeInputFilePDF()
  {
    this.#inputFile.onchange = async ({target: $el}) => {
      const [file] = $el.files;
      const form = new FormData();
      
      form.append(
        'file', 
        file, 
        file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '')
      );
      
      const {data} = await axios.post('/store', form);
      const html =  document.createElement('html');
      
      html.innerHTML = data;
      
      this.switchHTML(html);
      this.#onDragEvents();
      HeaderComponent.setRole();
    }
  }

  #onDragEvents()
  {
    $('#page-container').find('.pf').each((i, page) => {
      $(page).get(0).ondrop = (ev) => {
        console.log('ondrop', ev);
        const el = ev.target;

        Inspector.selected.attr('style', `position:absolute; left:${ev.offsetX}px; top: ${ev.offsetY}px;border: 1px solid`);
        $(el).append(Inspector.selected);
      }

      $(page).get(0).ondragover = (ev) => {
        ev.preventDefault();
        console.log('ondragover', ev);
      }

      $(page).get(0).ondragstart = (ev) => {
        ev.preventDefault();
        console.log('ondragstart', ev);
      }
    });
  }

  /**@returns {void} */
  static async resetHTML(){
    const resp = await axios.get('/');
    const html =  document.createElement('html');

    html.innerHTML = resp.data;

    $('html').replaceWith($(html));
  }
  
  /**
   * @param {HTMLElement} newHtml 
   * @returns {vodi}
   */
  switchHTML(newHtml)
  {
    $(newHtml).find('head').children().each((i, item) => {
      if (item.tagName != "STYLE") return;
      $('head').append(item);
    });
    
    $(newHtml).find('#page-container').css('position', 'relative');
    $('#page-container').replaceWith($(newHtml).find('#page-container'));
  }
  
  /**
   * @returns {void}
   */
  async connectedCallback()
  {
    await this.#setRender();
    this.#addEvents();
  }
}