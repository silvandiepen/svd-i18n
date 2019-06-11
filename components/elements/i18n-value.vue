<template>
	<div class="i18n-data__values">
		<input class="i18n-data__label" type="text" :value="data[0]" />
		<input v-if="data[1].length < 100" class="i18n-data__value" type="text" :value="data[1]" />
		<textarea v-if="data[1].length > 99" class="i18n-data__value" type="text" :value="data[1]" />
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: [Array, Object],
			default: () => []
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.i18n-data__values {
}
.i18n-data {
	&__values {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		input,
		textarea {
			border: none;
			padding: 0.5rem;
		}
		textarea {
			height: grid(3);
		}
	}
	&__label {
		width: 30%;
	}
	&__value {
		width: 70%;
	}
}
</style>
