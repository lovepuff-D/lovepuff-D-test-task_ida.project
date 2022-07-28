<script>
    import FieldIsNotFilled from '@/components/AddProduct_FieldIsNotFilled'

    export default {
        name: 'AddProduct',
        components: {
            FieldIsNotFilled
        },
        data() {
            return {
                filledField: {
                    id: '',
                    name: 'Товар 1',
                    description: 'Краткое описание',
                    url: '',
                    cost: '1 000',
                    costNumber: '1000',
                },

                isButtonActive: false,
                isValidUrl: false,
                animated: false,
            }
        },
        methods: {
            addProduct(product) {
                //Запрещаем добавлять товар, если кнопка не активна
                if (!this.isButtonActive) return
                //Анимация успешного добавления
                this.animated = true
                //Добавляем id к новому товара
                this.filledField.id = this.createId()
                //Коммитим для обновления списка товара
                this.$store.commit('ADD_PRODUCT', JSON.stringify(this.filledField))
            },
            createId() {
                let day = new Date().getDay()
                let hour = new Date().getHours()
                let minutes = new Date().getMinutes()
                let seconds = new Date().getSeconds()
                let milliseconds = new Date().getMilliseconds()

                return String(day) + String(hour) + String(minutes) + String(seconds) + String(milliseconds)
            },
            checkValidFields() {
                this.isButtonActive =
                    this.filledField.name.length > 0
                    && this.isValidUrl
                    && this.filledField.cost.length > 0;
            },
            checkValidUrl() {
                this.isValidUrl = /^http:\/\/|^https:\/\//g.test(this.filledField.url);
            },
            checkValidCost() {
                this.filledField.cost = this.filledField.cost.replace(/[\D]/g, '')
                this.filledField.costNumber = this.filledField.cost

                let num = this.filledField.cost.replace(/ /g, '')
                if (num.length < 4 || num.length > 8) return
                if (num.length === 4) {
                    //тысячи
                    console.log(num, 'тысячи')
                    this.filledField.cost = devide(num, 1)
                }
                if (num.length === 5) {
                    //Десятки тысяч
                    //console.log(num, 'Десятки тысяч')
                    this.filledField.cost = devide(num, 2)
                }
                if (num.length === 6) {
                    //Сотни тысяч
                    //console.log(num, 'Сотни тысяч')
                    this.filledField.cost = devide(num, 3)
                }
                if (num.length === 7) {
                    //Миллионы
                    //console.log(num, 'Миллионы')
                    this.filledField.cost = devide(num, 1, 5)
                }
                if (num.length === 8) {
                    //Десятки миллионов
                    //console.log(num, 'Десятки миллионов')
                    this.filledField.cost = devide(num, 2, 6)
                }

                function devide(num, position, secondPosition = null, thirdPosition = null) {
                    let arr = num.split('')
                    arr.splice(position, 0, ' ')
                    arr.splice(secondPosition, 0, ' ')
                    arr.splice(thirdPosition, 0, ' ')
                    console.log(arr, 'indside')
                    return arr.join('')
                }
            },
        },
        computed: {},
        watch: {
            'filledField': {
                handler(value) {
                    this.checkValidFields()
                },
                deep: true,
            },
            'filledField.url': {
                handler(value) {
                    this.checkValidUrl()
                    this.checkValidFields()
                },
            },
            'filledField.cost': {
                handler(value) {
                    this.checkValidCost()
                },
            },
        },
        mounted() {
        }
    }
</script>

<template>
	<div class="addProduct">
		<div class="addProduct__fields">
			<div class="field">
				<div class="field__header required">Наименование товара</div>
				<div class="field__body">
					<input
							v-model="filledField.name"
							type="text"
							placeholder="Введите наименование товара"
					>
					<FieldIsNotFilled :condition="filledField.name.length"/>
				</div>
			</div>
			<div class="field">
				<div class="field__header">Описание товара</div>
				<div class="field__body">
					<textarea
							v-model="filledField.description"
							placeholder="Введите описание товара"
					></textarea>
				</div>
			</div>
			<div class="field">
				<div class="field__header required">Ссылка на изображение товара</div>
				<div class="field__body">
					<input
							v-model="filledField.url"
							type="text"
							placeholder="Введите ссылку: http(s)://"
					>
					<FieldIsNotFilled :condition="isValidUrl"/>
				</div>
			</div>
			<div class="field">
				<div class="field__header required">Цена товара</div>
				<div class="field__body">
					<input
							v-model="filledField.cost"
							type="text"
							placeholder="Введите цену"
					>
					<FieldIsNotFilled :condition="filledField.cost.length"/>
				</div>
			</div>
		</div>
		<div class="addProduct__action action">
			<button
					@click="addProduct()"
					@animationend="animated = false"
					class="action__button"

					:class="{'active__btn': isButtonActive, 'disabled__btn' : !isButtonActive, 'succeed-adding' : animated}"
			>
				Добавить товар
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
	$color_header: #49485E;

	$color_background: #FFFEFB;

	$color_input: #3F3F3F;
	$color_input-placeholder: #B4B4B4;

	$border-radius: 4px;

	$border-radius__button: 10px;


	input, textarea {
		border: none;
		outline: none;
	}

	.addProduct {
		padding: 25px;

		font-size: 12px;

		background-color: $color_background;
		border-radius: $border-radius;
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .02), 0 20px 30px 0 rgba(0, 0, 0, .04);

		.field {
			margin-bottom: 15px;

			&__header {
				margin-bottom: 5px;

				text-align: left;
				color: $color_header;
				font-size: 10px;
			}

			&__body {
				input, textarea {
					width: 100%;

					margin-bottom: 5px;
					padding: 10px 15px;

					background-color: $color_background;
					border-radius: $border-radius;
					box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .10);

					color: $color_input;
					transition: box-shadow .3s;

					&::placeholder {
						color: $color_input-placeholder;
					}

					&:focus {
						box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .10);
					}
				}

				textarea {
					min-height: 100px;
					resize: none;
				}
			}

			.required {
				position: relative;

				&::after {
					content: "";

					position: relative;
					top: -5px;
					left: -2px;
					display: inline-block;

					width: 4px;
					height: 4px;

					margin-left: 5px;

					background-color: #FF8484;

					border-radius: 50%;
				}
			}
		}

		.action {
			&__button {
				width: 100%;

				padding: 10px 0;

				border-radius: $border-radius__button;

				font-size: 12px;
				font-weight: 600;

				transition: background-color .3s;
			}

			.disabled__btn {
				color: #B4B4B4;
				background-color: #EEEEEE;
			}

			.active__btn {
				color: #FFFFFF;
				background-color: #7BAE73;

				&:hover {
					background-color: #6d9f65;
				}
			}

			.succeed-adding {
				animation-name: addProduct;
				animation-duration: .3s;

				animation-iteration-count: 1;
				animation-fill-mode: both;
				animation-play-state: running;

				@keyframes addProduct {
					from {
						box-shadow: 0 0 0px 0px #7bae73;
					}

					to {
						box-shadow: 0 0 20px -5px #7bae73;
					}
				}
			}
		}
	}

</style>