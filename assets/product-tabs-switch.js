class TabSwitchProduct extends HTMLElement {
  constructor() {
    super();
    this.currentVisibleContent = null;
  }
  connectedCallback() {
    this.initContent();
    this.addClickEvents();
    this.addMobileAccordionEvents();
    this.openFirstAccordion();
  }
  initContent() {
    const firstContent = this.querySelector(".collapsible-content--details");
    if (firstContent) {
      const header = firstContent.getAttribute("data-header");
      if (header) {
        this.currentVisibleContent = document.querySelector(`[data-title="${header}"]`);
        if (this.currentVisibleContent) {
          this.showContent(firstContent, this.currentVisibleContent);
        }
      }
    }
  }
  addClickEvents() {
    const detailsElements = this.querySelectorAll(".collapsible-content--details");
    if (detailsElements.length > 0) {
      detailsElements.forEach((element) => {
        element.addEventListener("click", (e) => this.handleClick(e));
      });
    }
  }
  handleClick(e) {
    const clickedHeader = e.currentTarget;
    const header = clickedHeader.getAttribute("data-header");
    if (header) {
      const content = document.querySelector(`[data-title="${header}"]`);
      if (content && this.currentVisibleContent !== content) {
        if (this.currentVisibleContent) {
          this.hideContent(this.currentVisibleContent);
        }
        this.showContent(clickedHeader, content);
      }
    }
  }
  showContent(headerElement, contentElement) {
    if (headerElement && contentElement) {
      headerElement.classList.add("active");
      contentElement.classList.remove("hidden");
      this.currentVisibleContent = contentElement;
    }
  }
  hideContent(contentElement) {
    const activeHeader = this.querySelector(".collapsible-content--details.active");
    if (activeHeader) {
      activeHeader.classList.remove("active");
    }
    if (contentElement) {
      contentElement.classList.add("hidden");
    }
  }
  addMobileAccordionEvents() {
    const detailsElements = this.querySelectorAll("details");
    if (detailsElements.length > 0) {
      detailsElements.forEach((detailsElement) => {
        detailsElement.addEventListener("toggle", () => {
          if (detailsElement.open) {
            detailsElements.forEach((otherDetails) => {
              if (otherDetails !== detailsElement && otherDetails.open) {
                otherDetails.open = false;
              }
            });
            const summary = detailsElement.querySelector("summary");
            if (summary) {
              this.loadAccordionContent(summary);
            }
          }
        });
      });
    }
  }
  openFirstAccordion() {
    const firstDetails = this.querySelector("details");
    if (firstDetails) {
      firstDetails.open = true;
      const summary = firstDetails.querySelector("summary");
      if (summary) {
        this.loadAccordionContent(summary);
      }
    }
  }
  loadAccordionContent(summary) {
    const mobileTitle = summary.getAttribute("data-title-mobile");
    const index = summary.getAttribute("data-index");
    if (mobileTitle && index) {
      document.querySelectorAll(`.mobile-accordian-content`).forEach((contentSection) => {
        const contentTitle = contentSection.getAttribute("data-title");
        if (contentTitle === mobileTitle) {
          const mobileContent = this.querySelector(`.mobile-content[data-index="${index}"]`);
          if (mobileContent) {
            mobileContent.innerHTML = contentSection.innerHTML;
          }
        }
      });
    }
  }
}
customElements.define("tab-switch-product", TabSwitchProduct);