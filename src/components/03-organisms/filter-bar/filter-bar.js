import Swiper, { Autoplay } from 'swiper';
import gsap from 'gsap';

class FilterBar {

	constructor() {
		this.name = 'filter-bar';
		this.elements = {};
		this.swiper = null;
	};
	
	init = () => {
		this.defineElements();
		this.applyPlugin();
		this.setupSwiper();
		this.setupEventListeners();
	};

	defineElements = () => {
		this.elements = {
			recipes: document.querySelectorAll('.menu-overview .container__item'),
			emptyNote: document.querySelector('.empty-note'),
			filterBar: {
				bar: document.querySelectorAll('.filter-bar '),
				items: document.querySelectorAll('.filter-bar .filter-bar__item'),
			},
		};
	};

	applyPlugin = () => {
		Swiper.use([Autoplay]);
	};

	setupSwiper = () => {
		this.swiper = new Swiper('.filter-bar', {
			direction: 'horizontal',
			spaceBetween: 0,
			slidesPerView: 'auto',
			autoplay: {
				delay: 5000,
			},
		});
	};

	setupEventListeners = () => {
		this.swiper.on('reachEnd', this.swiper.autoplay.stop);
		this.elements.filterBar.items.forEach((item) => {
			item.addEventListener('click', () => { return this.filterRecipes(item.dataset.category); });
		});
	};

	filterRecipes = async (category) => {
		const totalRecipes = [...this.elements.recipes].reduce((accumulator, recipe) => {
			return recipe.dataset.category.includes(category) ? accumulator + 1 : accumulator;
		}, 0);
		totalRecipes <= 0 ? gsap.to(this.elements.emptyNote, { display: 'block', delay: 1 }) : gsap.to(this.elements.emptyNote, { display: 'none', delay: 0 });
		await this.elements.recipes.forEach(async (recipe) => {
			if (category === 'All' || recipe.dataset.category.includes(category)) {
				await gsap.to(recipe, { display: 'block' });
			} else {
				await gsap.to(recipe, { display: 'none' });
			};
		});
	};

};

const filterBar = new FilterBar();
filterBar.init();
