<template>
  <main>
    <section class="upload basic">
      <row center>
        <column medium="1:3">
          <label>Upload a json file</label>
          <input type="file" />
        </column>
      </row>
    </section>
    <section class="translate-rows basic">
      <row center>
        <column medium="1:3">
          <h3>Title</h3>
        </column>
      </row>
    </section>
  </main>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss">
  @import '~svd-style/ext';
  header{ padding: grid(1); }
</style>
