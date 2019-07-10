<template>
	<div class="key-list__group">
		<template v-if="typeof keys == 'object'">
			<li v-for="(keys1, idx1) in Object.keys(keys)" :key="idx1" class="key-list__item">
				<span class="key" :class="[createLevel(keys1) == KEY ? 'is-active' : '']" @click="SET_KEY(keys1)">
					{{ keys1 }}
				</span>
				<ul v-if="typeof keys[keys1] == 'object'" class="key-list__list">
					<li v-for="(keys2, idx2) in Object.keys(keys[keys1])" :key="idx2" class="key-list__item">
						<i18nPanelsList :keys="keys2" :level="createLevel(keys1)"></i18nPanelsList>
					</li>
				</ul>
			</li>
		</template>
		<span v-else :class="[createLevel(keys) == KEY ? 'is-active' : '']" class="key" @click="SET_KEY(keys)">
			{{ keys }}
			<checkLanguages :path="createLevel(keys)"></checkLanguages>
		</span>
	</div>
</template>

<script>
export default {
	components: {
		i18nPanelsList: () => import('~/components/elements/i18n-panels-list.vue'),
		checkLanguages: () => import('~/components/elements/check-languages.vue')
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
		KEY() {
			return this.$store.getters['project/KEY'];
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
		SET_KEY(key) {
			const _this = this;
			this.$store.dispatch('project/SET_KEY', _this.createLevel(key));
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
