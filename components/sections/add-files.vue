<template>
	<section class="add-files">
		<div class="row center">
			<div class="column small-full medium-half">
				<div class="block">
					<h4>
						<span v-if="files.length < 1" class="sub">{{ $t('strings.addfilesto') }} </span>{{ currentProjectName }}
					</h4>
				</div>
				<div v-if="files.length < 1" class="block">
					<button class="upload__add-button button button--large" @keyup.enter="addFiles()" @click="addFiles()">
						<span class="button__icon icon-add"></span>
					</button>
				</div>

				<div class="block">
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
						<button class="upload__upload-button button" @click="submitFiles()" @keyup.enter="addFiles()">
							<span class="button__text">{{ $t('buttons.addfiles') }}</span>
							<span class="button__icon icon-upload"></span>
						</button>
					</div>
				</div>

				<div class="hide">
					<label>{{ $t('titles.files') }}</label>
					<input id="files" ref="files" accept=".json" type="file" multiple @change="handleFilesUpload()" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			files: []
		};
	},
	computed: {
		currentProjectName: {
			get() {
				return this.$store.getters['files/getCurrentProjectName'];
			}
		}
	},
	methods: {
		addFiles() {
			this.$refs.files.click();
		},
		submitFiles() {
			const _this = this;
			// var files = evt.target.files; // FileList object

			// files is a FileList of File objects. List some properties.
			for (let i = 0, f; (f = this.files[i]); i++) {
				const reader = new FileReader();
				reader.readAsText(f);
				reader.addEventListener('loadend', (e) => {
					_this.$store.dispatch('files/setProjectFiles', { filename: f.name, data: JSON.parse(e.target.result) });
					_this.$store.dispatch('ui/hideAddFiles');
					_this.$store.dispatch('ui/showProject');
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
.hide {
	opacity: 0;
	height: 0;
	clip-path: inset(100% 100% 100% 100%);
}

.block {
	padding: grid(0.5);
}
.add-files {
	background-color: color(White);
}

.upload {
	&__file {
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
</style>
