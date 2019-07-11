<template>
	<div class="input-field">
		<label>{{ language }}</label>
		<textarea v-model="getValue" :class="[getValue.length > 100 ? 'large' : 'small']"> </textarea>
		<span class="chars">{{ getValue.length }}</span>
	</div>
</template>

<script>
export default {
	props: {
		language: {
			type: String,
			default: ''
		}
	},
	computed: {
		getValue: {
			get() {
				return this.$store.getters['project/KEY_VALUE'](this.$props.language);
			},
			set(value) {
				this.$store.dispatch('project/SET_VALUE', [this.$props.language, value]);
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.input-field {
	display: flex;
	position: relative;
	label {
		width: 2rem;
	}
	& + .input-field {
		margin-top: 1rem;
	}
	textarea {
		resize: vertical;
		&.small {
			height: auto;
		}
		&.large {
			height: 8rem;
		}
	}
	.chars {
		position: absolute;
		right: 0.25rem;
		bottom: 0.25rem;
		padding: 0.25rem;
		font-size: 10px;
		pointer-events: none;
		border: 1px solid color(Black, 0.1);
	}
}
</style>
