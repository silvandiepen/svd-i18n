<template>
	<div class="edit-keys">
		<h4>{{ KEY }}</h4>
		<ul class="keys__list">
			<li v-for="(lang, idx) in CURRENT_LANGUAGES" :key="idx" class="keys__item">
				<EditContent :language="lang"></EditContent>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	components: {
		EditContent: () => import('~/components/elements/edit-content.vue')
	},
	computed: {
		CURRENT_LANGUAGES() {
			return this.$store.getters['project/CURRENT_LANGUAGES'];
		},
		KEY() {
			return this.$store.getters['project/KEY'];
		}
	}
};
</script>

<style></style>
