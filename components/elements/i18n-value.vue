<template>
	<div class="i18n-data__values" :class="[highlightPath == path ? 'is-highlighted' : '']">
		<input class="i18n-data__label" type="text" :value="data[0]" @change="changingKey" />
		<input
			v-if="data[1].length < 100"
			class="i18n-data__value"
			type="text"
			:value="data[1]"
			:tabindex="counter"
			@focus="highlightValue"
		/>
		<textarea
			v-if="data[1].length > 99"
			class="i18n-data__value"
			type="text"
			:value="data[1]"
			resize="false"
			:tabindex="counter"
			@focus="highlightValue"
		/>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: [Array, Object],
			default: () => []
		},
		path: {
			type: String,
			default: ''
		},
		counter: {
			type: Number,
			default: 0
		}
	},
	computed: {
		highlightPath() {
			return this.$store.state.ui.highlight;
		}
	},
	methods: {
		highlightValue() {
			this.$store.dispatch('ui/setHighlight', this.$props.path);
		},
		changingKey(e) {
			console.log(e.target.value, this.path);
			this.$store.dispatch('files/setKey', { value: e.target.value, path: this.path });
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
			background-color: transparent;
			border: none;
			padding: 0.5rem;
			width: 100%; 
			&:focus {
				outline: none;
			}
		}
		textarea {
			height: grid(3);
		}
		&.is-highlighted {
			background-color: color(Skyblue, 0.25);
		}
	}
	&__label {
		width: 30%;
		font-family: courier;
	}
	&__value {
		width: 70%;
	}
}
</style>
