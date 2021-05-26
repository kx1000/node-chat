<template>
  <small v-if="errorMessage" class="form-text text-danger">
    {{ errorMessage }}
  </small>
</template>

<script>
export default {
  name: "FieldError",
  props: {
    field: {
      type: String,
      required: true,
    },
    formError: {
      type: undefined,
      required: true,
    }
  },
  computed: {
    errorMessage() {
      if (undefined === this.formError) {
        return undefined;
      }
      let errors = this.formError.response.data.errors;

      if (undefined === errors || undefined === errors[this.field]) {
        return undefined;
      }

      return errors[this.field].message;
    }
  }
}
</script>
