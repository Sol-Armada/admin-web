<template>
    <div v-for="[rank, events] in getWithStatus()">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1>{{ Capitalize(rank) }}</h1>
                </v-col>
                <v-divider></v-divider>
                <Event v-for="event in events" :event="event" />
            </v-row>
        </v-container>
    </div>
    <v-btn color="primary" size="large" variant="elevated" prepend-icon="mdi-plus" href="/events/new" position="fixed">
        New
    </v-btn>
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventsStore } from '@/store/EventsStore'
import { Capitalize } from '@/utils'
import Event from '@/components/Event'

const eventsStore = useEventsStore()
const { getWithStatus } = storeToRefs(eventsStore)

// onMounted(() => {
//     eventsStore.fetch()
// })
</script>
<style lang="scss" scoped>
.v-btn {
    right: 50px;
    bottom: 40px;
}
</style>
