<template>
	<base-stepper ref="stepper" :stepperHeaders="stepperHeaders">
		<template v-slot:stepper-item-content-1>
			<the-form-personal-data
				ref="formPersonalData"
				@validationStatusChanged="formStatusChanger"
			/>
		</template>
		<template v-slot:stepper-item-content-2>
			<the-form-verification
				ref="formVerification"
				@validationStatusChanged="formStatusChanger"
			/>
		</template>
		<template v-slot:stepper-item-content-3>
			<the-form-wallet-config
				ref="formWalletConfig"
				@validationStatusChanged="formStatusChanger"
			/>
		</template>
	</base-stepper>
</template>
<script>
import TheFormPersonalData from "@/components/TheFormPersonalData"
import TheFormVerification from "@/components/TheFormVerification"
import TheFormWalletConfig from "@/components/TheFormWalletConfig"
export default {
	components: {
		TheFormPersonalData,
		TheFormVerification,
		TheFormWalletConfig,
	},
	mounted() {
		this.$nextTick(() => {
			let original = this.$refs.stepper.setCurrentStepIndex // preserve original function
			this.$refs.stepper.setCurrentStepIndex = (index) => {
				this.$refs.formPersonalData.$v.$touch()
				this.$refs.formWalletConfig.$v.$touch()
				if (this.formStatus) {
					original(index)
					this.$refs.formPersonalData.$v.$reset()
					this.$refs.formWalletConfig.$v.$reset()
					this.formStatus = !this.formStatus
				}
			}
			this.$refs.stepper.$forceUpdate() // will re-evaluate visual logic of child component
		})
	},
	data() {
		return {
			stepperHeaders: [
				{
					id: 1,
					header: "Personal Data",
				},
				{
					id: 2,
					header: "Verification",
				},
				{
					id: 3,
					header: "Wallet Config",
				},
			],
			formStatus: false,
		}
	},
	methods: {
		formStatusChanger() {
			this.formStatus = !this.formStatus
		},
	},
}
</script>
