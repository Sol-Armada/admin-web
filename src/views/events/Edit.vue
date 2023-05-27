<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" xl="6">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Event Title*" variant="outlined" v-model="event.name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" sm="12">
                            Start*
                            <VueDatePicker v-model="event.start_time" name="start-date" :dark="theme.global.name.value == 'dark'"
                                required></VueDatePicker>
                        </v-col>
                        <v-col cols="12" lg="6" sm="12">
                            End*
                            <VueDatePicker v-model="event.end_time" name="end-date" :dark="theme.global.name.value == 'dark'"
                                required></VueDatePicker>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="event.description" label="Description*" variant="outlined" required></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="event.cover" label="Cover Image" variant="outlined"
                                placeholder="Defaults to Sol Armada Logo"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <NewPosition :newPosition="newPos" :addPosition="addPosition" />
                        </v-col>
                        <v-col cols="7">
                            <v-list>
                                <Position v-for="position in positions" :id="position.id" :title="position.name"
                                    :minRank="String(position.min_rank)" :max="String(position.max)"
                                    :icon="position.emoji" :deletable="position.deletable"
                                    :onDelete=deletePos />
                            </v-list>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="2" class="d-flex justify-center">
                                    <v-btn color="red" rounded="lg" size="large" variant="outlined"
                                        prepend-icon="mdi-cancel" href="/events">Cancel</v-btn>
                                </v-col>
                                <v-col cols="2" class="d-flex justify-center">
                                    <v-btn rounded="lg" size="large" prepend-icon="mdi-content-save" :onClick="saveEvent">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    preview
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { NumberToWord, Rank, Capitalize } from '@/utils'
import { v4 as uuidv4 } from 'uuid'
import { newEvent, updateEvent } from '@/api/event'
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import EmojiConvertor from 'emoji-js'
import NewPosition from '@/components/event/NewPosition'
import Position from '@/components/event/Position'

const emoji = new EmojiConvertor()
emoji.img_sets.apple.path = "/emojis/"
emoji.replace_mode = 'unified'

const theme = useTheme()
const router = useRouter()
const route = useRoute()

const positions = ref([])
const eventLeadId = uuidv4()
positions.value.push({
    id: eventLeadId,
    min_rank: 'lieutenant',
    max: 1,
    emoji: ':star:',
    order: 0,
    name: 'Event Lead',
    deletable: false
})
const extrasId = uuidv4()
positions.value.push({
    id: extrasId,
    min_rank: 'anyone',
    max: 0,
    emoji: ':calendar:',
    order: 99,
    name: 'Extras',
    deletable: false,
    fill_last: true
})

const positionCounter = ref(1)
const event = ref({})

let newPos = ref(defaultPosition())

onMounted(() => {
    if (route.query.event !== undefined) {
        event.value = JSON.parse(route.query.event)
    }
})

function addPosition() {
    if (newPos.value.name == undefined || newPos.value.name == "") {
        return
    }

    positions.value.push(newPos.value)
    positionCounter.value = positionCounter.value+1
    newPos.value = defaultPosition()
}

function deletePos(id) {
    positions.value = positions.value.filter(position => position.id !== id)
}

function saveEvent() {
    for (let i = 0; i < positions.value.length; i++) {
        positions.value[i].min_rank = Rank[positions.value[i].min_rank]
    }
    event.value.positions = positions.value

    if (event.value.id === undefined) {
        newEvent(event.value).then(() => {
            router.push('/events')
        }).catch((e) => {
            console.error(e)
        })
    } else {
        updateEvent(event.value).then(() => {
            router.push('/events')
        }).catch((e) => {
            console.error(e)
        })
    }
}

function defaultPosition() {
    return {
        id: uuidv4(),
        min_rank: 'anyone',
        max: 1,
        emoji: ':' + NumberToWord(positionCounter.value) + ':',
        order: positionCounter.value,
        name: Capitalize(NumberToWord(positionCounter.value)),
        deletable: true
    }
}
</script>
