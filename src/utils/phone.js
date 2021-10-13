import { helpers } from "vuelidate/lib/validators"
export default helpers.regex("phone", /^(?:[+].*\d|\d)$/gm)
