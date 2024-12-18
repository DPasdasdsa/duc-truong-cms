<template>
  <div>
    <h2>Base Vue 3 created by IT team.</h2>
    <div>Vue router & middleware: {{ $t('messages.title_popup_success') }}</div>
    <div>Vuex & call api: {{ $t('messages.title_popup_success') }}</div>
    <div>Helper & mixins: {{ $t('messages.title_popup_success') }}</div>
    <div>Multi language: {{ $t('messages.title_popup_success') }}</div>
    <div>
      <Form @submit="testValidate()">
        <label for="name">Test validate</label>
        <Field name="duong" type="text" rules="required|decimal"/>
        <ErrorMessage name="duong"/>
      </Form>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters({

    })
  },
  methods: {
    testValidate() {
      console.log('pass')
    }
  }
}
</script>
