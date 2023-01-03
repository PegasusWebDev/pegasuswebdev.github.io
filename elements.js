export class MaterialMenu extends HTMLElement {
  constructor(){
    super();
    var type = this.getAttribute('data-type');
    if(type=='sidebar'){
      this.classList.add('mdc-drawer','mdc-drawer--dismissible');
      var title = document.createElement('h1');
      title.classList.add('mdc-drawer__header');
      title.textContent = this.getAttribute('data-name') || 'Menu';
      var content = document.createElement('div');
      content.classList.add('mdc-drawer__content');
      var list = document.createElement('nav');
      list.classList.add('mdc-list');
      content.appendChild(list);
      
      var ia = this.getAttribute('data-items') || '';
      var items = ia.split(';');
      for(var i in items){
        var item = document.createElement('a');
        item.classList.add('mdc-list-item');
        var attributes = items[i].split(',');
        item.setAttribute('href', attributes[0]);
        
        var ripple = item.appendChild(document.createElement('span'));
        ripple.classList.add('mdc-list-item__ripple');
        
        var icon = item.appendChild(document.createElement('i'));
        icon.classList.add('icon', 'mdc-list-item__graphic');
        icon.textContent = attributes[1];
        
        var text = item.appendChild(document.createElement('span'));
        text.classList.add('mdc-list-item__text');
        text.textContent = attributes[2];
        
        list.appendChild(item);
      }
      
      var active = this.getAttribute('data-activeitem') || 0;
      list.children[active].classList.add('mdc-list-item--activated');
      
      this.appendChild(title);
      this.appendChild(content);
      window.mdcElements = window.mdcElements || {};
      window.mdcElements[this.getAttribute('id')] = mdc.drawer.MDCDrawer.attachTo(this);
    } else {
      throw 'Invalid m-menu data-type'
    }
  }
}
customElements.define('m-menu', MaterialMenu);

export class MaterialTopBar extends HTMLElement {
  constructor(){
    super();
    this.classList.add('mdc-top-app-bar');
    var row = this.appendChild(document.createElement('div'));
    row.classList.add('mdc-top-app-bar__row');
    var left = row.appendChild(document.createElement('section'));
    left.classList.add('mdc-top-app-bar__section', 'mdc-top-app-bar__section--align-start')
    var lia = this.getAttribute('data-left-icons');
    var lefticons = lia?lia.split(';'):[];
    for(var i in lefticons){
      var data = lefticons[i].split(',');
      var icon = left.appendChild(document.createElement('button'));
      icon.classList.add('icon', 'mdc-icon-button');
      
      var ripple = icon.appendChild(document.createElement('span'));
      ripple.classList.add('mdc-icon-button__ripple');
      
      icon.appendChild(document.createTextNode(data[0]));
      
      icon.onclick = function(){
        $(document).trigger('action--'+data[1]);
      }
    }
    var title = left.appendChild(document.createElement('span'));
    title.classList.add('mdc-top-app-bar__title');
    title.textContent = document.title;
    
    var right = row.appendChild(document.createElement('section'));
    right.classList.add('mdc-top-app-bar__section', 'mdc-top-app-bar__section--align-end')
    var ria = this.getAttribute('data-right-icons');
    var righticons = ria?ria.split(';'):[];
    for(var i in righticons){
      var data = righticons[i].split(',');
      var icon = right.appendChild(document.createElement('button'));
      icon.classList.add('icon', 'mdc-icon-button');
      
      var ripple = icon.appendChild(document.createElement('span'));
      ripple.classList.add('mdc-icon-button__ripple');
      
      icon.appendChild(document.createTextNode(data[0]));
      
      icon.onclick = function(){
        $(document).trigger('action--'+data[1]);
      }
    }
  }
}
customElements.define('m-topbar', MaterialTopBar);

export class MaterialButton extends HTMLAnchorElement {
  constructor(){
    super();
    this.classList.add('mdc-button', 'mdc-button--raised');
    var name = this.textContent;
    this.innerHTML = '';
    var ripple = this.appendChild(document.createElement('span'));
    ripple.classList.add('mdc-button__ripple');
    var icon = this.appendChild(document.createElement('i'));
    icon.classList.add('icon', 'mdc-button__icon');
    icon.textContent = this.getAttribute('data-icon');
    var label = this.appendChild(document.createElement('span'));
    label.classList.add('mdc-button__label');
    label.textContent = name;
  }
}
customElements.define('m-button', MaterialButton, {extends:'a'});