<template>
	<ul class="language-selector">
		<li v-for="lang in $i18n.locales" :key="lang.code" class="language-selector__item">
			<nuxt-link class="language-selector__link label" :to="`/${lang.code}`">
				{{ lang.code }}
			</nuxt-link>
		</li>
	</ul>
</template>

<script>
export default {};
</script>

<style></style>
