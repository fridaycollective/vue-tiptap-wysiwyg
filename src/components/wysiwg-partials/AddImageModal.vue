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
export default {
  components: {},
  props: {
    user: {
      type: Object
    },
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
          console.log(data);
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
  }
};
</script>

<style>
</style>
