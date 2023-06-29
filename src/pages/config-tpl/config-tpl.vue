<script setup>
import EditCon from "./edit-con.vue";
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="模板列表"
      :rows="rows"
      :columns="cols"
      :loading="loading"
      :pagination="{
        rowsPerPage: 50,
      }"
    >
      <template v-slot:top-right>
        <q-btn
          outline
          color="primary"
          :loading="loading"
          label="刷新"
          @click="getList"
        />
        <q-btn
          color="primary"
          label="添加记录"
          class="q-ml-md"
          @click="onEdit({})"
        ></q-btn>
      </template>
      <template #body="{ rowIndex, row }">
        <q-tr :props="{ rowIndex, row }">
          <!-- [ "key", "row", "pageIndex", "__trClass", "cols", "colsMap", 
          "sort", "rowIndex", "color", "dark", "dense", "expand" ] -->
          <q-td>
            {{ rowIndex }}
          </q-td>
          <q-td key="name">
            {{ row.name }}
          </q-td>
          <q-td key="backgroundImage">
            <q-img
              v-if="row.backgroundImage"
              :src="row.backgroundImage"
              height="250"
            ></q-img>
          </q-td>
          <q-td key="desc">
            <div style="max-width: 200px" class="line-1">
              {{ row.desc }}
            </div>
          </q-td>
          <q-td key="configJson">
            <q-btn
              v-if="row.configJson"
              outline
              color="primary"
              label="config.json"
              size="sm"
              @click="onConfigJson(row)"
              no-caps
            ></q-btn>
          </q-td>
          <q-td key="preview">
            <q-btn
              v-if="row.preview"
              flat
              color="primary"
              label="链接"
              :href="row.preview"
              target="_blank"
              no-caps
              size="sm"
            ></q-btn>
          </q-td>
          <!-- <q-td key="githubUrl">
            <q-btn
              v-if="row.githubUrl"
              flat
              color="primary"
              label="Github link"
              :href="row.githubUrl"
              target="_blank"
              no-caps
              size="sm"
            ></q-btn>
          </q-td> -->
          <q-td key="action">
            <q-btn
              color="primary"
              label="编辑"
              size="sm"
              @click="onEdit(row)"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="showConfig">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h5">config.json</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-if="curRow.configJson"
            :model-value="
              JSON.stringify(JSON.parse(curRow.configJson), '', '  ')
            "
            autogrow
            filled
            type="textarea"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showEdit">
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h5">{{ curRow.id ? "编辑记录" : "添加记录" }}</div>
        </q-card-section>
        <q-card-section>
          <edit-con :row="curRow" @done="onEditDone"></edit-con>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      showConfig: false,
      showEdit: false,
      curRow: {},
      cols: [
        {
          label: "#",
          align: "left",
        },
        {
          field: "name",
          label: "名称",
          align: "left",
        },
        {
          field: "backgroundImage",
          label: "封面",
          align: "left",
        },
        {
          field: "desc",
          label: "描述",
          align: "left",
        },
        {
          field: "configJson",
          label: "配置",
          align: "left",
        },
        {
          field: "preview",
          label: "示例链接",
          align: "left",
        },
        // {
        //   field: "githubUrl",
        //   label: "Github地址",
        //   align: "left",
        // },
        {
          field: "action",
          label: "操作",
          align: "left",
        },
      ],
      rows: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onEditDone() {
      this.showEdit = false;
      window.$notify("已更新");
      this.getList();
    },
    onEdit(row) {
      this.curRow = row;
      this.showEdit = true;
    },
    onConfigJson(row) {
      this.curRow = row;
      this.showConfig = true;
    },
    async getList() {
      try {
        this.loading = true;
        const { data } = await this.$http.get("/template/web3/internal/list");
        this.rows = data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>