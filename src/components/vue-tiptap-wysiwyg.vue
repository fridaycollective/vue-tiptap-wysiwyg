<template>
  <div
      :class="fullScreen ? 'h-auto' : ''"
      :style="
      fullScreen
        ? 'position: absolute; left: 0px; top: 0px; z-index: 9999; width:100%; min-height: 100%; background-color: white'
        : ''
    "
      ref="wysiwyg"
  >
    <div v-if="editor">
      <add-image-modal
          :input-type="inputType"
          v-if="showImageUpload"
          :user="user"
          @inserted="insertImage"
          @closed="showImageUpload = false"
      />
      <div
          class="row"
          :style="
          fullScreen
            ? 'position: fixed; top: 0px; background-color: white; z-index: 9999; width: 100%'
            : ''
        "
      >
        <div class="col">
          <div class="btn-group mb-3 border border-secondary me-3" role="group">
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleBold().run()"
                :class="{
                'btn-secondary text-white': editor.isActive('bold'),
              }"
                v-tooltip:bottom="'Bold'"
            >
              <i class="fad fa-bold" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleItalic().run()"
                :class="{
                'btn-secondary text-white': editor.isActive('italic'),
              }"
                v-tooltip:bottom="'Italic'"
            >
              <i class="fad fa-italic" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleStrike().run()"
                :class="{
                'btn-secondary text-white': editor.isActive('strike'),
              }"
                v-tooltip:bottom="'Strikethrough'"
            >
              <i class="fad fa-strikethrough" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleCode().run()"
                :class="{
                'btn-secondary text-white': editor.isActive('code'),
              }"
                v-tooltip:bottom="'Code'"
            >
              <i class="fad fa-code" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleHighlight().run()"
                :class="{
                'btn-secondary text-white':
                  editor.isActive('highlight'),
              }"
                v-tooltip:bottom="'Highlight'"
            >
              <i class="fad fa-highlighter" />
            </button>
            <button
                class="btn rounded-0 btn-sm" style="padding: 0px !important;"
                v-tooltip:bottom="'Text Color'"
            >
              <v-swatches v-model="textColor"
                          class="px-1"
                          :popover-x="'right'"
                          :trigger-style="{ width: '11px', height: '11px', 'border-radius': '0px' }"
                          :swatch-style="{ width: '22px', height: '22px'}"
                          @input="applyTextColor()"
              />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="showImageUpload = true"
                v-tooltip:bottom="'Insert Image'"
            >
              <i class="fad fa-image" />
            </button>
            <div class="dropdown">
              <button id="linkDropdown"
                      class="btn rounded-0 btn-sm text-secondary"
                      v-tooltip:bottom="'Insert Link'"
                      data-bs-toggle="dropdown" aria-expanded="false"
              >
                <i class="fad fa-link" />
              </button>
              <div class="dropdown-menu p-2" aria-labelledby="linkDropdown">
                <label>Url</label>
                <input v-model="newLinkUrl"
                       class="form-control form-control-sm mb-2"
                       type="url"
                       placeholder="http://" />

                <label>Text (optional)</label>
                <input v-model="newLinkText"
                       class="form-control form-control-sm mb-2"
                       type="text" />

                <button class="btn btn-sm btn-secondary w-100" @click="insertLink">
                  <i class="fad fa-plus-circle" />
                  Add Link
                </button>
              </div>
            </div>
          </div>
          <div class="btn-group mb-3 border border-secondary me-3" role="group">
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().setParagraph().run()"
                :class="{
                'btn-secondary text-white':
                  editor.isActive('paragraph'),
              }"
                v-tooltip:bottom="'Paragraph'"
            >
              <i class="fad fa-paragraph" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              "
                :class="{
                'btn-secondary text-white': editor.isActive(
                  'heading',
                  { level: 1 }
                ),
              }"
                v-tooltip:bottom="'Header 1'"
            >
              <i class="fad fa-h1" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              "
                :class="{
                'btn-secondary text-white': editor.isActive(
                  'heading',
                  { level: 2 }
                ),
              }"
                v-tooltip:bottom="'Header 2'"
            >
              <i class="fad fa-h2" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              "
                :class="{
                'btn-secondary text-white': editor.isActive(
                  'heading',
                  { level: 3 }
                ),
              }"
                v-tooltip:bottom="'Header 3'"
            >
              <i class="fad fa-h3" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              "
                :class="{
                'btn-secondary text-white': editor.isActive(
                  'heading',
                  { level: 4 }
                ),
              }"
                v-tooltip:bottom="'Header 4'"
            >
              <i class="fad fa-h4" />
            </button>
          </div>
          <div class="btn-group mb-3 border border-secondary me-3" role="group">
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().setTextAlign('left').run()"
                :class="{
                'btn-secondary text-white': editor.isActive({
                  textAlign: 'left',
                }),
              }"
                v-tooltip:bottom="'Align Left'"
            >
              <i class="fad fa-align-left" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="
                editor.chain().focus().setTextAlign('center').run()
              "
                :class="{
                'btn-secondary text-white': editor.isActive({
                  textAlign: 'center',
                }),
              }"
                v-tooltip:bottom="'Align Center'"
            >
              <i class="fad fa-align-center" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="
                editor.chain().focus().setTextAlign('right').run()
              "
                :class="{
                'btn-secondary text-white': editor.isActive({
                  textAlign: 'right',
                }),
              }"
                v-tooltip:bottom="'Align Right'"
            >
              <i class="fad fa-align-right" />
            </button>
          </div>
          <div class="btn-group mb-3 border border-secondary me-3" role="group">
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleTaskList().run()"
                :class="{
                'btn-secondary text-white':
                  editor.isActive('taskList'),
              }"
                v-tooltip:bottom="'Task List'"
            >
              <i class="fa fa-tasks" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleBulletList().run()"
                :class="{
                'btn-secondary text-white':
                  editor.isActive('bulletList'),
              }"
                v-tooltip:bottom="'Bullet List'"
            >
              <i class="fad fa-list" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().toggleOrderedList().run()"
                :class="{
                'btn-secondary text-white':
                  editor.isActive('orderedList'),
              }"
                v-tooltip:bottom="'Numbered List'"
            >
              <i class="fad fa-list-ol" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().setHorizontalRule().run()"
                v-tooltip:bottom="'Horizontal Rule'"
            >
              <i class="fad fa-horizontal-rule" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().setHardBreak().run()"
                v-tooltip:bottom="'Hard Break'"
            >
              <i class="fad fa-page-break" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().unsetAllMarks().run()"
                v-tooltip:bottom="'Clear Formatting'"
            >
              <i class="fad fa-remove-format" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().clearNodes().run()"
                v-tooltip:bottom="'Clear Structure'"
            >
              <i class="fad fa-align-slash" />
            </button>
          </div>
          <div class="btn-group mb-3 border border-secondary me-3" role="group">
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().undo().run()"
                v-tooltip:bottom="'Undo'"
            >
              <i class="fad fa-undo" />
            </button>
            <button
                class="btn rounded-0 btn-sm text-secondary"
                @click.prevent="editor.chain().focus().redo().run()"
                v-tooltip:bottom="'Redo'"
            >
              <i class="fad fa-redo" />
            </button>
          </div>
          <div
              class="btn-group border border-secondary mb-3"
              role="group"
              v-if="!disableFullScreen"
          >
            <button
                class="btn rounded-0 btn-sm text-secondary"
                :class="{ 'btn-secondary text-white': fullScreen }"
                @click.prevent="fullScreen = !fullScreen"
                v-tooltip:bottom="'Full Screen'"
            >
              <i class="fad fa-expand" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="border p-2 rounded" :class="fullScreen ? 'h-100' : ''">
      <editor-content :editor="editor" class="h-100" :style="this.minHeight ? ('min-height:' + this.minHeight) : ''"/>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Gapcursor from "@tiptap/extension-gapcursor";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import { Extension } from "@tiptap/core";
