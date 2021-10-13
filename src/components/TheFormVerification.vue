<template>
	<form>
		<p>Set slider to max</p>
		<v-slider
			v-model="slider"
			@change="validationStatusChanged"
			max="50"
			min="-50"
		/>
	</form>
</template>

<script>
export default {
	data() {
		return {
			slider: -50,
		}
	},
	methods: {
		validationStatusChanged() {
			if (this.slider === 50) {
				this.$emit("validationStatusChanged")
			}
		},
	},
}
</script>
