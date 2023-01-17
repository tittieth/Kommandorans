/* eslint-disable linebreak-style */
import './style/style.scss';
import gsap from 'gsap';

const menuBtn: HTMLButtonElement | null = document.querySelector('#menu-btn');
const menuSausages: SVGElement[] | null = Array.from(document.querySelectorAll('.menu-sausages'));

const navContainer: HTMLDivElement | null = document.querySelector('#nav-container');
const nav: HTMLElement | null = document.querySelector('#nav');

const cookieContainer: HTMLDivElement | null = document.querySelector('#cookie-container');
const acceptCookiesBtn: HTMLButtonElement | null = document.querySelector('#accept-cookies');
const declineCookiesBtn: HTMLButtonElement | null = document.querySelector('#decline-cookies');
const cookiesApproved: boolean | null = JSON.parse(localStorage.getItem('cookiesApproved') as string) as boolean;

const bookTableSingleBtn = document.querySelector('#singleBookTable') as HTMLButtonElement;
const bookTableMenuOption: HTMLLinkElement | null = document.querySelector('#book-table-menu-option');

const bookTableBtnTop = document.querySelector('#topBookTable') as HTMLButtonElement;
const bookingFormTop = document.getElementById('bookingFormTop') as HTMLFormElement;
const bookTableBtnBottom = document.querySelector('#bottom-book-table') as HTMLButtonElement;
const bookingFormBottom = document.getElementById('bookingFormBottom') as HTMLFormElement;

const scrollToForm = document.querySelector('#singleBookTable') as HTMLButtonElement;

let navMenuBtnClicked = false;

if (cookiesApproved) {
  cookieContainer?.classList.toggle('hidden');
}

function toggleNavMenu(): void {
  navMenuBtnClicked = !navMenuBtnClicked;
  if (menuSausages) {
    menuSausages.forEach((sausage) => {
      gsap.to(sausage, { duration: 1, rotation: navMenuBtnClicked ? 180 : 0, transformOrigin: '50% 50%' });
    });
  }
  if (navContainer && nav) {
    navContainer.classList.toggle('hidden');
    if (navMenuBtnClicked) {
      gsap.to(nav, {
        top: 0,
        duration: 0.5,
      });
    } else {
      nav.style.top = '-100vh';
    }
    document.querySelector('html')?.classList.toggle('no-scroll');
  }
}

function acceptCookies() {
  cookieContainer?.classList.toggle('hidden');
  localStorage.setItem('cookiesApproved', 'true');
}

function declineCookies() {
  cookieContainer?.classList.toggle('hidden');
  localStorage.setItem('cookiesApproved', 'false');
}

menuBtn?.addEventListener('click', toggleNavMenu);
acceptCookiesBtn?.addEventListener('click', acceptCookies);
declineCookiesBtn?.addEventListener('click', declineCookies);

navContainer?.addEventListener('click', toggleNavMenu);

function setVisible(element: HTMLElement, visible: boolean) {
  if (visible) {
    element.classList.remove('hidden');
    element.classList.add('visible');
  } else {
    element.classList.remove('visible');
    element.classList.add('hidden');
  }
}

function displayTopBookingForm() {
  setVisible(bookingFormTop, true);
}

function displayBottomBookingForm() {
  setVisible(bookingFormBottom, true);
}

bookTableSingleBtn.addEventListener('click', displayBottomBookingForm);
bookTableBtnTop.addEventListener('click', displayTopBookingForm);
bookTableBtnBottom.addEventListener('click', displayBottomBookingForm);

function enableBookBtn(form: HTMLFormElement) {
  const formOrderBtn = form.querySelector('.form-order-btn') as HTMLButtonElement;

  let shouldEnable = true;

  const inputElements = form.querySelectorAll('input');

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === '') {
      shouldEnable = false;
    }
  }

  if (shouldEnable) {
    formOrderBtn.disabled = false;
    formOrderBtn.classList.remove('disabled-button');
    formOrderBtn.classList.add('primary-button');
  } else {
    formOrderBtn.disabled = true;
    formOrderBtn.classList.remove('primary-button');
    formOrderBtn.classList.add('disabled-button');
  }
}

function cancelForm(e: Event, bookingForm: HTMLFormElement) {
  e.preventDefault();
  setVisible(bookingForm, false);
}

function initializeForm(form: HTMLFormElement) {
  const formOrderBtn = form.querySelector('.form-order-btn') as HTMLButtonElement;
  const formCancelBtn = form.querySelector('.form-cancel-btn') as HTMLButtonElement;
  formOrderBtn.disabled = true;

  const inputElements = form.querySelectorAll('input');

  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('input', () => enableBookBtn(form));
  }

  formCancelBtn.addEventListener('click', (e) => cancelForm(e, form));
}

initializeForm(bookingFormTop);
initializeForm(bookingFormBottom);

function goToForm() {
  bookingFormBottom.scrollIntoView();
}

function scrollToBookingForm(): void {
  if (window.innerWidth < 744) {
    displayBottomBookingForm();
    goToForm();
  } else {
    displayTopBookingForm();
  }
}

scrollToForm.addEventListener('click', goToForm);
bookTableMenuOption?.addEventListener('click', scrollToBookingForm);
