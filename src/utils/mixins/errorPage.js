const errorPageMixin = {
  data() {
    return {
      second: 5,
      interval: null
    }
  },
  mounted() {
    this.redirectDashboard()
  },
  methods: {
    redirectDashboard() {
      const that = this
      this.interval = setInterval(function () {
        if (!that.second) {
          clearInterval(that.interval);
          //Redirect to dashboard after 5s.
          return that.$router.push({name: 'Dashboard'})
        }
        that.second--
      }, 1000)
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
export default errorPageMixin;
