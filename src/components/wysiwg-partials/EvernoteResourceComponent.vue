<template>
  <node-view-wrapper class="evernote-resource-vue-component">
    <div class="bg-light shadow-sm cursor-pointer" @click="downloadResource">
      <span class="label bg-light-pink">Evernote Resource</span>

      <div class="content text-center pt-4">
        <h5><i class="fad fa-3x text-primary mb-3" :class="getFontAwesomeIconFromMIME(node.attrs.type)" /></h5>
        <h6>{{ getMimeTypeDisplayName(node.attrs.type) }}</h6>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  methods: {
    increase() {
      this.updateAttributes({
        count: this.node.attrs.count + 1,
      })
    },
    getFontAwesomeIconFromMIME(mimeType) {
      // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
      var icon_classes = {
        // Media
        image: "fa-file-image",
        audio: "fa-file-audio",
        video: "fa-file-video",
        // Documents
        "application/pdf": "fa-file-pdf",
        "application/msword": "fa-file-word",
        "application/vnd.ms-word": "fa-file-word",
        "application/vnd.oasis.opendocument.text": "fa-file-word",
        "application/vnd.openxmlformatsfficedocument.wordprocessingml":
            "fa-file-word",
        "application/vnd.ms-excel": "fa-file-excel",
        "application/vnd.openxmlformatsfficedocument.spreadsheetml":
            "fa-file-excel",
        "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel",
        "application/vnd.ms-powerpoint": "fa-file-powerpoint",
        "application/vnd.openxmlformatsfficedocument.presentationml":
            "fa-file-powerpoint",
        "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint",
        "text/plain": "fa-file-text",
        "text/html": "fa-file-code",
        "application/json": "fa-file-code",
        // Archives
        "application/gzip": "fa-file-archive",
        "application/zip": "fa-file-archive"
      };

      for (var key in icon_classes) {
        if (icon_classes.hasOwnProperty(key)) {
          if (mimeType.search(key) === 0) {
            // Found it
            return icon_classes[key];
          }
        } else {
          return "fa-file";
        }
      }
    },
    getMimeTypeDisplayName(mimeType) {
      // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
      var icon_classes = {
        // Media
        image: "Image",
        audio: "Audio",
        video: "Video",
        // Documents
        "application/pdf": "PDF",
        "application/msword": "Document",
        "application/vnd.ms-word": "Document",
        "application/vnd.oasis.opendocument.text": "Document",
        "application/vnd.openxmlformatsfficedocument.wordprocessingml":
            "Document",
        "application/vnd.ms-excel": "Spreadsheet",
        "application/vnd.openxmlformatsfficedocument.spreadsheetml":
            "Spreadsheet",
        "application/vnd.oasis.opendocument.spreadsheet": "Spreadsheet",
        "application/vnd.ms-powerpoint": "Presentation",
        "application/vnd.openxmlformatsfficedocument.presentationml":
            "Presentation",
        "application/vnd.oasis.opendocument.presentation": "Presentation",
        "text/plain": "Text",
        "text/html": "HTML",
        "application/json": "JSON",
        // Archives
        "application/gzip": "Archive",
        "application/zip": "Archive"
      };

      for (var key in icon_classes) {
        if (icon_classes.hasOwnProperty(key)) {
          if (mimeType.search(key) === 0) {
            // Found it
            return icon_classes[key];
          }
        } else {
          return "Unknown Resource";
        }
      }
    },
    downloadResource() {
      window.location = process.env.VUE_APP_API_URL + '/notes/evernote-resources/' + this.node.attrs.hash
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.evernote-resource-vue-component {
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
}

.label {
  margin-left: 1rem;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  margin-top: 1.5rem;
  padding: 1rem;
}
</style>
