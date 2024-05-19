const ObserverManager = {
  subscribers: [],
  
  subscribe(name, listener){
    this.subscribers.push({name, listener});
  },
  
  unsubscribe(name){
    const index = this.subscribers.find(item => item.name == name);
    this.subscribers.splice(index, 1);
  },

  notify(data){
    this.subscribers.map(({name, listener}) => listener(data));
  }
}

const Inspector = {
  items: [],
  selected: null,
  addElement(selector){
    this[selector]();
    this.notify(this.items);
  },
  add__textbox(){
    this.selected = $(`<input type="text" id="add-textbox" />`);
  }
};


Object.assign(Inspector, ObserverManager);

export {Inspector};