# Vue Tip Tap WYSIWYG editor

`npm i vue-tiptap-wysiwyg`

```
<template>
  <div>
    <vue-tiptap-wysiwyg
        v-model="content"
        :class="classList"
        :input-type="inputType"
        :keyboard-submit="keyboardSubmit"
        @keyboardSubmit="$emit('keyboardSubmit')"
        required>
      <template v-slot:imageupload="scope">
        <AddImageModal
            :input-type="inputType"
            @inserted="scope.insert"
            @closed="scope.cancel" />
      </template>
    </vue-tiptap-wysiwyg>
  </div>
</template>

<script>
import VueTiptapWysiwyg from "vue-tiptap-wysiwyg";
import AddImageModal from "./wysiwg-partials/AddImageModal";
export default {
  props: ["value", "classList", "inputType", "keyboardSubmit"],
  data() {
    return {
      content: this.value
    }
  },
  watch: {
    content() {
      this.$emit("input", this.content)
    }
  },
  components: {
    AddImageModal,
    VueTiptapWysiwyg
  }
};
</script>

<style>
</style>
```

Add Image Modal example

```
<template>
  <div class="modal fade" id="modal-add-image" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h4 class="fw-bolder text-primary my-auto mb-3">
            Insert Image
          </h4>
          <div class="row">
            <div class="col">
              <button
                class="btn w-100"
                :class="
                  source === 'url' ? 'btn-primary' : 'btn-outline-primary'
                "
                @click.prevent="source = 'url'"
              >
                Image URL
              </button>
            </div>
            <div class="col">
              <button
                class="btn w-100"
                :class="
                  source === 'upload' ? 'btn-primary' : 'btn-outline-primary'
                "
                @click.prevent="source = 'upload'"
              >
                Upload Image
              </button>
            </div>
          </div>

          <hr />

          <div v-if="source === 'url'">
            <input
              type="url"
              v-model="url"
              class="form-control mb-3"
              :placeholder="'Provide image URL...'"
            />
          </div>
          <div v-else-if="source === 'upload'">
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              @change="uploadImage"
              class="form-control mb-3"
            />
          </div>

          <button
            class="btn btn-primary float-end"
            :disabled="!url"
            @click="selectImage"
          >
            <span v-if="uploading">
              Uploading...
            </span>
            <span v-else>Insert Image</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  props: {
    inputType: {
      type: String
    }
  },
  data() {
    return {
      source: "url",
      url: "",
      uploading: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    }),
  },
  methods: {
    closeModal() {
      this.$emit("closed");
    },
    uploadImage(evt) {
      this.uploading = true;

      let formData = new FormData();
      formData.append("file", evt.target.files[0]);
      formData.append("user_id", this.user.id);

      this.$axios
        .post("/" + this.inputType + "/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          this.url = data.url;
          this.uploading = false;
        });
    },
    selectImage() {
      const data = {
        src: this.url
      };

      this.$emit("inserted", data);
      this.closeModal();
    }
  },
  mounted() {
    $("#modal-add-image").modal("show");

    $("#modal-add-image").on("hide.bs.modal", e => {
      this.closeModal();
    });
  },
  destroyed() {
    this.closeModal();
    this.$emit("cancelInsertImage");
  }
};
</script>

<style>
</style>
```
