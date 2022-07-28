<template>
	<router-view/>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');

	@import './assets/stylesheets/Reset_Stylesheet';

	#app {
		font-family: 'Source Sans Pro', sans-serif, Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;

		background-color: rgba(255, 254, 251, .8);

		height: 100vh;
		padding: 32px;

		@media screen and (max-width: 1000px) {
			padding: 15px;
		}
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	button, input, textarea, select, option {
		font-family: 'Source Sans Pro', sans-serif, Avenir, Helvetica, Arial, sans-serif;
	}

	nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
