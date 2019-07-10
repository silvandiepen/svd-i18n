<template>
	<div class="panels">
		<div class="panels__panel">
			<ul v-if="PROJECT_KEYS" class="key-list__list">
				<i18nPanelsList :keys="PROJECT_KEYS"></i18nPanelsList>
			</ul>
		</div>
		<div class="panels__panel">
			<div class="content">
				<h4>{{ KEY }}</h4>
				<ul class="keys__list">
					<!-- <li v-for="(lang, idx) in CURRENT_LANGUAGES" :key="idx" class="keys__item"> -->
					<!-- <EditContent :language="lang" :content="currentValues[lang]"></!-->
					<!-- </li> -->
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		i18nPanelsList: () => import('~/components/elements/i18n-panels-list.vue')
	},
	computed: {
		PROJECT: {
			get() {
				return this.$store.getters['project/PROJECT'];
			}
		},
		PROJECT_KEYS() {
			return this.$store.getters['project/PROJECT_KEYS'];
		},
		CURRENT_LANGUAGES() {
			return this.$store.getters['project/CURRENT_LANGUAGES'];
		},
		KEY() {
			return this.$store.getters['project/KEY'];
		}
	},
	mounted() {
		// console.log(this.$route);
	},
	methods: {
		extend(obj, src) {
			Object.keys(src).forEach(function(key) {
				obj[key] = src[key];
			});
			return obj;
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.content {
	padding: $mobile-padding;
}
.panels {
	width: 100%;
	display: flex;
	&__panel {
		width: 50%;
		border-left: 2px solid color(Blue, 0.25);

		&:nth-child(1) {
			border-left: 0;
			background-image: linear-gradient(to left, color(Black, 0.05), color(Black, 0));
			background-size: grid(2) 100%;
			background-repeat: repeat-y;
			background-position: right top;
		}
	}
	.keys {
		&__list {
			display: flex;
			flex-direction: column;
		}
		&__item {
			& + .keys__item {
				margin-top: 1rem;
			}
		}
	}

	.key-list {
		&__group,
		&__list {
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		&__item {
			width: 100%;
			padding-left: 1rem;
			display: flex;
			border-top: 1px solid color(Black, 0.2);
			flex-direction: column;
			background-image: linear-gradient(
					to bottom,
					color(Black, 0) calc(100% - 1px),
					color(Black, 0.2) calc(100% - 1px),
					color(Black, 0.2) 100%
				),
				linear-gradient(
					to left,
					color(Black, 0) calc(100% - 1px),
					color(Black, 0.2) calc(100% - 1px),
					color(Black, 0.2) 100%
				);
			background-size: 0.5rem 1.25rem;
			background-repeat: no-repeat;
			background-position: 1rem 0rem;
			span.key {
				padding: 0.5rem 1rem;
				display: block;
			}
		}
	}
}
</style>
