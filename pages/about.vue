<template>
	<section class="content-section">
		<div class="row center">
			<div class="column small-full medium-two-third">
				<h3>{{ $t('about.title') }}</h3>
				<div>{{ $t('about.text') }}</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '~tools';

.content-section {
	padding: grid(3 0);
	background-color: color(White);
}
</style>
