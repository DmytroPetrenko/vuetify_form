<template>
	<form>
		<v-text-field
			v-model="name"
			:error-messages="nameErrors"
			:counter="20"
			label="Name"
			required
			@input="$v.name.$touch()"
			@blur="$v.name.$touch()"
		></v-text-field>
		<v-text-field
			v-model="phone"
			:error-messages="phoneErrors"
			:counter="13"
			label="Phone"
			required
			@input="$v.phone.$touch()"
			@blur="$v.phone.$touch()"
		></v-text-field>
		<v-text-field
			v-model="email"
			:error-messages="emailErrors"
			label="E-mail"
			required
			@input="$v.email.$touch()"
			@blur="$v.email.$touch()"
		></v-text-field>
		<v-select
			v-model="select"
			:items="items"
			:error-messages="selectErrors"
			label="Delivery town"
			required
			@change="$v.select.$touch()"
			@blur="$v.select.$touch()"
		></v-select>
		<v-checkbox
			v-model="checkbox"
			:error-messages="checkboxErrors"
			label="Do you agree?"
			required
			@change="$v.checkbox.$touch()"
			@blur="$v.checkbox.$touch()"
		></v-checkbox>
	</form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, minLength, maxLength, email } from "vuelidate/lib/validators"
import phone from "@/utils/phone"
export default {
	mixins: [validationMixin],

	validations: {
		name: { required, maxLength: maxLength(20) },
		phone: {
			required,
			minLength: minLength(13),
			maxLength: maxLength(13),
			phone,
		},
		email: { required, email },
		select: { required },
		checkbox: {
			checked(val) {
				return val
			},
		},
	},

	data: () => ({
		name: "",
		phone: "+38",
		email: "",
		select: null,
		items: ["Kyiv", "Lviv", "Kharkiv", "Odesa"],
		checkbox: false,
	}),

	computed: {
		checkboxErrors() {
			const errors = []
			if (!this.$v.checkbox.$dirty) return errors
			!this.$v.checkbox.checked && errors.push("You must agree to continue!")
			return errors
		},
		selectErrors() {
			const errors = []
			if (!this.$v.select.$dirty) return errors
			!this.$v.select.required && errors.push("Item is required")
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
		phoneErrors() {
			const errors = []
			if (!this.$v.phone.$dirty) return errors
			!this.$v.phone.phone && errors.push("Phone must be only with digit and start from plus")
			!this.$v.phone.minLength &&
				errors.push("Phone must be at least 13 characters long")
			!this.$v.phone.maxLength &&
				errors.push("Phone must be at most 13 characters long")

			!this.$v.phone.required && errors.push("Phone is required.")
			return errors
		},
		emailErrors() {
			const errors = []
			if (!this.$v.email.$dirty) return errors
			!this.$v.email.email && errors.push("Must be valid e-mail")
			!this.$v.email.required && errors.push("E-mail is required")
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
