<template>
	<div class="key-list__group">
		<template v-if="typeof keys == 'object'">
			<li v-for="(keys1, idx1) in Object.keys(keys)" :key="idx1" class="key-list__item">
				<span class="key" :class="[createLevel(keys1) == currentKey ? 'is-active' : '']" @click="setCurrentKey(keys1)">
					{{ keys1 }} {{ createLevel(keys1) }}
					<!-- <checkLanguages :path="currentKey"></checkLanguages> -->
				</span>
				<ul v-if="typeof keys[keys1] == 'object'" class="key-list__list">
					<li v-for="(keys2, idx2) in Object.keys(keys[keys1])" :key="idx2" class="key-list__item">
						<i18nPanelsList :keys="keys2" :level="createLevel(keys1)"></i18nPanelsList>
					</li>
				</ul>
			</li>
		</template>
		<span v-else :class="[createLevel(keys) == currentKey ? 'is-active' : '']" class="key" @click="setCurrentKey(keys)">
			{{ keys }} {{ createLevel(keys) }}
			<!-- <checkLanguages :path="currentKey"></checkLanguages> -->
		</span>
	</div>
</template>

<script>
export default {
	components: {
		i18nPanelsList: () => import('~/components/elements/i18n-panels-list.vue')
		// checkLanguages: () => import('~/components/elements/check-languages.vue')
	},
	props: {
		keys: {
			type: [Object, String],
			default: () => {}
		},
		level: {
			type: String,
			default: null
		}
	},
	computed: {
		currentKey() {
			return this.$store.state.files.currentKey;
		}
	},
	methods: {
		createLevel(key) {
			let levelKey;
			if (this.$props.level == null) {
				levelKey = key;
			} else {
				levelKey = this.$props.level + '.' + key;
			}

			return levelKey;
		},
		setCurrentKey(key) {
			const _this = this;
			this.$store.dispatch('files/SET_CURRENT_KEY', _this.createLevel(key));
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.key {
	&.is-active {
		color: color(Blue);
		font-weight: bold;
	}
}
</style>
