// Toggles the coupon code on the cart page from the Dkart app.
// Since the code is dynamically generated, a Mutation Observer is used to detect the element.
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector(".cart-section");
  const attachToggleListener = () => {
    const toggleLink = document.querySelector('.coupon-toggle-link');
    const couponForm = document.querySelector('.scDiscount__container');
    if (toggleLink && couponForm && !toggleLink.hasAttribute('data-listener-attached')) {
      couponForm.classList.add('visible');
      toggleLink.addEventListener('click', () => {
        couponForm.classList.toggle('visible');
      });
      toggleLink.setAttribute('data-listener-attached', 'true');
    }
  };
  const observer = new MutationObserver(() => {
    attachToggleListener();
  });
  observer.observe(container, {
    childList: true,
    subtree: true
  });
  attachToggleListener();
});