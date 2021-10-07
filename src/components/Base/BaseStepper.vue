<template>
	<v-stepper v-model="currentStepIndex">
		<v-stepper-header>
			<div
				v-for="(stepperHeader, index) in stepperHeaders"
				:key="stepperHeader.id"
				class="stepper-container"
				:class="{
					'stepper-container-middle': index + 1 < stepperHeaders.length,
				}"
			>
				<v-stepper-step
					:complete="currentStepIndex > index + 1"
					:step="index + 1"
				>
					{{ stepperHeader.header }}
				</v-stepper-step>

				<v-divider v-if="index + 1 < stepperHeaders.length" />
			</div>
		</v-stepper-header>

		<v-stepper-items>
			<v-stepper-content
				v-for="(stepperHeader, index) in stepperHeaders"
				:key="`${stepperHeader.id}content`"
				:step="index + 1"
			>
				<slot :name="`stepper-item-content-${index + 1}`">
					<v-card class="mb-12" color="grey lighten-1" height="200px">
						{{ `stepper-item-content${index + 1}` }}
					</v-card>
				</slot>

				<v-btn ref="continueButton" color="primary" @click="setCurrentStepIndex(index + 2)">
					Continue
				</v-btn>

				<v-btn text> Cancel </v-btn>
			</v-stepper-content>
		</v-stepper-items>
	</v-stepper>
</template>

<script>
export default {
	props: {
		stepperHeaders: {
			type: Array,
			default: () => [
				{
					id: 1,
					header: "Name of step",
				},
				{
					id: 2,
					header: "Name of step",
				},
			],
		},
	},
	data() {
		return {
			currentStepIndex: 1,
		}
	},
	methods: {
		setCurrentStepIndex(index) {
			index > this.stepperHeaders.length
				? (this.currentStepIndex = 1)
				: (this.currentStepIndex = index)
		},
	},
}
</script>

<style scoped>
.stepper-container {
	align-items: stretch;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.stepper-container-middle {
	flex-grow: 1;
}
</style>
