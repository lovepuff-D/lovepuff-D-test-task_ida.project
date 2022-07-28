<script>
    export default {
        name: 'AddProduct_Field-is-not-filled',
        components: {},
        props: {
            condition: {
                required: true,
            }
        },
        data() {
            return {}
        },
        computed: {},

    }
</script>

<template>
	<transition name="fade">
		<div
				v-if="!condition"
				class="field-is-not-filled"
		>
			Поле является обязательным
		</div>
	</transition>
</template>

<style scoped lang="scss">
	.field-is-not-filled {
		height: 10px;

		color: #FF8484;
		font-size: 8px;
		text-align: left;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		height: 0;
		opacity: 0;
	}
</style>