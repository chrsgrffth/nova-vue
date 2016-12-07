<script>
export default {
  name: 'Home',

  mounted: function() {
    console.log('mounted');
  }
}
</script>

<template>
  <router-link to="notes">Home</router-link>
</template>