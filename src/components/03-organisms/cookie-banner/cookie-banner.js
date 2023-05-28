import gsap from 'gsap';

class CookieBanner {
	
	constructor() {
		(this.name = 'cookie-banner'), (this.elements = {});
	}

	init = () => {
		this.defineElements();
	};

	defineElements = () => {
		this.elements = {
			cookieBanner: document.querySelector('.cookie-banner'),
			buttons: {
				recipe: document.querySelector('.buttons .button--dark'),
				agree: document.querySelector('.buttons .button--light'),
			},
		};
	};

	cookieCheck = () => {
		const cookie = localStorage.getItem('cookie');
		if (!cookie) {
			setTimeout(showCookieBanner, 1000);
		}
	};
}

const cookieBanner = new CookieBanner();
cookieBanner.init();

// // DEFINE ELEMENTS
// const elements = {
//   cookieBanner: document.querySelector('.cookie-banner'),
//   buttons: {
//     recipe: document.querySelector('.buttons .button--dark'),
//     agree: document.querySelector('.buttons .button--light'),
//   },
// };

// // COOKIE CHECK
// const cookieCheck = () => {
//   const cookie = localStorage.getItem('cookie');
//   if (!cookie) {
//     setTimeout(showCookieBanner, 1000);
//   }
// };

// // SHOW COOKIE-BANNER
// const showCookieBanner = () => {
//   gsap.to(elements.cookieBanner, { bottom: '24px', duration: 2 });
// };

// // HIDE COOKIE-BANNER
// const hideCookieBanner = () => {
//   gsap.to(elements.cookieBanner, { bottom: '-100vh', duration: 4 });
//   localStorage.setItem('cookie', "I'm just a happy cookie sitting comfy in your browser.");
// };

// // SHOW RECIPE
// const showRecipe = () => {
//   localStorage.setItem('cookie', "I'm just a happy cookie sitting comfy in your browser.");
//   window.location.href = '/recipes/chocolate-chip-cookies';
// };

// // SETUP EVENT LISTENERS
// elements.buttons.agree.addEventListener('click', hideCookieBanner);
// elements.buttons.recipe.addEventListener('click', showRecipe);
// window.addEventListener('DOMContentLoaded', () => {
//   cookieCheck();
// });
