// Toggles the coupon code on the cart page from the Dkart app.
// Since the code is dynamically generated, a Mutation Observer is used to detect the element.
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector(".cart-section");
  const observer = new MutationObserver(() => {
    const toggleLink = document.querySelector('.coupon-toggle-link');
    const couponForm = document.querySelector('.scDiscount__container');
    if (toggleLink && couponForm) {
      couponForm.classList.add('visible');
      toggleLink.addEventListener('click', () => {
        couponForm.classList.toggle('visible');
        if (couponForm.classList.contains('visible')) {
          toggleLink.textContent = 'Click Here';
        } else {
          toggleLink.textContent = 'Hide';
        }
      });
      observer.disconnect();
    }
  });
  observer.observe(container, {
    childList: true,
    subtree: true
  });
});