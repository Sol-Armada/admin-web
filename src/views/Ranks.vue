<template>
    <v-container>
        <v-card>
            <v-card-actions>
                <v-text-field density="compact" variant="solo" label="Filter" append-inner-icon="mdi-magnify" single-line
                    hide-details v-model="filter"></v-text-field>
                    <!-- <v-spacer></v-spacer> -->

                    <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-row class="pt-4 pl-4">
                        <v-col cols="2">
                            <v-switch hide-details inset label="With Issues" v-model="withIssues"></v-switch>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                :items="['all','admirals','commanders','lieutenants','specialists','technicians','members']"
                                v-model="filterRank"
                                label="Filter by Rank"
                                variant="outlined"
                            ></v-select>
                        </v-col>
                    </v-row>
                </div>
            </v-expand-transition>
        </v-card>
    </v-container>
    <v-container v-if="admiralCount > 0 && (filterRank == 'admirals' || filterRank == 'all')">
        <v-row>
            <v-col cols="12">
                <h1>Admiral</h1>
            </v-col>
            <Rank v-for="[_, user] in admirals" :user="user" :increment="usersStore.increment"
                :decrement="usersStore.decrement" :loading="loading" />
        </v-row>
    </v-container>
    <v-container v-if="commanderCount > 0 && (filterRank == 'commanders' || filterRank == 'all')">
        <v-row>
            <v-col cols="12">
                <h1>Commander</h1>
            </v-col>
            <Rank v-for="[_, user] in commanders" :user="user" :increment="usersStore.increment"
                :decrement="usersStore.decrement" :loading="loading" />
        </v-row>
    </v-container>
    <v-container v-if="lieutenantCount > 0 && (filterRank == 'lieutenants' || filterRank == 'all')">
        <v-row>
            <v-col cols="12">
                <h1>Lieutenant</h1>
            </v-col>
            <Rank v-for="[_, user] in lieutenants" :user="user" :increment="usersStore.increment"
                :decrement="usersStore.decrement" :loading="loading" />
        </v-row>
    </v-container>
    <v-container v-if="specialistCount > 0 && (filterRank == 'specialists' || filterRank == 'all')">
        <v-row>
            <v-col cols="12">
                <h1>Specialist</h1>
            </v-col>
            <Rank v-for="[_, user] in specialists" :user="user" :increment="usersStore.increment"
                :decrement="usersStore.decrement" :loading="loading" />
        </v-row>
    </v-container>
    <v-container v-if="technicianCount > 0 && (filterRank == 'technicians' || filterRank == 'all')">
        <v-row>
            <v-col cols="12">
                <h1>Technician</h1>
            </v-col>
            <Rank v-for="[_, user] in technicians" :user="user" :increment="usersStore.increment"
                :decrement="usersStore.decrement" :loading="loading" />
        </v-row>
    </v-container>
    <v-container v-if="memberCount > 0 && (filterRank == 'members' || filterRank == 'all')">
        <v-row>
            <v-col cols="12">
                <h1>Member</h1>
            </v-col>
            <Rank v-for="[_, user] in members" :user="user" :increment="usersStore.increment"
                :decrement="usersStore.decrement" :loading="loading" />
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from "@/store/UsersStore"
import Rank from '@/components/Rank'

const usersStore = useUsersStore()
const { users, loading } = storeToRefs(usersStore)
const withIssues = ref(false)
const filter = ref("")
const filterRank = ref("all")
const show = ref(false)

const admirals = computed(() => Array.from(users.value.get('admiral')).filter(user => filterUser(user[1])))
const admiralCount = computed(() => admirals.value.length)

const commanders = computed(() => Array.from(users.value.get('commander')).filter(user => filterUser(user[1])))
const commanderCount = computed(() => commanders.value.length)

const lieutenants = computed(() => Array.from(users.value.get('lieutenant')).filter(user => filterUser(user[1])))
const lieutenantCount = computed(() => lieutenants.value.length)

const specialists = computed(() => Array.from(users.value.get('specialist')).filter(user => filterUser(user[1])))
const specialistCount = computed(() => specialists.value.length)

const technicians = computed(() => Array.from(users.value.get('technician')).filter(user => filterUser(user[1])))
const technicianCount = computed(() => technicians.value.length)

const members = computed(() => Array.from(users.value.get('member')).filter(user => filterUser(user[1])))
const memberCount = computed(() => members.value.length)

onMounted(() => {
    usersStore.fetch()
})

function filterUser(user) {
    if (withIssues.value) {
        if (user.bad_affiliation) {
            return true
        }

        if (user.rank <= 6 && user.primary_org != "SOLARMADA") {
            return true
        }

        if (!user.rsi_member) {
            return true
        }

        return false
    }

    return user.name.toUpperCase().includes(filter.value.toUpperCase())
}

</script>
