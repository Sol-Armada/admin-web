<template>
  <v-container class="fill-height">
    <v-row v-if="!hasCode">
      <v-col>
        <h1>Sol Armada Administration Portal</h1>
        <v-btn
        :href="`${discordAuthUrl}`"
        prepend-icon="fab fa-discord"
        >Login with Discord</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-progress-circular
        :size="90"
        :width="9"
        indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/UserStore";

const discordAuthUrl = ref(import.meta.env.VITE_DISCORD_AUTH_URL);
const route = useRoute();
const router = useRouter();
const code = ref(route.query.code);
const userStore = useUserStore();

var hasCode = ref(false);

onMounted(() => {
  if (code.value != undefined) {
    hasCode.value = true;
    userStore.login(code.value)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        const url = new URL(window.location.href);
        console.error(err);
        url.search = "";
        window.history.replaceState(null, null, url);
        hasCode.value = false;
      });
  }
});
</script>
