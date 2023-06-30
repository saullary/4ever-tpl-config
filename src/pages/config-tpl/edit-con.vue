<template>
  <q-form ref="form">
    <div class="row">
      <q-input
        class="col"
        v-model.trim="form.name"
        label="模板名称"
        :rules="[(val) => (val && val.length > 0) || '不能为空']"
      />
      <div class="q-ml-md" style="width: 150px">
        <q-file v-model="form.file" label=".zip压缩包" accept=".zip" />
      </div>
    </div>
    <div class="row">
      <q-input
        class="col"
        v-model.trim="form.backgroundImage"
        label="封面图链接"
        :rules="[(val) => /^http/.test(val) || '封面图链接不正确']"
      />
      <div class="q-ml-md" v-if="/^http/.test(form.backgroundImage)">
        <img :src="form.backgroundImage" height="100" />
      </div>
    </div>
    <q-input
      type="textarea"
      autogrow
      v-model="form.desc"
      label="模板描述"
      :rules="[(val) => (val && val.length > 0) || '不能为空']"
    />
    <q-input
      type="textarea"
      v-model="form.configJson"
      label="config.json"
      :rules="[(val) => (val && val.length > 0) || '不能为空']"
    />
    <q-input
      v-model.trim="form.preview"
      label="预览链接"
      :rules="[(val) => /^http/.test(val) || '预览链接不正确']"
    />

    <div class="ta-r q-mt-md">
      <q-btn
        :loading="posting"
        color="primary"
        label="提交"
        @click="onSubmit"
      ></q-btn>
    </div>
  </q-form>
</template>

<script>
export default {
  props: {
    row: Object,
  },
  data() {
    return {
      form: {},
      posting: false,
    };
  },
  watch: {
    row() {
      this.initForm();
    },
  },

  created() {
    this.initForm();
  },
  methods: {
    async onSubmit() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;
        const { id } = this.row;
        const body = {
          ...this.form,
        };
        if (body.file) {
          if (body.dir) {
            body.destPath = body.dir.split("/")[1];
          } else {
            body.destPath = body.name.replace(/\s+/g, "-").toLowerCase();
          }
          delete body.dir;
          body.unzipDir = "dist";
        } else {
          if (!id) throw new Error("请上传模板zip压缩包");
        }
        if (body.configJson) {
          const json = JSON.parse(body.configJson);
          if (!Array.isArray(json.config)) {
            throw new Error("config.json格式有误");
          }
        }
        const form = new FormData();
        let len = 0;

        for (const key in body) {
          const val = body[key];
          if (!val) continue;
          if (id && val === this.row[key]) continue;
          form.append(key, val);
          len += 1;
          // console.log(key, val);
        }
        if (!len) {
          throw new Error("无修改");
        }
        if (id) {
          form.append("id", id);
        }
        form.append("action", id ? 0 : 1);
        console.log(body, len, form);
        this.posting = true;
        await this.$http.post("/template/web3/upload", form);
        this.$emit("done");
      } catch (error) {
        console.log(error);
        window.alert(error.message);
      }
      this.posting = false;
    },
    initForm() {
      this.form = {
        ...this.row,
        file: null,
      };
    },
  },
};
</script>