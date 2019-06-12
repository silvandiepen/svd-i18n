<template>
	<span class="label label--language" :class="`label--${lang}`">{{ lang }}</span>
</template>

<script>
export default {
	props: {
		lang: {
			type: String,
			default: null
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.label {
	&--language {
		background-color: color(IceDark);
		color: color(White);

		& + & {
			margin-left: 0.5rem;
		}
	}
}
</style>
