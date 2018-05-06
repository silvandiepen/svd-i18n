<template lang="pug">
div
	header
		row(center)
			column(small="1", medium="2:3")
				h3.logo i18n
	main.bg-white
		<nuxt></nuxt>
	svd-footer
</template>
<style lang="scss">
@import "~svd-style/ext";
header {
  padding: grid(1);
}
</style>
<script>
import svdFooter from "svd-footer/src/components/svd-footer.vue";

export default {
  components: { svdFooter }
};
</script>
