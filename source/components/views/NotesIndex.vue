<script>
export default {
  name: 'Home',

  mounted: function() {
    console.log('mounted');
  },

  events: {

  }
}
</script>

<template>
  <div>

    <section class="px-3 pt-5 pb-3 mb-3">
      <div class="shadow">
        <input type="text" class="px-4 py-2 t-1 wp-100 cbg-white rounded">
      </div>
    </section>

    <article class="px-3">
      <div class="px-4 py-2 rounded">
        <h1 class="t-1">Note</h1>
      </div>
      <!--       
      <div class="px-4 py-3">
        <p class="pr-2">
        The Sitemap plugin for Craft doesn’t support commerce products out of the box, but it does provide a hook to add custom elements to the sitemap.
        </p>
      </div> 
      -->
    </article>

    <article class="px-3">
      <div class="px-4 py-2 rounded">
        <h1 class="t-1">Note</h1>
      </div>
      <!--       
      <div class="px-4 py-3">
        <p class="pr-2">
        The Sitemap plugin for Craft doesn’t support commerce products out of the box, but it does provide a hook to add custom elements to the sitemap.
        </p>
      </div> 
      -->
    </article>

  </div>
</template>