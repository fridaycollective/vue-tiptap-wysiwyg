import Wyswiyg from "./Wyswiyg.vue";

function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component("vue-tiptap-wysiwyg", Wyswiyg);
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

Wyswiyg.install = install;

export default Wyswiyg;
