<script>
    import AddProduct from "@/components/AddProduct";
    import ProductsList from "@/components/ProductsList";
    import SortField from "@/components/ProductsList_SortField";

    export default {
        components: {
            AddProduct,
            ProductsList,
            SortField
        },
        data() {
            return {}
        },
        computed: {},
        mounted() {
        }
    }
</script>

<template>
	<div class="container">
		<div class="body">
			<div class="col body__left">
				<div class="addProduct__title title">Добавление товара</div>
				<div class="add-product__wrapper">
					<AddProduct/>
				</div>
			</div>

			<div class="col body__right">
				<SortField/>
				<div class="products-list__wrapper">
					<ProductsList/>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped lang="scss">

	.container {
		max-width: 1440px;
		margin: 0 auto;
	}

	.col {
		display: flex;
		flex-wrap: wrap;

		width: 100%;
		margin-bottom: 15px;

		& > *:first-child {
			margin-bottom: 15px;
		}
	}

	.body {
		display: flex;
		flex-wrap: wrap;

		&__left {
			flex: 0 0 320px;
			flex-direction: column;

			@media screen and (max-width: 1000px) {
				align-items: center;
				flex: 0 0 100%;

				.addProduct {
					width: 100%;
				}
			}
		}

		&__right {
			flex: 1 0 0;
			flex-direction: column;
			align-items: flex-end;
		}

		.title {
			color: #3F3F3F;
			font-size: 28px;
			font-weight: 600;
			text-align: left;
		}

		.add-product__wrapper {
			flex: 0 0 320px;
			margin-right: 30px;

			@media screen and (max-width: 1000px) {
				margin-right: 0;
				width: 100%;
			}
		}

		.products-list__wrapper {
			display: flex;

			width: 100%;

			flex: 1 0 0;
		}
	}
</style>