import { SmilieReplacer } from "./wysiwg-partials/SmilieReplacer";
import AddImageModal from "./wysiwg-partials/AddImageModal";
import EvernoteResourceExtension from "./wysiwg-partials/EvernoteResourceExtension";
import VSwatches from 'vue-swatches';

export const LiteralTab = Extension.create({
  name: "literalTab",

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.insertContent("\t");
      }
    };
  }
});

/*
const CustomTaskItem = TaskItem.extend({
  content: "inline*"
});
*/

export default {
  components: {
    AddImageModal,
    EditorContent,
    VSwatches
  },

  props: {
    value: {
      type: String,
      default: ""
    },
    user: {
      type: Object
    },
    inputType: {
      type: String,
      default: "notes"
    },
    disableFullScreen: {
      type: Boolean,
      default: false
    },
    keyboardSubmit: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: String,
      default: ""
    },
  },

  data() {
    return {
      editor: null,
      showImageUpload: false,
      fullScreen: false,
      textColor: '#000000',
      newLinkUrl: "",
      newLinkText: ""
    };
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.value, false);
    }
  },

  methods: {
    insertImage(data) {
      this.editor
          .chain()
          .focus()
          .setImage(data)
          .run();
      this.showImageUpload = false;
      $("#modal-add-image").modal("hide");
    },
    applyTextColor() {
      this.editor.chain().focus().setColor(this.textColor).run();
    },
    insertLink() {
      if (this.newLinkUrl) {
        let html = "";
        if (this.newLinkText.length > 0) {
          html = "<a href='" + this.newLinkUrl + "'>" + this.newLinkText + "</a>";
        } else {
          html = "<a href='" + this.newLinkUrl + "'>" + this.newLinkUrl + "</a>";
        }


        // update link
        this.editor
            .chain()
            .focus()
            .insertContent(html)
            .run();
      }
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Highlight,
        Gapcursor,
        Placeholder,
        Image,
        Typography,
        TextStyle,
        Color,
        SmilieReplacer,
        LiteralTab,
        TaskList,
        TaskItem,
        TextAlign.configure({
          types: ["heading", "paragraph"]
        }),
        Link,
        EvernoteResourceExtension,
      ],
      content: this.value,
      onUpdate: () => {
        // HTML
        this.$emit("input", this.editor.getHTML());

        // JSON
        // this.$emit('input', this.editor.getJSON())
      }
    });

    if (this.keyboardSubmit) {
      this.$refs.wysiwyg.addEventListener("keydown", e => {
        if (e.keyCode == 13 && e.metaKey) {
          this.$emit("keyboardSubmit");
        }
      });
    }
  },

  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">

