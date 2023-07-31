<style lang="scss">
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>

<template>
  <div v-if="info.loaded">
    <main>
      <div class="al-c">
        <img :src="info.logo" height="45" />
        <div class="q-ml-md q-mr-auto">
          <p class="fz-18">{{ info.title }}</p>
          <p class="gray q-mt-sm fz-14">{{ info.bio }}</p>
        </div>
        <a href="https://opensea.io/" target="_blank">Opensea</a>
      </div>
    </main>
    <div>
      <q-carousel animated v-model="slide" arrows infinite height="300px">
        <q-carousel-slide
          v-for="(img, i) in banners"
          :key="i"
          :name="i"
          :img-src="img"
        />
      </q-carousel>
    </div>
  </div>
  <main>
    <div class="fz-22 q-mb-sm q-mt-md">Watchlist</div>
    <q-table
      :rows="rows"
      :columns="cols"
      :loading="loading"
      hide-pagination
      flat
      :pagination="{
        rowsPerPage: 50,
      }"
    >
      <template #body="{ rowIndex, row }">
        <q-tr
          @click="onRow(row)"
          style="cursor: pointer"
          :props="{ rowIndex, row }"
        >
          <q-td key="idx">
            {{ rowIndex + 1 }}
          </q-td>
          <q-td key="name">
            <div class="al-c">
              <img :src="row.logo" width="50" class="bdrs-5" />
              <b class="q-ml-md">{{ row.name }}</b>
            </div>
          </q-td>
          <q-td key="volume">
            {{ row.volume }}
          </q-td>
          <q-td key="floorPrice">
            {{ row.floorPrice }}
          </q-td>
          <q-td key="sales">
            {{ row.sales }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </main>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      slide: 0,
      info: {
        logo: "img/logo.png",
        title: "NFT Watchlist",
        bio: "News about NFT",
      },
      banners: [],
      loading: true,
      cols: [
        {
          label: "#",
          align: "left",
          field: "idx",
        },
        {
          field: "name",
          label: "Collection",
          align: "left",
        },
        {
          field: "floorPrice",
          label: "Floor Price",
          align: "left",
        },
        {
          field: "volume",
          label: "Volume",
          align: "left",
        },

        // {
        //   field: "sales",
        //   label: "Sales",
        //   align: "left",
        // },
      ],
      rows: [],
    };
  },
  async created() {
    await this.getConfig();
    this.getList();
  },
  methods: {
    async getConfig() {
      try {
        const {
          data: { config },
        } = await Axios.get("./config.json");
        const info = {
          loaded: true,
        };
        for (const row of config) {
          const arr = row.options;
          for (const row of arr) {
            info[row.key] = row.value || this.info[row.key];
          }
        }
        console.log(info);
        this.info = info;
        this.banners = [info.img1, info.img2, info.img3].filter((it) => !!it);
        if (!this.banners.length) {
          this.banners = [
            "https://i.seadn.io/gcs/files/2ddc464022b28dca800c9d2e2a2ec66c.jpg?auto=format&dpr=1&w=3840",
            "https://i.seadn.io/gae/5NSHdkrKD7QXEEb3cjbAezMAaKYxaPOAY6cB0w-ze5xM6CgYTms6tZrlTzEfVCfoS4-FGN1X6cYGD9Fe7sJZ1OGAp2yjEYecBWjB_g?auto=format&dpr=1&w=1920",
          ];
        }
        document.title = info.title;
      } catch (error) {
        console.log(error);
      }
    },
    async getList() {
      try {
        this.loading = true;
        const { data } = await Axios.get(
          "https://4ever-web.4everland.store/nft/watch-list.json?t=" +
            Date.now()
        );
        this.rows = data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    onRow(it) {
      window.open(it.link);
    },
  },
};
</script>