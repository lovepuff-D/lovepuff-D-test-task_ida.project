<script>
    import ProductsList_Item from "@/components/ProductsList_Item";

    import {mapState, mapGetters} from 'vuex';

    export default {
        name: 'ProductsList',
        components: {
            ProductsList_Item
        },
        data() {
            return {
                isShowEmptyTitle: false,
                isShowPreloader: true,
            }
        },
        computed: {
            ...mapState(['listOfProducts']),
        },
        mounted() {
            //Искусственная задержка для демонстрации прелоадера
            setTimeout(() => {
                if (localStorage.getItem('listOfProduct')) {
                    this.$store.commit('SET_PRODUCT', localStorage.getItem('listOfProduct'))
                }
            }, 1000)
            if (!localStorage.getItem('listOfProduct')) {
                this.isShowPreloader = false
                if (this.listOfProducts.length === 0) {
                    this.isShowEmptyTitle = true
                }
            }
            //Перед закрытием вкладки или обновлении записываем список товаров в local storage
            window.addEventListener('beforeunload', () => {
                localStorage.setItem('listOfProduct', JSON.stringify(this.listOfProducts))
            })
        },
        watch: {
            '$store.state.listOfProducts': {
                handler(newValue) {
                    //console.log(newValue, 'watcher')
                    if (newValue.length > 0) {
                        this.isShowPreloader = false
                        this.isShowEmptyTitle = false
                    }
                    if (newValue.length === 0) {
                        this.isShowPreloader = false
                        this.isShowEmptyTitle = true
                    }
                },
                deep: true
            }
        },
    }
</script>

<template>
	<div class="product-list">
		<TransitionGroup name="list">
			<template
					v-for="item in listOfProducts"
					:key="item.id"
			>
				<ProductsList_Item :item="item"/>
			</template>
			<div
					class="product-list__empty"
					v-if="isShowEmptyTitle"
			>
				Добавьте свой первый товар
			</div>
		</TransitionGroup>
		<div class="lds-ring" v-if="isShowPreloader">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<style scoped lang="scss">

	.product-list {
		position: relative;

		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: stretch;

		width: 100%;

		@media screen and (max-width: 768px) {
			justify-content: center;
		}
	}

	.product-list__empty {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		font-size: 28px;
		font-weight: 600;
	}

	/*Анимация для transitiongroup*/
	.list-move,
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: scale(0);
	}

	.list-leave-active {
		position: absolute;
	}

	/*-------------------*/

	.lds-ring {
		display: inline-block;
		position: absolute;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 80px;
		height: 80px;
	}

	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid #7BAE73;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #7BAE73 transparent transparent transparent;
	}

	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}

	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}

	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

</style>