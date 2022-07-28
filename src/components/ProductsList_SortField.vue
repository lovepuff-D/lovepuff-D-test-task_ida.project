<script>
    export default {
        name: 'ProductsList_SortField',
        components: {},
        data() {
            return {
                value: 'Default'
            }
        },
        computed: {},
        watch: {
            'value': {
                handler(newValue, oldValue) {
                    this.$store.commit('SORT_PRODUCT', this.value)
                }
            },
            '$store.state.listOfProducts': {
                handler(newValue, oldValue) {
                    console.log('qe')
                    this.$store.commit('SORT_PRODUCT', this.value)
                },
                deep: true
            }
        }
    }
</script>

<template>
	<select class="sort-field" v-model="value">
		<option value="Default">По умолчанию</option>
		<option value="Name">По наименованию</option>
		<option value="Increase">По цене (Увеличение)</option>
		<option value="Decrease">По цене (Уменьшение)</option>
	</select>
</template>

<style scoped lang="scss">
	.sort-field {
		padding: 10px 16px;

		color: #B4B4B4;
		font-size: 12px;

		border: none;
		border-radius: 4px;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
		background-color: #FFFEFB;

		cursor: pointer;

		&:focus-visible {
			outline: none;
		}

		option {
			display: block;
		}
	}
</style>