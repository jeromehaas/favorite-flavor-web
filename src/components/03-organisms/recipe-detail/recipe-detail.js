class RecipeDetail {

	constructor() {
		this.name = 'recipe-detail';
		this.elements = {};
		this.ingredients = [];
	};

	init = () => {
		this.defineElements();
		this.getIngredients();
		this.setupEventListeners();
	};

	defineElements = () => {
		this.elements = {
			cookTime: document.querySelector('.cook-time__value'),
			ingredients: {
				list: document.querySelector('.ingredients__list'),
				items: document.querySelectorAll('.ingredients__list .list__item'),
				amount: document.querySelectorAll('.ingredients__list .item__amount'),
				controller: {
					buttons: {
						minus: document.querySelector('.button--minus'),
						plus: document.querySelector('.button--plus'),
					},
					label: {
						amount: document.querySelector('.label__amount'),
						unit: document.querySelector('.label__unit'),
					},
				},
			},
		};
	};

	getIngredients = () => {
		this.elements.ingredients.items.forEach((item) => {
			this.ingredients.push({
				amount: parseInt(item.querySelector('.item__amount').textContent, 10),
				unit: item.querySelector('.item__unit').textContent,
				name: item.querySelector('.item__name').textContent,
			});
		});

	};

	formatNumber = (number) => {
		return (Math.floor(number * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
	};

	deformatNumber = (number) => {
		return parseInt(number.replace(/'/g, ''), 10);
	};

	handleMinusClick = () => {
		const amount = parseInt(this.elements.ingredients.controller.label.amount.textContent, 10);
		if (amount === 1) return;
		this.elements.ingredients.controller.label.amount.textContent = (amount - 1).toString();
		this.updateServings(amount, 'plus');
	};

	handlePlusClick = () => {
		const amount = parseInt(this.elements.ingredients.controller.label.amount.textContent, 10);
		if (amount === 20) return;
		this.elements.ingredients.controller.label.amount.textContent = (amount + 1).toString();
		this.updateServings(amount, 'minus');
	};

	formatCookTime = () => {
		const value = parseInt(this.elements.cookTime.textContent, 10);
		const hours = Math.floor(value / 60);
		const remainingMinutes = value % 60;
		let str = '';
		if (hours > 0) { str += `${hours }h `; };
		if (remainingMinutes > 0) { str += `${remainingMinutes }min`; };
		this.elements.cookTime.textContent = str;
	};

	updateServings = (amount, direction) => {
		document.querySelectorAll('.ingredients .list__item').forEach((item) => { return item.remove(); });
		this.ingredients.forEach((ingredient) => {
			const listNode = document.createElement('li');
			const amountNode = document.createElement('span');
			const unitNode = document.createElement('span');
			const nameNode = document.createElement('span');
			listNode.classList.add('list__item', 'item');
			amountNode.classList.add('item__amount');
			unitNode.classList.add('item__unit');
			nameNode.classList.add('item__name');
			amountNode.textContent = this.formatNumber((ingredient.amount / 4) * (direction === 'plus' ? amount - 1 : amount + 1));
			unitNode.textContent = ingredient.unit;
			nameNode.textContent = ingredient.name;
			listNode.appendChild(amountNode);
			listNode.appendChild(unitNode);
			listNode.appendChild(nameNode);
			this.elements.ingredients.list.appendChild(listNode);
		});
	};

	setupEventListeners = () => {
		this.elements.ingredients.controller.buttons.minus.addEventListener('click', this.handleMinusClick);
		this.elements.ingredients.controller.buttons.plus.addEventListener('click', this.handlePlusClick);
		window.addEventListener('DOMContentLoaded', () => {
			this.formatCookTime();
			this.getIngredients();
		});
	};

};

const recipeDetail = new RecipeDetail();
recipeDetail.init();

// // DEFINE ELEMENTS
// const elements = {
// 	cookTime: document.querySelector('.cook-time__value'),
// 	ingredients: {
// 		list: document.querySelector('.ingredients__list'),
// 		items: document.querySelectorAll('.ingredients__list .list__item'),
// 		amount: document.querySelectorAll('.ingredients__list .item__amount'),
// 		controller: {
// 			buttons: {
// 				minus: document.querySelector('.button--minus'),
// 				plus: document.querySelector('.button--plus'),
// 			},
// 			label: {
// 				amount: document.querySelector('.label__amount'),
// 				unit: document.querySelector('.label__unit'),
// 			},
// 		},
// 	},
// };

// // DEFINE INGREDIENTS
// const ingredients = [];
// const getIngredients = () => {
// 	const { items } = elements.ingredients;
// 	items.forEach((item) => {
// 		ingredients.push({
// 			amount: parseInt(item.querySelector('.item__amount').textContent),
// 			unit: item.querySelector('.item__unit').textContent,
// 			name: item.querySelector('.item__name').textContent,
// 		});
// 	});
// };

// // FORMAT NUMBER
// const formatNumber = (number) => {
// 	return (Math.floor(number * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
// };

// // DEFORMAT NUMBER
// const deformatNumber = (number) => {
// 	return parseInt(number.replace(/'/g, ''), 10);
// };

// // FORMAT COOK TIME
// const formatCookTime = () => {
// 	const value = parseInt(elements.cookTime.textContent);
// 	const hours = Math.floor(value / 60);
// 	const remainingMinutes = value % 60;
// 	let str = '';
// 	if (hours > 0) {
// 		str += `${hours }h `;
// 	}
// 	if (remainingMinutes > 0) {
// 		str += `${remainingMinutes }min`;
// 	}
// 	elements.cookTime.textContent = str;
// };

// // HANDLE MINUS CLICK
// const handleMinusClick = () => {
// 	const amount = parseInt(elements.ingredients.controller.label.amount.textContent);
// 	if (amount === 1) return;
// 	elements.ingredients.controller.label.amount.textContent = (amount - 1).toString();
// 	updateServings(amount, 'plus');
// };

// // HANDLE PLUS CLICK
// const handlePlusClick = () => {
// 	const amount = parseInt(elements.ingredients.controller.label.amount.textContent);
// 	if (amount === 20) return;
// 	elements.ingredients.controller.label.amount.textContent = (amount + 1).toString();
// 	updateServings(amount, 'minus');
// };

// // UPDATE SERVINGS
// const updateServings = (amount, direction) => {
// 	document.querySelectorAll('.ingredients .list__item').forEach((item) => { return item.remove(); });
// 	ingredients.forEach((ingredient) => {
// 		const listNode = document.createElement('li');
// 		const amountNode = document.createElement('span');
// 		const unitNode = document.createElement('span');
// 		const nameNode = document.createElement('span');
// 		listNode.classList.add('list__item', 'item');
// 		amountNode.classList.add('item__amount');
// 		unitNode.classList.add('item__unit');
// 		nameNode.classList.add('item__name');
// 		amountNode.textContent = formatNumber((ingredient.amount / 4) * (direction === 'plus' ? amount - 1 : amount + 1));
// 		unitNode.textContent = ingredient.unit;
// 		nameNode.textContent = ingredient.name;
// 		listNode.appendChild(amountNode);
// 		listNode.appendChild(unitNode);
// 		listNode.appendChild(nameNode);
// 		elements.ingredients.list.appendChild(listNode);
// 	});
// };

// // SETUP EVENTLISTENERS
// elements.ingredients.controller.buttons.minus.addEventListener('click', handleMinusClick);
// elements.ingredients.controller.buttons.plus.addEventListener('click', handlePlusClick);
// window.addEventListener('DOMContentLoaded', () => {
// 	formatCookTime();
// 	getIngredients();
// });
