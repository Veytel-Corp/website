const productBtnsManager = {
  productsPageURL: window.location.href.includes("staging")
    ? "/staging/products.html"
    : "/products.html",
  targetProduct: "",
};
productBtnsManager.getTargetURL = () => {
  const targetProduct = productBtnsManager.targetProduct;
  const productsPageURL = productBtnsManager.productsPageURL;
  return `${productsPageURL}?productname=${targetProduct}`;
};
productBtnsManager.sendToProductsPage = () => {
  const targetURL = productBtnsManager.getTargetURL();
  window.location.assign(targetURL);
};
productBtnsManager.initDiscoverMoreBtn = () => {
  const discoverMoreBtns = document.querySelectorAll(".discover-more-button");
  discoverMoreBtns.forEach((btn) => {
    const productName = btn.parentElement.dataset.productname;
    btn.addEventListener("click", () => {
      productBtnsManager.targetProduct = productName;
      productBtnsManager.sendToProductsPage();
    });
  });
};

const requestDemoFormManager = {
  requestDemoModalEl: document.querySelector(".request-demo-modal"),
  formEl: document.querySelector(".request-demo-form"),
  thankYouEl: document.querySelector(".request-demo-success"),
  somethingWentWrongEl: document.querySelector(".request-demo-fail"),
  loaderEl: document.querySelector(".loader-con"),
  exitModalEl: document.querySelector(".exit-btn"),
  requestURL:
    "https://script.google.com/macros/s/AKfycby22ij9ioLxPK8tXGpKyJy5j_eqDyXHpoDZPVpLMv7XtRvT7WjqZ88sY_Uyw539Ygzl/exec",
  targetProduct: "",
  formData: null,
};
requestDemoFormManager.toggleFormView = () => {
  const requestDemoModalEl = requestDemoFormManager.requestDemoModalEl;
  requestDemoModalEl.classList.toggle("hidden");
};
requestDemoFormManager.setFormData = () => {
  const targetProduct = requestDemoFormManager.targetProduct;
  const formEl = requestDemoFormManager.formEl;
  const formData = new FormData(formEl);
  formData.set("name", `Request Demo for ${targetProduct}`);
  formData.set(
    "message",
    `I would like to know more about the product ${targetProduct}.`
  );
  requestDemoFormManager.formData = formData;
};
requestDemoFormManager.getFormDataObj = () => {
  const formData = requestDemoFormManager.formData;
  return Object.fromEntries(formData.entries());
};
requestDemoFormManager.submitForm = async (e) => {
  e.preventDefault();
  requestDemoFormManager.setFormData();
  const formDataObj = requestDemoFormManager.getFormDataObj();
  try {
    const requestURL = requestDemoFormManager.requestURL;
    const loaderEl = requestDemoFormManager.loaderEl;
    loaderEl.classList.remove("hidden");
    const response = await fetch(requestURL, {
      method: "POST",
      body: new URLSearchParams(formDataObj),
    });
    const data = await response.json();
    if (data.status === "success") {
      requestDemoFormManager.successSubmitDOMChange();
    }
  } catch (err) {
    requestDemoFormManager.failSubmitDOMChange(err);
  }
};
requestDemoFormManager.successSubmitDOMChange = () => {
  const formEl = requestDemoFormManager.formEl;
  const thankYouEl = requestDemoFormManager.thankYouEl;
  const loaderEl = requestDemoFormManager.loaderEl;
  const exitModalEl = requestDemoFormManager.exitModalEl;

  formEl.reset();
  exitModalEl.classList.remove("hidden");
  thankYouEl.classList.remove("hidden");
  formEl.classList.add("hidden");
  loaderEl.classList.add("hidden");
};
requestDemoFormManager.failSubmitDOMChange = (err) => {
  console.log(err);
  const formEl = requestDemoFormManager.formEl;
  const somethingWentWrongEl = requestDemoFormManager.somethingWentWrongEl;
  const loaderEl = requestDemoFormManager.loaderEl;
  const exitModalEl = requestDemoFormManager.exitModalEl;

  exitModalEl.classList.remove("hidden");
  somethingWentWrongEl.classList.remove("hidden");
  formEl.classList.add("hidden");
  loaderEl.classList.add("hidden");
};
requestDemoFormManager.resetModalView = () => {
  const exitModalEl = requestDemoFormManager.exitModalEl;
  const thankYouEl = requestDemoFormManager.thankYouEl;
  const somethingWentWrongEl = requestDemoFormManager.somethingWentWrongEl;
  const formEl = requestDemoFormManager.formEl;

  exitModalEl.classList.add("hidden");
  thankYouEl.classList.add("hidden");
  somethingWentWrongEl.classList.add("hidden");
  formEl.classList.remove("hidden");
  formEl.reset();
  requestDemoFormManager.toggleFormView();
};
requestDemoFormManager.initRequestDemoBtn = () => {
  const productButtonCons = document.querySelectorAll(".product-button-con");
  productButtonCons.forEach((con) => {
    const reqDemBtnEl = con.querySelector(".request-demo-button");
    reqDemBtnEl.addEventListener("click", () => {
      requestDemoFormManager.targetProduct = con.dataset.productname;
      requestDemoFormManager.toggleFormView();
    });
  });
};
requestDemoFormManager.initFormSumit = () => {
  const formEl = requestDemoFormManager.formEl;
  formEl.addEventListener("submit", requestDemoFormManager.submitForm);
};
requestDemoFormManager.initCloseRequestDemoModalBtn = () => {
  const closeRequestDemoModalEl = document.querySelectorAll(
    ".close-request-demo-modal"
  );
  closeRequestDemoModalEl.forEach((btn) => {
    btn.addEventListener("click", requestDemoFormManager.resetModalView);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  productBtnsManager.initDiscoverMoreBtn();
  requestDemoFormManager.initRequestDemoBtn();
  requestDemoFormManager.initFormSumit();
  requestDemoFormManager.initCloseRequestDemoModalBtn();
});
