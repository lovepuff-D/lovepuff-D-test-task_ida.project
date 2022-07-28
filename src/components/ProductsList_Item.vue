<script>
    export default {
        name: 'ProductsList_Item',
        components: {},
        data() {
            return {
                isStandardPicture: false,
            }
        },
        props: {
            item: {
                type: Object,
                required: true,
            }
        },
        methods: {
            deleteItem(id) {
                this.$store.commit('DELETE_PRODUCT', id)
            },
            errorHandlerOfImg(event) {
                this.isStandardPicture = true
            }
        },
        computed: {},
    }
</script>

<template>
	<div class="item">
		<div
				@click="deleteItem(item.id)"
				class="delete-icon"
		>

		</div>
		<div class="item__header">
			<img
					v-if="!isStandardPicture"
					@error="errorHandlerOfImg($event)"
					:src="item.url" alt="Picture of product"
			>
			<img
					v-if="isStandardPicture"
					@error="errorHandlerOfImg($event)"
					src="~@/assets/img/plug-img.png" alt="Picture of product"
			>
		</div>
		<div class="item__body body">
			<div class="body__name">
				{{item.name}}
			</div>
			<div class="body__description">
				{{item.description}}
			</div>
			<div class="body__cost">
				{{item.cost}} руб.
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	$border-radius: 4px;

	$font-weight-600: 600;

	.item {
		position: relative;

		width: 32%;
		min-height: 380px;

		margin-bottom: 15px;

		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .02), 0 20px 30px 0 rgba(0, 0, 0, .04);
		border-radius: $border-radius;
		background-color: #FFFEFB;

		cursor: pointer;
		text-align: left;


		transition: box-shadow .3s;

		&:not(:nth-child(3n)) {
			margin-right: 1.9%;
		}

		&:hover {
			box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .1), 0 20px 30px 0 rgba(0, 0, 0, .1);

			.delete-icon {
				opacity: 1;
			}
		}

		&__header {
			img {
				width: 100%;
				border-radius: $border-radius $border-radius 0 0;
			}
		}

		.body {
			padding: 15px 15px 25px;

			color: #3F3F3F;
			word-wrap: break-word;

			&__name {
				margin-bottom: 15px;

				font-size: 20px;
				font-weight: $font-weight-600;
			}

			&__description {
				margin-bottom: 30px;

				font-size: 16px;

				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				line-height: 1.3em;
			}

			&__cost {
				font-size: 24px;
				font-weight: $font-weight-600;
			}
		}

		.delete-icon {
			cursor: pointer;

			position: absolute;
			top: -8px;
			right: -8px;

			display: block;

			opacity: 0;

			width: 32px;
			height: 32px;

			background: url("~@/assets/img/icon-delete.png") center center no-repeat #FF8484;
			transition: background-color .3s, opacity .3s;

			border-radius: 10px;

			&:hover {
				background-color: #e76464;
			}

			@media screen and (max-width: 992px) {
				opacity: 1;
			}
		}

		@media screen and (max-width: 1480px) {
			max-width: none;
			width: 48%;
			&:not(:nth-child(3n)) {
				margin-right: 0;
			}
			&:not(:nth-child(2n)) {
				margin-right: 4%;
			}
		}

		@media screen and (max-width: 768px) {
			max-width: 568px;
			width: 100%;

			&:not(:nth-child(2n)) {
				margin-right: 0;
			}
		}
	}

</style>