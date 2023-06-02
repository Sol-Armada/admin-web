<template>
  <v-app>
      <v-layout>
        <v-navigation-drawer v-model="mini" style="position: fixed;">
          <v-list>
            <v-list-item
              :prepend-avatar="'https:\/\/cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png'"
              :title=user.name
              :subtitle=GetRankName(user.rank)
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-chevron-triple-up" title="Ranks" value="ranks" to="/ranks"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar" title="Events" value="events" to="/events"></v-list-item>
          </v-list>

          <template v-slot:append>
            <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-light-switch" title="Light" value="light" v-if="theme.global.current.value.dark" v-on:click="lightSwitch"></v-list-item>
              <v-list-item prepend-icon="mdi-light-switch-off" title="Dark" value="dark" v-else v-on:click="lightSwitch"></v-list-item>
              <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" v-on:click="userStore.logout"></v-list-item>
            </v-list>
          </template>
        </v-navigation-drawer>

        <v-app-bar v-if="mdAndDown">
          <template v-slot:prepend>
            <v-app-bar-nav-icon icon="mdi-menu" v-on:click="mini = !mini"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>Title</v-app-bar-title>
        </v-app-bar>

        <v-main style="min-height: 100vh">
          <router-view />
        </v-main>
      </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/UserStore'
import { GetRankName } from '@/utils'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { mdAndDown } = useDisplay()
const mini = ref(false)
if (!mdAndDown.value) {
  mini.value = true
}
const theme = useTheme()

theme.global.name.value = localStorage.getItem("theme") || 'dark'

function lightSwitch() {
  if (theme.global.current.value.dark) {
      theme.global.name.value = 'light'
  } else {
      theme.global.name.value = 'dark'
  }
  
  localStorage.setItem("theme", theme.global.name.value)
}
</script>

<!-- <style lang="scss">
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style> -->
