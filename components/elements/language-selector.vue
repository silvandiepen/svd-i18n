<template>
	<ul class="language-selector">
		<li v-for="lang in $i18n.locales" :key="lang.code" class="language-selector__item">
			<nuxt-link class="language-selector__link label" :to="`/${lang.code}`">
				<span class="language-selector__text">{{ lang.code }}</span>
			</nuxt-link>
		</li>
	</ul>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '~tools';

.language-selector {
	width: 100%;
	text-align: center;
	&__link {
		display: block;
		text-transform: uppercase;
		text-decoration: none;
	}
	&__text {
		color: white;
	}
}
</style>
