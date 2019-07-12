<template>
	<section class="show-project">
		<div class="row center">
			<div v-if="renderComponent && PROJECT" class="column small-full">
				<div class="panels">
					<div class="panels__panel">
						<header class="panels__header">
							<h4 @click="unsetKey">
								{{ PROJECT_NAME }}
							</h4>
							<button class="button button--purple button--icon" @click="refresh">
								&#x21bb;
							</button>
						</header>
						<ul v-if="PROJECT_KEYS" class="key-list__list key-list__list--parent">
							<ProjectListKeys :keys="PROJECT_KEYS"></ProjectListKeys>
						</ul>
					</div>
					<div class="panels__panel">
						<div class="content">
							<ProjectDetail v-if="!KEY"></ProjectDetail>
							<EditKeys v-if="KEY" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	components: {
		EditKeys: () => import('~/components/elements/edit-keys.vue'),
		ProjectListKeys: () => import('~/components/project/project-list-keys.vue'),
		ProjectDetail: () => import('~/components/project/project-detail.vue')
	},
	data() {
		return {
			renderComponent: true
		};
	},
	computed: {
		PROJECT: {
			get() {
				return this.$store.getters['project/PROJECT'];
			}
		},
		UPDATE() {
			return this.$store.state.project.update;
		},

		PROJECT_KEYS() {
			return this.$store.getters['project/PROJECT_KEYS'];
		},
		PROJECT_NAME() {
			return this.$store.getters['project/PROJECT_NAME'];
		},
		KEY() {
			return this.$store.getters['project/KEY'];
		}
	},
	watch: {
		UPDATE: function() {
			this.forceRerender();
		}
	},
	methods: {
		forceRerender() {
			// Remove my-component from the DOM
			this.renderComponent = false;
			this.$nextTick(() => {
				// Add the component back in
				this.renderComponent = true;
			});
		},
		unsetKey() {
			this.$store.dispatch('project/UNSET_KEY');
		},
		refresh() {
			this.$store.dispatch('project/REFRESH');
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.show-project {
	border-bottom: 1px solid color(Black, 0.1);
	background-color: color(White);
}
.panels {
	width: 100%;
	display: flex;
	&__header {
		display: flex;
		justify-content: space-between;
		background-color: color(Dark);
		padding: 1rem;
		color: color(White);
	}
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
			&--parent {
				max-height: 100vh;
				overflow: scroll;
			}
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
