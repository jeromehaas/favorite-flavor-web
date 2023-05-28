import gsap from 'gsap';

class CookieBanner {

	constructor() {
		this.name = 'cookie-banner';
		this.elements = {};
	};

	init = () => {
		this.defineElements();
		this.cookieCheck();
		this.setupEventListeners();
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
			setTimeout(this.showCookieBanner, 1000);
		}
	};

	showCookieBanner = () => {
		gsap.to(this.elements.cookieBanner, { bottom: '24px', duration: 2 });
	};

	hideCookieBanner = () => {
		gsap.to(this.elements.cookieBanner, { bottom: '-100vh', duration: 4 });
		localStorage.setItem('cookie', 'I\'m just a happy cookie sitting comfy in your browser.');
	};

	showRecipe = () => {
		localStorage.setItem('cookie', 'I\'m just a happy cookie sitting comfy in your browser.');
		window.location.href = '/recipes/chocolate-chip-cookies';
	};

	setupEventListeners = () => {
		this.elements.buttons.agree.addEventListener('click', this.hideCookieBanner);
		this.elements.buttons.recipe.addEventListener('click', this.showRecipe);
	};

};

const cookieBanner = new CookieBanner();
cookieBanner.init();
