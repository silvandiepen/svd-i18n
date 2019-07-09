<template>
	<ul class="language-checks">
		<li v-for="(lang, idx) in LANGUAGES" :key="idx" :class="['language-checks__item', checkStatus(lang) ? 'valid' : '']">
			{{ lang }}
			{{ checkStatus[lang] }}
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		path: {
			type: [Object, String],
			default: ''
		}
	},
	computed: {
		LANGUAGES() {
			return this.$store.getters['files/CURRENT_LANGUAGES'];
		},
		PROJECT() {
			return this.$store.getters['files/PROJECT'];
		}
	},
	methods: {
		checkStatus(lang) {
			let exists = false;
			if (this.$props.path.length > 0) {
				const projectData = this.PROJECT.data[lang].data;
				const currentArray = this.$props.path.split('.');

				switch (currentArray.length) {
					case 1:
						if (projectData[currentArray[0]] && projectData[currentArray[0]].length > 0) exists = true;
						break;
					case 2:
						if (projectData[currentArray[0]][currentArray[1]] && projectData[currentArray[0]][currentArray[1]].length > 0)
							exists = true;
						break;
					case 3:
						if (
							projectData[currentArray[0]][currentArray[1]][currentArray[2]] &&
							projectData[currentArray[0]][currentArray[1]][currentArray[2]].length > 0
						)
							exists = true;
						break;
					case 4:
						if (
							projectData[currentArray[0]][currentArray[1]][currentArray[2]][currentArray[4]] &&
							projectData[currentArray[0]][currentArray[1]][currentArray[2]][currentArray[4]].length > 0
						)
							exists = true;
						break;
				}
			}
			return exists;
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.language-checks {
	align-self: flex-end;
	&__item {
		color: color(Red);
		&.valid {
			color: color(Green);
			// 	opacity: 1;
		}
	}
}
</style>
