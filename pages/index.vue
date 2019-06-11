<template>
	<main class="page page--home">
		<section v-if="showUpload" class="upload__section" :class="[currentFileset ? '' : 'upload__section--active']">
			<div class="row center">
				<div class="column small-full medium-half">
					<div v-if="!currentSetName" class="row">
						<div class="column small-full">
							<fieldset>
								<label>New fileset</label>
								<input v-model="fileset" type="text" />
								<button class="button" @click="saveFileset()">
									<span class="button__text">Save fileset</span>
									<span class="button__icon icon-upload"></span>
								</button>
							</fieldset>
						</div>
					</div>
					<div v-if="currentSetName" class="row">
						<div class="column small-full">
							<h3>{{ currentSetName }}</h3>
							<p v-if="files.length < 1">
								Add files to your fileset
							</p>

							<button v-if="files.length < 1" class="upload__add-button button" @click="addFiles()">
								<span class="button__icon icon-add"></span>
							</button>
						</div>
						<div class="column small-full hide-upload">
							<label>Files</label>
							<input id="files" ref="files" accept=".json" type="file" multiple @change="handleFilesUpload()" />
						</div>
						<div class="column small-full">
							<ul class="upload__list">
								<li v-for="(file, index) in files" :key="index" class="upload__item">
									<span class="upload__file">{{ file.name }} </span>
									<div class="upload__actions" @click="removeFile(key)">
										<span class="icon icon-remove"></span>
									</div>
								</li>
							</ul>
							<div v-if="files.length > 0" class="column small-full upload__buttons">
								<button class="upload__add-button button" @click="addFiles()">
									<span class="button__icon icon-add"></span>
								</button>
								<button class="upload__upload-button button" @click="submitFiles()">
									<span class="button__text">upload</span>
									<span class="button__icon icon-upload"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section v-if="currentFileset" class="files">
			<div class="row center">
				<div class="column small-full">
					<ul class="files__list">
						<li v-for="(file, index) in currentFileset.data" :key="index" class="files__file">
							<div class="i18n-data">
								<h6 class="i18n-data__key">
									{{ file.filename }}
								</h6>
								<i18nValues :data="file.data"></i18nValues>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	components: {
		i18nValues: () => import('~/components/elements/i18n-values.vue')
	},
	/*
      Defines the data used by the component
    */
	data() {
		return {
			files: [],
			fileset: null
		};
	},
	computed: {
		showUpload: {
			get() {
				return this.$store.state.ui.showUpload;
			},
			set(value) {
				this.$store.dispatch('ui/showUpload', value);
			}
		},
		currentFileset: {
			get() {
				return this.$store.getters['files/getCurrentSet'];
			}
		},
		currentSetName: {
			get() {
				return this.$store.getters['files/getCurrentName'];
			}
		}
	},
	/*
      Defines the method used by the component
    */
	methods: {
		/*
        Adds a file
      */
		addFiles() {
			this.$refs.files.click();
		},
		saveFileset() {
			this.$store.dispatch('files/createFileset', this.fileset);
		},
		submitFiles() {
			const _this = this;
			// var files = evt.target.files; // FileList object

			// files is a FileList of File objects. List some properties.
			for (let i = 0, f; (f = this.files[i]); i++) {
				const reader = new FileReader();
				reader.readAsText(f);
				reader.addEventListener('loadend', (e) => {
					_this.$store.dispatch('files/setFiles', { filename: f.name, data: JSON.parse(e.target.result) });
					_this.showUpload = false;
				});
			}
		},

		/*
        Handles the uploading of files
      */
		handleFilesUpload() {
			let uploadedFiles = this.$refs.files.files;

			/*
          Adds the uploaded file to the files array
        */
			for (var i = 0; i < uploadedFiles.length; i++) {
				this.files.push(uploadedFiles[i]);
			}
		},

		/*
        Removes a select file the user has uploaded
      */
		removeFile(key) {
			this.files.splice(key, 1);
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
@import '~silicons';

@include silicon-math-times('.icon-remove');
@include silicon-math-plus('.icon-add');
@include silicon-arrow-basic-right('.icon-upload');

.page {
	// general page styles
	&--home {
		// specific home styles
	}
}
.hide-upload {
	opacity: 0;
	height: 0;
}

fieldset {
	padding: 2rem;
	background-color: color(IceLight, 0.5);
	border: 1px solid color(IceLight);
	border-radius: $base-border-radius;
	input[type='text'] {
		border: 1px solid color(Ice);
		padding: 1rem;
		font-size: 1rem;
		border-radius: $base-border-radius;
	}
	.button {
		display: inline-flex;
	}
}

.files {
	&__file {
		width: 100%;
	}
	&__list {
		display: flex;
		flex-wrap: nowrap;
		overflow: scroll;
	}
}

.upload {
	&__file {
	}
	&__section {
		padding: grid(1) 0;
		max-height: grid(8);
		overflow: scroll;
		transition: all $base-transition ease-in-out;
		border-bottom: 1px solid color(IceLight);
		&--active {
			max-height: 100vh;
			padding: grid(4) 0;
		}
	}
	&__list {
		width: 100%;
	}
	&__actions {
		position: absolute;
		right: 0;
		top: 0;
		padding: 1rem;
	}
	&__item {
		position: relative;
		background-color: color(IceLight, 0.5);
		border: 1px solid color(IceLight);
		border-radius: $base-border-radius;
		& + & {
			margin-top: 0.25rem;
		}
		display: block;
		padding: 1rem;
		.icon-remove {
			font-size: 12px;
		}
	}
	&__buttons {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 1rem 0;
	}
	&__upload-button,
	&__add-button {
	}
}

.button {
	padding: 0.25rem 0.75rem;
	display: flex;
	border: none;
	min-width: 2rem;
	text-align: center;
	justify-content: center;
	align-items: center;
	background-color: color(Purple);
	color: color(White);
	border-radius: $base-border-radius;
	&:focus {
		background-color: color(PurpleLight);
		outline: none;
	}
	&:hover {
		background-color: color(PurpleDark);
	}
	&__icon {
		line-height: 2rem;
		--stroke: 0.15em;
		font-size: 14px;
	}
	&__text {
		display: inline-block;
		line-height: 2rem;
		& + .button__icon {
			margin-left: 0.5rem;
		}
	}
	&__icon {
		& + .button__text {
			margin-left: 0.5rem;
		}
	}
}
</style>
