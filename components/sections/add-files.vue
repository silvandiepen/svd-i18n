<template>
	<div class="row center">
		<div class="column small-full medium-half">
			<div class="block">
				<h3>{{ currentProjectName }}</h3>
				<p v-if="files.length < 1">
					Add files to your fileset
				</p>

				<button v-if="files.length < 1" class="upload__add-button button" @click="addFiles()">
					<span class="button__icon icon-add"></span>
				</button>
			</div>

			<div class="block">
				<label>Files</label>
				<input id="files" ref="files" accept=".json" type="file" multiple @change="handleFilesUpload()" />
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
					<button class="upload__upload-button button" @click="submitFiles()">
						<span class="button__text">upload</span>
						<span class="button__icon icon-upload"></span>
					</button>
				</div>
			</div>
		</div>
	</div>
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

<style></style>
