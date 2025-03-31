<template>
  <div>
    Welcome.
    <div>
      <router-link :to="{name:'BaseTemplate'}">Click here to base template</router-link>
    </div>
    <div>
      <router-link :to="{name:'BaseApi'}" class="btn-danger">Click here to base call api</router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'IndexView',
  data() {
    return {}
  },
  async created() {
  },
};
</script>
