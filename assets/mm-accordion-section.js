class AccordionElement extends HTMLElement {
    constructor() {
      super();
      this.toggleItem = this.toggleItem.bind(this);
    }
    connectedCallback() {
      this.setupAccordionItems();
    }
    setupAccordionItems() {
      const accordionItems = this.querySelectorAll('.questions__group .questions__item');
      if (accordionItems) {
        accordionItems.forEach((item) => {
          const accordionHeader = item.querySelector('.questions__header');
          if (accordionHeader) {
            accordionHeader.addEventListener('click', (event) => {
              const openItem = this.querySelector('.accordion-open');
              this.toggleItem(item);
              if (openItem && openItem !== item) {
                this.toggleItem(openItem);
              }
            });
          }
        });
      }
    }
    toggleItem(item) {
      const accordionContent = item.querySelector('.questions__content');
      const plusIcon = item.querySelector('.icon-plus');
      const minusIcon = item.querySelector('.icon-minus');
      if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style');
        item.classList.remove('accordion-open');
        minusIcon.classList.add('hidden');
        plusIcon.classList.remove('hidden');
      } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px';
        item.classList.add('accordion-open');
        minusIcon.classList.remove('hidden');
        plusIcon.classList.add('hidden');
      }
    }
}
customElements.define('accordion-element', AccordionElement);