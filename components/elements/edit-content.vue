<template>
	<div class="input-field">
		<template v-if="typeof getValue !== 'object'">
			<label>{{ language }}</label>
			<TextareaAutosize
				v-model="getValue"
				:class="[getValue.length > 100 ? 'large' : 'small']"
				@change="CHANGE"
			></TextareaAutosize>
			<span class="chars">{{ getValue.length }}</span>
		</template>
		<template v-else>
			<div v-for="(value, key, idx) in getValue" :key="idx">
				<span>{{ CURRENT_KEY }}</span>
				<span>{{ key }}</span>
			</div>
			<!-- <EditContent
				v-for="(value, key, idx) in getValue"
				:key="idx"
				:path="`${currentKey}.${key}`"
				:language="lang"
			></EditContent> -->
		</template>
	</div>
</template>

<script>
export default {
	components: {
		TextareaAutosize: () => import('~/components/elements/textarea-autosize.vue')
		// EditContent: () => import('~/components/elements/edit-content.vue')
	},
	props: {
		language: {
			type: String,
			default: ''
		},
		path: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			changed: false
		};
	},
	computed: {
		CURRENT_KEY() {
			return this.$store.state.project.key;
		},
		CHANGES() {
			return this.$store.state.project.changes;
		},

		getValue: {
			get() {
				// return this.$store.getters['project/KEY_VALUE']([this.$props.language, this.$props.path]);
				return this.$store.getters['project/KEY_VALUE']([this.$props.language]);
			},
			set(value) {
				// this.$store.dispatch('project/SET_VALUE', [this.$props.language, value, this.$props.path]);
				this.$store.dispatch('project/SET_VALUE', [this.$props.language, value]);
			}
		}
	},
	watch: {
		CHANGES: function() {
			if (this.CHANGES == 0) {
				this.changed = false;
			}
		}
	},
	methods: {
		CHANGE() {
			if (!this.changed) {
				console.log('çhanged', this.getValue);
				this.changed = true;
				this.$store.dispatch('project/CHANGED');
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
		padding: 0.75rem;
		line-height: 1.5;
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
