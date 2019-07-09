<template>
	<div class="export-file">
		<button :class="[visible ? '' : 'button--disabled']" class="button" @click="createZip">
			<span class="button__text">Export</span>
		</button>
	</div>
</template>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
	computed: {
		files() {
			return this.$store.getters['files/PROJECT'];
		},
		visible() {
			if (!this.$store.getters['files/PROJECT']) return false;
			if (Object.keys(this.$store.getters['files/PROJECT'].data).length > 0) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		createZip() {
			const _this = this;
			const zip = new JSZip();
			Object.keys(_this.files.data).forEach((item) => {
				const file = _this.files.data[item];
				zip.file(file.filename, JSON.stringify(file.data));
			});
			zip.generateAsync({ type: 'blob' }).then(function(content) {
				FileSaver.saveAs(content, _this.files.name + '.zip');
			});
		}
	}
};
</script>

<style></style>
