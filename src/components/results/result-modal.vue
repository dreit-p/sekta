<template lang="pug">
    .result-modal
        .result-modal__background
        .result-modal__content(@click='closeHandler()')
            .result-modal__box(@click.stop)
                .result-modal__close(@click='closeHandler()')
                .result-modal__left
                    img.result-modal__img(:src="result.image")
                .result-modal__right
                    .result-modal__title {{result.name}}
                    .result-modal__context 
                        p.result-modal__info(v-html="result.description")
</template>

<script>
export default {
	name: '',
	props: {
		result: Object
	},
	methods: {
		closeHandler() {
			this.$emit('close')
		}
	}
}
</script>


<style lang="postcss">
.result-modal__content, .result-modal__background{
    overflow-x: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}
.result-modal {

    &__background {
        background-color: rgb(0, 0, 0);
        opacity: 0.6;
    }

    &__content {
        display: flex;
    }

    &__box {
        display: flex;
        padding: 70px 70px 50px;
        margin: auto;
        position: relative;
        max-width: 980px;
        background-color: #fff;
        border-radius: 3px;
        @media (max-width: 1009px) {
            padding: 0;
            min-height: 100%;
        }
    }

    &__close {
        position: absolute;
        right: 15px;
        top: 18px;
        width: 15px;
        height: 20px;
        cursor: pointer;
        z-index: 100;
        &:hover {
            &:before, &:after {
                background-color: #0ab69f;
            }
        }
        &:before, &:after {
        position: absolute;
        content: ' ';
        height: 17px;
        width: 3px;
        background-color: #ccc;
        transition: all .3s;
        }
        &:before {
        transform: rotate(45deg);
        }
        &:after {
        transform: rotate(-45deg);
        }
    }

    &__left {
        width: 41.66666667%;
        @media (max-width: 1009px) {
            display: none;
        }
    }
    &__img {
        max-width: 300px;
    }

    &__right {
        width: 58.33333333%;
        @media (max-width: 1009px) {
            width: 100%;
        }
    }
    &__title {
        font-size: 31px;
        font-family: 'Uni Sans','Tahoma','Verdana', serif;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: .25px;
        text-transform: none;
        padding: 0;
        background: 0 0;
        @media (max-width: 1009px) {
            padding: 15px 15px 11px;
            width: 100%;
            min-height: 50px;
            background: #F0F0F0;
            font-size: 18px;
            line-height: 24px;
            text-transform: uppercase;
        }
    }
    &__context {
        padding: 5px 80px 15px 0;
        margin-top: 15px;
        @media (max-width: 1009px) {
            padding: 0 15px 90px;
        }
    }
    &__info {
        text-align: justify;
        font-size: 15px;
        line-height: 25px;

        p {
            line-height: 25px;
        }
    }
}
</style>

