<template>
	<div class="input-field">
		<label>{{ language }}</label>
		<textarea v-model="value"> </textarea>
	</div>
</template>

<script>
export default {
	props: {
		content: {
			type: String,
			default: ''
		},
		language: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			value: this.$props.content
		};
	}
};
</script>

<style lang="scss">
@import '~tools';
.input-field {
	display: flex;
	label {
		width: 2rem;
	}
	& + .input-field {
		margin-top: 1rem;
	}
}
</style>
