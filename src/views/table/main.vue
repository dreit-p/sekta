<template lang="pug">
div.table-bg
	.table-input-wrapper
		input.table-search(
			:tabindex='1'
			v-model='searchString'
			@keyup='search()'
			@keyup.enter='searchOnEnter()'
		)
	div.table-searched-foods(v-if='searchedFoods.length > 0')
		div.table-search-result(
			v-for='(food, idx) in searchedFoods'
			v-text='food.name'
			:tabindex='idx + 2'
			@keyup.enter='selectFood(food)'
			@click='selectFood(food)'
		)
	div.table-answer(v-if='selectedFood')
		div.table-color-category(:style="{ backgroundColor: colors[getRandomInt(0, 4)]}")
		div.table-answer-wrapper
			div.table-product-name {{selectedFood.name}}
			div.table-product-description {{selectedFood.additional[10]}}
			div.table-artefacts
				div.table-amount-div(v-if='selectedFood.additional[3]')
					img.table-amount(:src="`${require('@/assets/images/table/icons/amount' + selectedFood.additional[3] + '.png')}`")
					div
						span Рекомендуемый объем порции:
						span(:style="{ fontWeight: 'bold' }") {{amountCategories[selectedFood.additional[3]]}}
				div.table-gluten(v-if='selectedFood.additional[5]')
					img.table-amount(:src="`${require('@/assets/images/table/icons/gluten.png')}`")
					span Содержит или может
					span содержать глютен
				div.table-vegan(v-if='selectedFood.additional[6]')
					img.table-amount(:src="`${require('@/assets/images/table/icons/vegan.png')}`")
					span(:style="{ color: '#019323' }") Vegan & Detox
				div.table-forbidden(v-if='selectedFood.additional[4]')
					div(
						v-for="forbiddenId in selectedFood.additional[4].split(',')"
					)
						img.table-amount(:src="`${require('@/assets/images/table/icons/no' + forbiddenId + '.png')}`")
						span {{forbiddenCategories[forbiddenId]}}
			div.table-info-wrapper
				div.table-info-element(v-for='add in foodAdditional')
					span {{add.title}}:
					span(:style="{ fontWeight: 'bold' }")  {{add.value}}
	div.table-answer(v-if='isNotFound')
		div.table-answer-wrapper
			div.table-product-name(:style="{ paddingTop: '20px' }") {{searchString}}
			div.table-product-description Уточни у куратора стоит ли это есть
			div.table-ikea-wrapper
				img.table-ikea(:src="`${require('@/assets/images/table/icons/ikea.png')}`")


</template>

<script>
import api from '../../assets/api'


const CONVERSION = { 'Q':'Й', 'W':'Ц', 'E':'У', 'R':'К', 'T':'Е', 'Y':'Н', 'U':'Г', 'I':'Ш', 'O':'Щ', 'P':'З', '[':'Х',
	']':'Ъ', 'A':'Ф', 'S':'Ы', 'D':'В', 'F':'А', 'G':'П', 'H':'Р', 'J':'О', 'K':'Л', 'L':'Д', ';':'Ж', '\'':'Э', 'Z':'Я',
	'X':'Ч', 'C':'С', 'V':'М', 'B':'И', 'N':'Т', 'M':'Ь', ',':'Б', '.':'Ю', '/':'.', 'q':'й', 'w':'ц', 'e':'у', 'r':'к',
	't':'е', 'y':'н', 'u':'г', 'i':'ш', 'o':'щ', 'p':'з', '[':'х', ']':'ъ', 'a':'ф', 's':'ы', 'd':'в', 'f':'а',
	'g':'п', 'h':'р', 'j':'о', 'k':'л', 'l':'д', ';':'ж', '\'':'э', 'z':'я', 'x':'ч', 'c':'с', 'v':'м', 'b':'и',
	'n':'т',  'm':'ь', ',':'б', '.':'ю', '/':'.'
};
export default {
	name: "Table",
	data() {
		return {
			searchString: '',
			foods: [],
			selectedFood: null,
			searchedFoods: [],
			isNotFound: false,

			colors: ["#e96e5a", "#ff9933", "#cccc33", "#66cc00", "#019323"],
			colorCategories: ["", "Не рекомендуется", "Не чаще 1 раза в неделю", "3-4 раза в неделю", "Раз в день", "Можно всегда"],
			amountCategories: ["", "Немного в качестве приправы по вкусу", "Одна столовая ложка", "Горсть", "Пара кусочков", "250-350 мл", "150-250 мл", "1 штука или 250-350 мл"],
			forbiddenCategories: ["", "Солёные продукты", "Высокое содержание жира", "Копчёное", "Низкая пищевая ценность", "Много уксуса", "Очень острое", "Содержит сахар", "Содержит искуственные добавки"],
			foodCategory: ["", "Животный белок: мясо", "Животный белок: птица", "Животный белок: рыба", "Животный белок: морепродукты", "Овощ", "Ягода", "Быстрый углевод", "Медленный углевод", "Напиток", "Соус", "Фрукт", "Гриб", "Приправа", "Орехи, семечки", "Молочный белок", "Масла", "Растительный белок"],
		}
	},
	created() {
		this.getFoods();
	},
	computed: {
		foodAdditional() {
			const MAP = {
				16: 'Гликемический индекс',
				11: 'Калорийность',
				14: 'Белки',
				13: 'Жиры',
				12: 'Углеводы',
			};

			return Object
				.keys(MAP)
				.map(key => ({
					title: MAP[key],
					value: this.selectedFood.additional[key],
				}))
				.filter(add => !!add.value);
		},
	},
	watch: {
		searchString() {
			let str = this.searchString;
			str = str.substr(0,1).toUpperCase() + str.substr(1)

			let res = '';

			for (let i = 0; i <= str.length; i++) {
				let char = str.charAt(i);
				res += (char in CONVERSION) ? CONVERSION[char] : char;
			}

			this.searchString = res;
		}
	},
	methods: {
		search() {
			this.selectedFood = null;
			this.isNotFound = false;

			this.searchedFoods = this.foods.filter(food => this.searchString.length > 0 && food.name.startsWith(this.searchString));
		},
		searchOnEnter() {
			if (this.searchedFoods.length > 0){
				this.selectFood(this.searchedFoods[0])
			} else {
				this.selectedFood = null;
				this.isNotFound = true;
			}
		},
		selectFood(food) {
			this.selectedFood = food;
			this.searchString = food.name;
			this.searchedFoods = [];
			this.isNotFound = false;
		},

		getFoods() {
			return api.table.getFoods().then( resp => {
				this.foods = resp.data.data;
			})
		},
		getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
	},

}
</script>

