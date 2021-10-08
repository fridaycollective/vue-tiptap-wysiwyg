import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import EvernoteResourceComponent from './EvernoteResourceComponent.vue'

export default Node.create({
    name: 'evernoteResourceVueComponent',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            hash: {
                default: null
            },
            type: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'evernote-resource-vue-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['evernote-resource-vue-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(EvernoteResourceComponent)
    },
})
