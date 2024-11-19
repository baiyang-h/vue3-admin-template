<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { redirect, ..._query } = route.query
router.replace({
  path: redirect,
  query: _query
})
</script>
