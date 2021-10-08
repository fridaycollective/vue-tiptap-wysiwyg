<script>
import Vue from 'vue';
import VueTiptapWysiwyg from '@/vue-tiptap-wysiwyg.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueTiptapWysiwyg
  }
});
</script>

<template>
  <div id="app">
    <vue-tiptap-wysiwyg />
  </div>
</template>
