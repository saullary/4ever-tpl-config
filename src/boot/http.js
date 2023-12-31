import { boot } from "quasar/wrappers";
import api from "../api";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  const global = app.config.globalProperties;
  global.$http = api;
});
