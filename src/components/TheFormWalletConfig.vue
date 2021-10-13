<template>
	<form>
		<v-card elevation="0">
			<v-card-title class="blue darken-1 white--text font-weight-black title">
				PAYMENT DETAILS
			</v-card-title>

			<v-card-text class="pb-10">
				<v-row>
					<v-col cols="6">
						<v-subheader class="grey--text text--lighten-1 pl-0 subheader">
							CARDHOLDER’S NAME
						</v-subheader>
						<v-text-field
							v-model="name"
							:error-messages="nameErrors"
							:counter="20"
							single-line
							outlined
							label="Johny Relative"
							required
							@input="$v.name.$touch()"
							@blur="$v.name.$touch()"
						/>
					</v-col>

					<v-col cols="6">
						<v-subheader class="grey--text text--lighten-1 pl-0 subheader">
							CARD NUMBER
						</v-subheader>
						<v-text-field
							v-model="valueOfCardNumber"
							:error-messages="numericErrors"
							:counter="16"
							single-line
							outlined
							mask="credit-card"
							required
							@input="$v.valueOfCardNumber.$touch()"
							@blur="$v.valueOfCardNumber.$touch()"
						/>
					</v-col>

					<v-col col="4">
						<v-subheader class="grey--text text--lighten-1 pl-0 subheader">
							EXPIRY DATE
						</v-subheader>
						<v-select
							v-model="month"
							:items="monthList"
							:error-messages="monthErrors"
							label="Month"
							outlined
							required
							@change="$v.month.$touch()"
							@blur="$v.month.$touch()"
						/>
					</v-col>

					<v-col col="4">
						<v-subheader class="grey--text text--lighten-1 pl-0 subheader" />
						<v-select
							v-model="year"
							:items="yearList"
							:error-messages="yearErrors"
							label="Year"
							outlined
							required
							@change="$v.year.$touch()"
							@blur="$v.year.$touch()"
						/>
					</v-col>

					<v-col col="4">
						<v-subheader class="grey--text text--lighten-1 pl-0 subheader">
							CVV
						</v-subheader>
						<v-text-field
							v-model="cvv"
							:error-messages="cvvErrors"
							:counter="3"
							single-line
							outlined
							required
							@input="$v.cvv.$touch()"
							@blur="$v.cvv.$touch()"
						/>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</form>
</template>

<script>
import { validationMixin } from "vuelidate"
import {
	required,
	minLength,
	maxLength,
	integer,
} from "vuelidate/lib/validators"
export default {
	mixins: [validationMixin],

	validations: {
		name: { required, maxLength: maxLength(20) },
		valueOfCardNumber: {
			required,
			minLength: minLength(16),
			maxLength: maxLength(16),
			integer,
		},
		month: { required },
		year: { required },
		cvv: {
			required,
			minLength: minLength(3),
			maxLength: maxLength(3),
			integer,
		},
	},
	data() {
		return {
			name: "",
			valueOfCardNumber: "4478632299238990",
			month: "",
			monthList: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"Jully",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
			year: "",
			yearList: ["2030", "2029", "2028", "2017", "whatever"],
			cvv: "",
		}
	},
	computed: {
		monthErrors() {
			const errors = []
			if (!this.$v.month.$dirty) return errors
			!this.$v.month.required && errors.push("Item is required")
			return errors
		},
		yearErrors() {
			const errors = []
			if (!this.$v.year.$dirty) return errors
			!this.$v.year.required && errors.push("Item is required")
			return errors
		},
		nameErrors() {
			const errors = []
			if (!this.$v.name.$dirty) return errors
			!this.$v.name.maxLength &&
				errors.push("Name must be at most 20 characters long")
			!this.$v.name.required && errors.push("Name is required.")
			return errors
		},
		numericErrors() {
			const errors = []
			if (!this.$v.valueOfCardNumber.$dirty) return errors
			!this.$v.valueOfCardNumber.integer &&
				errors.push("Card number must be only with digit")
			!this.$v.valueOfCardNumber.minLength &&
				errors.push("Card number must be at least 16 characters long")
			!this.$v.valueOfCardNumber.maxLength &&
				errors.push("Card number must be at most 16 characters long")

			!this.$v.valueOfCardNumber.required &&
				errors.push("Card number is required.")
			return errors
		},
		cvvErrors() {
			const errors = []
			if (!this.$v.cvv.$dirty) return errors
			!this.$v.cvv.integer && errors.push("Card number must be only with digit")
			!this.$v.cvv.minLength &&
				errors.push("Card number must be at least 3 characters long")
			!this.$v.cvv.maxLength &&
				errors.push("Card number must be at most 3 characters long")

			!this.$v.cvv.required && errors.push("Card number is required.")
			return errors
		},
		validationStatus() {
			return !this.$v.$invalid
		},
	},
	watch: {
		validationStatus() {
			this.$emit("validationStatusChanged")
		},
	},
}
</script>
