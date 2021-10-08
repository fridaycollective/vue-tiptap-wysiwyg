import Wysiwyg from "./Wyswiyg.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("vue-tiptap-wysiwyg", Wysiwyg);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

Wysiwyg.install = install;

export default Wysiwyg;