<style scoped>
	.table-bg {
		background-image: url(~@/assets/images/table/wood.png);
		min-height: 100vh;
		padding-bottom: 50px;
	}

	.table-search {
		margin-top:100px;
		width:60%;
		height:65px;
		font-size:36px;
		padding-left:20px;
		outline-width:0;
		padding-right:60px;
		background: white url(~@/assets/images/table/searchIcon.png) no-repeat scroll right 50%;
		border: 2px solid gray;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		font-family: Bitter;
	}

	.table-input-wrapper {
		display: flex;
		justify-content: center;
	}

	.table-searched-foods {
		display: block;
		height: 440px;
		margin-top: 0;
		margin-right: auto;
		margin-left: auto;
		width: 60%;
		overflow: hidden auto;
	}

	.table-search-result {
		height: 60px;
		line-height: 60px;
		background-color: white;
		margin-top: 0;
		width: 100%;
		font-size: 34px;
		text-align: left;
		padding-left: 20px;
		cursor: pointer;
		border-bottom: 1px solid gray;
	}

	.table-search-result:hover,
	.table-search-result:focus {
		background-color: lightgray;
	}

	.table-answer {
		margin: 50px auto 100px;
		display: block;
		width: 600px;
		padding-bottom: 50px;
		box-shadow:rgb(136, 136, 136) 5px 5px 2px;
		user-select: none;
		background-color:rgb(239, 239, 239);
		position: relative;
	}

	.table-color-category {
		height: 36px;
		font-size: 24px;
		color: white;
		z-index: 100;
		font-family: Nipcen;
		box-shadow: rgb(136, 136, 136) 2px 2px 1px;
		float: left;
		padding-left: 10px;
		padding-right: 10px;
		background-color: transparent;
		position: absolute;
		top: 45px;
		left: 15px;
		text-indent: 0;
		overflow: hidden;
		display: block;
	}

	.table-answer-wrapper {
		background-color: white;
		border-radius: 5px;
		position: relative;
		left: 20px;
		top: 20px;
		margin-right: 40px;
		padding-bottom: 40px;
	}

	.table-product-name {
		font-family: BitterBold;
		font-size: 30px;
		color:
			black;
		padding-left: 20px;
		padding-right: 140px;
		overflow: auto;
		padding-top: 75px;
	}

	.table-product-description {
		font-family: Bitter;
		font-size: 18px;
		color: black;
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 8px;
	}

	.table-ikea-wrapper {
		display: flex;
		justify-content: center;
	}

	.table-ikea {
		display: block;
		margin-top: 30px;
		z-index: 100;
		max-width: 500px;
	}

	.table-artefacts {
		margin-top: 35px;
		margin-left: 40px;
		margin-right: 40px;
		text-align: center;
	}



	.table-artefacts span {
		display: block;
		font-size: 15px;
		color: black;
		font-family: Bitter;
	}

	.table-amount {
		max-height: 64px;
		max-width: 64px;
	}

	.table-amount-div {
		margin-top: 35px;
	}

	.table-gluten {
		margin-top: 35px;
	}

	.table-vegan {
		margin-top: 35px;
	}

	.table-forbidden > div {
		margin-top: 35px;
	}

	.table-info-wrapper {
		margin-top: 35px;
	}

	.table-info-element {
		text-align: center;
		margin-top: 20px;
		font-family: Bitter;
		font-size :15px
	}
</style>
