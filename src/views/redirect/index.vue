<script>
export default {
  name: "Redirect",
  created() {
    this.$router.replace({ path: '/' + this.$route.params.path })
  },
  render() {
    return null
  }
}
</script>
