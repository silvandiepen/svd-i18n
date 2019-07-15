<template>
	<div class="project-detail">
		{{ PROJECT }}
		<table>
			<tr>
				<td>Endpoint</td>
				<td>https://api.poliglott.com/project/{{ PROJECT.name }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	computed: {
		PROJECT() {
			return this.$store.getters['project/PROJECT_INFO'];
		}
	}
};
</script>

<style></style>
