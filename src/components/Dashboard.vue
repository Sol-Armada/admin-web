<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>rank counts</h1>
            </v-col>
            <v-divider></v-divider>
            <RankCount rank="admiral" :count="admiralCount" />
            <RankCount rank="commander" :count="commanderCount" />
            <RankCount rank="lieutenant" :count="lieutenantCount" />
            <RankCount rank="specialist" :count="specialistCount" />
            <RankCount rank="technician" :count="technicianCount" />
            <RankCount rank="member" :count="memberCount" />
            <RankCount rank="recruit" :count="recruitCount" />

            <v-col cols="12">
                <h1>bank</h1>
            </v-col>
            <v-divider></v-divider>
            <v-col lg="3">
                <v-card class="justify-center align-center text-center">
                    <v-card-item title="aUEC"></v-card-item>

                    <v-card-item class="pt-0 pb-0"><v-divider></v-divider></v-card-item>

                    <v-card-text class="py-0">
                        <v-row align="center" class="pa-2 justify-center align-center">
                            <v-col class="text-h4">{{ balance.toLocaleString() }}</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import { storeToRefs } from 'pinia';
import RankCount from '@/components/dashboard/RankCount'
import { useUsersStore } from "@/store/UsersStore"
import { useBankStore } from '@/store/BankStore'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

const bankStore = useBankStore()
const { balance } = storeToRefs(bankStore)

const admiralCount = computed(() => users.value.get('admiral').size)
const commanderCount = computed(() => users.value.get('commander').size)
const lieutenantCount = computed(() => users.value.get('lieutenant').size)
const specialistCount = computed(() => users.value.get('specialist').size)
const technicianCount = computed(() => users.value.get('technician').size)
const memberCount = computed(() => users.value.get('member').size)
const recruitCount = computed(() => users.value.get('recruit').size)

onBeforeMount(() => {
    try {
        usersStore.fetch()
        bankStore.fetch()
    } catch (error) {
        if (error == "unauthorized") {
            
        }
    }
})
</script>

<style lang="scss" scoped>
h1 {
    text-transform: capitalize;
}
</style>
