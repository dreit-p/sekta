<template lang="pug">
div.course
	hero(image='course_bg-sectamama.jpg', title='ИДЕАЛЬНОЕ ТЕЛО ДЛЯ МАМ')
		p Пришло время обновить тело, которое с достоинством прошло испытание на прочность. Мы создали программу «Идеальное тело для мамы», чтобы вы могли успевать по максимуму: заниматься ребенком, собой, отдыхать и находить силы и время для тренировок.
		p С вас — желание любоваться собой в зеркале и стать примером для своего малыша. С нас — детально проработанная программа, сбалансированный рацион, консультации и поддержка команды профессиональных кураторов и экспертов, которые не понаслышке знают, какой путь вы сейчас проходите. Ведь они тоже мамы.
		template(v-slot:buttons)
			green-btn(@click='scrollTo("entry-form")') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SEKTAMAMA
				a.notice.center(href='https://account.sektaschool.ru/courses/smama/demo.php', target='_BLANK', rel='noopener noreferrer') ДЕМО-ВЕРСИЯ ПРОГРАММЫ #SEKTAMAMA
				p На курсе вы проработаете мышцы пресса, спины, ног и ягодиц и всего тела комплексно. Даже при наличии противопоказаний мы подберем упражнения, которые будут воздействовать эффективно.
				p
					b Программа подходит:
				ul
					li «Начинающим» мамам
				p Зачем откладывать, если можно заниматься уже сейчас? Мы составили программу так, что вы можете начать в первый же день после естественных родов и через месяц после кесарева сечения. Всё проверено врачами, экспертами и нашим опытом — это безопасно и эффективно.

				ul
					li Мамам «со стажем»
				p Вы никогда не качали пресс и не делали выпады, а дома каждый гурман питается по индивидуальному меню? Рады вас приветствовать. Тренировки на любой вкус и подготовку, а рацион — для всей семьи: расскажем, как угодить каждому и сделать питание семьи более здоровым.

				ul
					li Мамам с диастазом
				p После беременности бывает диастаз, и это нормально. Если он не проходит, мы поможем справиться с ним постепенно — убрать полностью или сократить его проявление.

				p
					b Длительность курса:&nbsp;
					| 9 недель.
				p
					b Стоимость одной недели обучения:&nbsp;
					| 1 350 рублей.
				h5
					b Особенности программы:
				ul
					li Индивидуальные рекомендации по питанию и тренировкам, исходя из состояния вашего здоровья, физических данных и других особенностей.
					li Возможность выбора более строгого подхода к проверке дневников и предоставлению рекомендаций.
					li Тренировки доступны в любое время дня и ночи — занимайтесь, когда это удобно вам и вашей семье.
					li Ничего лишнего — только личное пространство на специализированном портале и шкала прогресса, которая покажет, насколько хорошо вы поработали.
					li Новые лайфхаки по воспитанию и ответы других мам на вопрос «Как вернуть в норму психику после поделок из шишек» — общение и поддержка единомышленников в чате под наставничеством профессиональных кураторов-мам.
					li Забота о здоровье — возможность обсудить вопросы со специалистами (акушер-гинеколог, консультант по грудному вскармливанию)
					li Готовое меню, книги рецептов, полезные советы — всё, чтобы облегчить путь к новому телу.


	caption-section(v-if='courseInfo'
		:dateStart='formatDate()',
	)
	entry-form(v-if='courseInfo', formType='mama', :formData='{prices: courseInfo.prices, platforms: availablePlatforms, id: courseInfo.id}', :courseName='courseInfo.name')
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue';

const COURSE_TAG = 'MAMA';

export default {
	name: 'SektaMama',
	metaInfo: {
		title: '#SektaMama онлайн-курс',
		description: 'Онлайн-курс правильного питания и программы видео тренировок для женщин с детьми от 0 до 7 лет. Постороение семейного рациона и рациона на ГВ, тренировки после КС и естественных родов, компенсация диастаза и многое другое на онлайн-курсе #sektamama.'
	},
	components: {
		hero: () => import('@/components/heroes/aside-hero.vue'),
		CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
		EntryForm: () => import('@/components/entry-form.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	asyncComputed: {
		courseInfo() {
			return this.$store.dispatch('updateOnlineCourses').then(()=>{
				let currentCourseData = this.$store.state.onlineCourses.find((course) => course.tag === COURSE_TAG);
				return currentCourseData;
			});
		}
	},
	data () {
		return {}
	},
	computed: {
		availablePlatforms() {
			return Object.keys(this.courseInfo.start_dates).filter(p => this.courseInfo.start_dates[p])
		}
	},
	methods: {
		...mapActions(['setFormModalState']),
		formatDate() {
			let newObj = {}
			this.availablePlatforms.forEach(platform => {
				newObj[platform] = this.courseInfo.start_dates[platform]
			});
			return newObj
		},
		scrollTo(id) {
			window.scrollTo({
				top: getPosition(document.getElementById(id)).y -65,
				behavior: "smooth"
			});
			function getPosition(el) {

				var x = 0,
					y = 0;

				while (el != null && (el.tagName || '').toLowerCase() != 'html') {
					x += el.offsetLeft || 0;
					y += el.offsetTop || 0;
					el = el.offsetParent;
				}

				return { x: parseInt(x, 10), y: parseInt(y, 10) };
			}
		}
	},
}
</script>

<style lang="postcss">

</style>
