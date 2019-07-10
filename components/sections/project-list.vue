<template>
	<div class="project-list">
		<div class="project-list__block">
			<div class="row center">
				<div class="column small-full medium-two-third large-full">
					<h4>{{ $t('title.yourprojects') }}</h4>
					<ul class="project-list__list">
						<li
							v-for="(project, index) in PROJECTS"
							:key="index"
							class="project-list__item"
							:class="[ACTIVE_PROJECT == project.id ? 'project-list__item--current' : '']"
							@click="LOAD_PROJECT(project.id)"
						>
							<div class="project-list__content">
								<h5>{{ project.name }}</h5>
								<button class="button button--nude button--remove" @click="DELETE_PROJECT(project.name)">
									<span class="icon button__icon icon-remove"></span>
								</button>
							</div>
							<div class="project-list__languages">
								<LanguageLabel v-for="(lang, key) in project.languages" :key="key" :lang="lang"></LanguageLabel>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		LanguageLabel: () => import('~/components/elements/language-label.vue')
	},
	computed: {
		PROJECTS() {
			return this.$store.getters['project/PROJECTS'];
		},
		ACTIVE_PROJECT() {
			return this.$store.getters['project/ACTIVE_PROJECT'];
		}
	},

	methods: {
		LOAD_PROJECT(project) {
			this.$store.dispatch('project/LOAD_PROJECT', project);
		},
		DELETE_PROJECT(project) {
			this.$store.dispatch('project/DELETE', project);
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.project-list {
	padding: grid(2 0);
	background-color: color(IceLight);
	@media #{$small-only} {
		padding: $mobile-padding;
	}
	&__section {
		@media #{$large-up} {
			display: none;
		}
	}
	&__list {
		display: flex;
		flex-direction: column;
	}
	&__item {
		position: relative;
		background-color: lighten(IceLight, 5%);
		border-radius: $base-border-radius * 2;
		& + & {
			margin-top: 1rem;
		}
		&--current {
			background-color: color(White);
			box-shadow: 0 0.15rem 0 0 color(Black, 0.15);
		}
		.button--remove {
			position: absolute;
			right: 0;
			top: 0;
		}
	}
	&__content {
		padding: 1rem;
	}
	&__languages {
		border-top: 1px solid color(IceLight);
		padding: 1rem;
	}
}
</style>
