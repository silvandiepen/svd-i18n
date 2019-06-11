<template>
	<header id="header" class="header">
		<h3 class="header__logo">
			i18n
		</h3>
	</header>
</template>

<script>
import project from '~/package.json';
export default {
	data() {
		return {
			projectName: project.name
		};
	}
};
</script>

<style lang="scss">
@import '~tools';

.header {
	// Header styles
	// position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	background-color: color(IceLight);
	padding: grid(1);
	&__logo {
		background-color: color(Blue);
		display: inline-block;
		font-weight: bold;
		font-size: 1rem;
		padding: 0.75rem 1rem;
		border-radius: 4px;
		color: color(White);
		text-shadow: 1px 1px 0 color(BlueDark);
	}
}
</style>
