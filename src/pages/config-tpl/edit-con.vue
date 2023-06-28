<template>
  <q-form>
    <q-input
      filled
      v-model="form.name"
      label="名称"
      placeholder="模板名称"
      :rules="[(val) => (val && val.length > 0) || '不能为空']"
    />
    <q-input
      filled
      v-model="form.backgroundImage"
      label="封面图链接"
      :rules="[(val) => /^http/.test(val) || '封面图链接不正确']"
    />
    <div class="q-mb-md" v-if="/^http/.test(form.backgroundImage)">
      <img :src="form.backgroundImage" height="100" />
    </div>
    <q-input
      filled
      type="textarea"
      autogrow
      v-model="form.desc"
      label="描述"
      placeholder="模板描述"
      :rules="[(val) => (val && val.length > 0) || '不能为空']"
    />
    <q-input
      filled
      v-model="form.preview"
      label="预览链接"
      :rules="[(val) => /^http/.test(val) || '预览链接不正确']"
    />
    <q-input
      filled
      v-model="form.githubUrl"
      label="Github链接"
      :rules="[(val) => /^http/.test(val) || 'Github链接不正确']"
    />
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
    initForm() {
      this.form = {
        ...this.row,
      };
    },
  },
};
</script>