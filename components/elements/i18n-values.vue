<template>
	<ul class="i18n-data__list">
		<li v-for="(value, key, idx) in data" :key="idx" class="i18n-data__item">
			<div v-if="typeof value == 'object'">
				<h5 v-if="child" class="i18n-data__key">
					{{ key }}
				</h5>
				<h6 v-else class="i18n-data__key i18n-data__key--child">
					{{ key }}
				</h6>
				<I18nValues :data="value" />
			</div>
			<div v-else-if="typeof value == 'string'">
				<I18nValue :data="[key, value]" :child="true" />
			</div>
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
	}
};
</script>

<style lang="scss">
@import '~tools';

.i18n-data {
	flex-shrink: 0;
	&__list {
		width: 100%;
	}
	&__key {
		background-color: color(IceLight);
		padding: 1rem;
		& + ul {
			margin: 0;
		}
	}
	&__item {
		display: block;
		width: 100%;
		min-width: 320px;
		border-left: 1px solid color(IceLight);
		border-bottom: 1px solid color(IceLight);
		padding-left: grid(0.5);
		&:last-child {
			border-bottom: 0;
		}

		dl {
			width: 100%;
			display: flex;
			dd,
			dt {
				width: 50%;
				padding: 1rem;
				font-size: 1rem;
			}
		}
	}
}
</style>
