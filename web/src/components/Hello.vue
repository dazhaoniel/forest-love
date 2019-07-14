<template>
  <div>
    <h2>Calculate and Offset for your Emissions!</h2>
    <from-to-line/>
  </div>
</template>

<script>
import FromToLine from './FromToLine';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    'from-too-line': FromToLine
  }
}
</script>

<style scoped>

</style>
