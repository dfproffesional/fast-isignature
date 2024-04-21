
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
    }
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