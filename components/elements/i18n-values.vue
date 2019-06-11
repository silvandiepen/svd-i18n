<template>
	<ul class="i18n-data__list">
		<li
			v-for="(value, key, idx) in data"
			:key="idx"
			class="i18n-data__item"
			:class="[isGroup(value) ? 'i18n-data__item--group' : 'i18n-data__item--single']"
		>
			<template v-if="isGroup(value)">
				<h6 class="i18n-data__key">
					{{ key }}
				</h6>
				<I18nValues :data="value" />
			</template>
			<template v-else>
				<I18nValue :data="[key, value]" :child="true" />
			</template>
		</li>
	</ul>
</template>

<script>
import I18nValue from '~/components/elements/i18n-value.vue';
import I18nValues from '~/components/elements/i18n-values.vue';
export default {
	name: 'I18nValues',
	components: {
		I18nValues,
		I18nValue
	},
	props: {
		data: {
			type: [Array, Object],
			default: () => []
		},
		child: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		isGroup(value) {
			if (typeof value == 'object') {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.i18n-data {
	flex-shrink: 0;
	&__list {
		width: 100%;
		position: relative;
		display: block;
	}
	&__key {
		padding: 1rem;
		// padding-left: 0;
		display: block;
		& + ul {
			margin: 0;
		}
	}
	&__item {
		position: relative;
		display: block;
		width: 100%;
		min-width: 320px;
		padding-left: 1rem;
		&:last-child {
			border-bottom: 0;
		}
		&::before {
			content: '';
			width: 1rem;
			height: 1rem;
			background-image: linear-gradient(to left, color(Skyblue), color(Skyblue)),
				linear-gradient(to bottom, color(Skyblue), color(Skyblue));
			background-size: 100% 1px, 1px 100%;
			background-position: bottom left, bottom left;
			background-repeat: no-repeat, no-repeat;
			position: absolute;
			left: 0;
		}
		&--single {
			&::before {
				// top: 0rem;
				top: -1rem;
				height: 100%;
			}
		}
		&--group {
			&::before {
				background-image: linear-gradient(to left, color(Purple, 1), color(Purple, 1)),
					linear-gradient(to bottom, color(Purple, 0), color(Purple, 1));
				width: 0.5rem;
				height: calc(100% - 2rem);
				bottom: calc(100% - 1.75rem);
			}
		}

		dl {
			width: 100%;
			display: flex;
			dd,
			dt {
				width: 50%;
				padding: 0.75rem;
				font-size: 0.75rem;
			}
		}
	}
}
</style>