.vue-swatches__check__wrapper{position:absolute;width:100%;height:100%}.vue-swatches__check__circle{width:21px;height:21px;border-radius:50%;background-color:rgba(0,0,0,.15)}.vue-swatches__check__path{fill:#fff}.vue-swatches__swatch{position:relative;display:inline-block;font-size:0}.vue-swatches__swatch:focus,.vue-swatches__swatch:hover{opacity:.9;box-shadow:inset 0 0 2px rgba(0,0,0,.75);outline:none}.vue-swatches__swatch.vue-swatches__swatch--border,.vue-swatches__swatch.vue-swatches__swatch--selected{box-shadow:inset 0 0 2px rgba(0,0,0,.75)}.vue-swatches__swatch__label{position:absolute;left:0;right:0;color:#666;font-size:10px;font-weight:700;text-align:center}.vue-swatches__swatch .vue-swatches__diagonal__wrapper{position:absolute}fieldset[disabled] .vue-swatches{pointer-events:none}.vue-swatches{position:relative;display:inline-block;outline:none}.vue-swatches__trigger__wrapper{display:inline-block;cursor:pointer}.vue-swatches__trigger.vue-swatches--is-empty{border:2px solid #ccc}.vue-swatches__trigger.vue-swatches--is-disabled{cursor:not-allowed}.vue-swatches__container{box-sizing:content-box}.vue-swatches__container.vue-swatches--inline{font-size:0}.vue-swatches__container:not(.vue-swatches--inline){position:absolute;display:block;overflow:auto;border-radius:5px;box-shadow:0 2px 3px rgba(10,10,10,.2),0 0 0 1px rgba(10,10,10,.2);z-index:50}.vue-swatches__wrapper{background-color:inherit;box-sizing:content-box}.vue-swatches__row{font-size:0}.vue-swatches__fallback__wrapper{display:table}.vue-swatches__fallback__input--wrapper{display:table-cell;padding-right:10px;width:100%;font-size:14px}.vue-swatches__fallback__input{width:100%;padding-top:6px;padding-bottom:6px;border-radius:5px;border:1px solid #dcdcdc;color:#35495e;background:#fff}.vue-swatches__fallback__button{display:table-cell;padding:6px 15px;border:0;cursor:pointer;font-weight:700;color:#fff;background-color:#3571c8;border-radius:5px}.vue-swatches-show-hide-enter-active,.vue-swatches-show-hide-leave-active{transition:all .3s ease}.vue-swatches-show-hide-enter,.vue-swatches-show-hide-leave-active{opacity:0}.vue-swatches--has-children-centered{display:flex;align-items:center;justify-content:center}.vue-swatches__diagonal__wrapper{width:100%;height:100%}.vue-swatches__diagonal{width:75%;height:75%;background:linear-gradient(to top right,transparent 0,transparent calc(50% - 2.4px),#de080a 50%,transparent calc(50% + 2.4px),transparent)}

.ProseMirror {
  outline: none !important;
  height: 100%;

  line-height: 1.2;
  text-align: left;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
}

.is-editor-empty {
  height: 50px;
}

.ProseMirror {
  > img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid #68cef8;
    }
  }
}

.vue-swatches__container {
  left: 0px !important;
}
</style>
