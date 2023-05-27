<template>
    <v-col cols="3">
        <v-card class="mx-auto" max-width="344">
            <v-img :src="event.cover" height="200px" cover></v-img>

            <v-card-title>
                {{ event.name }}
            </v-card-title>

            <v-card-subtitle>
                {{ ToDatetimeWindow(props.event.start_time, props.event.end_time) }}
            </v-card-subtitle>

            <v-card-actions>
                <v-btn v-if="event.status < 5" color="primary" variant="text" prepend-icon="mdi-square-edit-outline"
                    :href="'/events/edit?event='+ JSON.stringify(event)">edit</v-btn>
                <ConfirmDelete v-if="event.status < 5" :id="event.id" :onConfirm="confirmed" />

                <v-spacer></v-spacer>

                <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                        {{ event.description }}
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-col>
</template>
<script setup>
import { ref } from 'vue'
import { useEventsStore } from '@/store/EventsStore'
import { ToDatetimeWindow } from '@/utils'
import ConfirmDelete from '@/components/ConfirmDelete'

const props = defineProps({
    event: Object,
})

const useEvents = useEventsStore()
const eventRef = ref(props.event)

const show = ref(false)

function confirmed() {
    useEvents.delete(eventRef.value.id)
}
</script>
