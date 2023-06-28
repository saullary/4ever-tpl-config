<template>
  <q-form ref="form">
    <div class="row">
      <q-input
        class="col"
        v-model="form.name"
        label="模板名称"
        :rules="[(val) => (val && val.length > 0) || '不能为空']"
      />
      <div class="q-ml-md" style="width: 150px">
        <q-file v-model="form.file" label=".zip压缩包" />
      </div>
    </div>
    <div class="row">
      <q-input
        class="col"
        v-model="form.backgroundImage"
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
      v-model="form.preview"
      label="预览链接"
      :rules="[(val) => /^http/.test(val) || '预览链接不正确']"
    />
    <q-input
      v-model="form.githubUrl"
      label="Github链接"
      :rules="[(val) => /^http/.test(val) || 'Github链接不正确']"
    />

    <div class="ta-r q-mt-md">
      <q-btn color="primary" label="提交" @click="onSubmit"></q-btn>
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
        const body = {
          ...this.form,
          action: this.form.id ? 0 : 1,
        };
        if (body.file) {
          if (body.dir) {
            body.destPath = body.dir.split("/")[1];
          } else {
            body.destPath = body.name.replace(/\s+/g, "-").toLowerCase();
          }
          delete body.dir;
          body.unzipDir = "dist";
        }
        console.log(valid, this.form.file);
      } catch (error) {
        console.log(error);
      }
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