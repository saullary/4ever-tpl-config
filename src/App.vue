<template>
  <router-view />
</template>

<script>
import { useQuasar } from "quasar";

export default {
  name: "App",
  setup() {
    const $q = useQuasar();
    window.$notify = (message, position = "top") => {
      $q.notify({
        message,
        position,
      });
    };
    window.alert = (message, title = "提示") => {
      return $q.dialog({
        title,
        message,
      });
    };
    window.$prompt = (opts) => {
      return $q.dialog({
        cancel: true,
        persistent: true,
        prompt: {
          model: "",
          type: "text", // optional
        },
        ...opts,
      });
    };
  },
};
</script>
