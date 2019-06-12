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
		border-radius: $base-border-radius;
		padding: 0.25rem;
		font-size: 12px;
		text-transform: uppercase;
		font-weight: 500;
		& + & {
			margin-left: 0.5rem;
		}
	}
}
</style>
