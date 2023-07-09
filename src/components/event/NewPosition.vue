<template>
    <v-row>
        <v-col cols="2">
            <v-text-field class="centered-input" label="Emoji" variant="outlined"
                :value="emoji.replace_colons(newPosition.emoji)" v-model="newPosition.emoji"
                v-on:focus="hideEmojiPicker = false"></v-text-field>
            <VuemojiPicker dataSource="https://cdn.jsdelivr.net/npm/emoji-picker-element-data@1.3.0/en/github/data.json"
                :isDark="theme.global.name.value == 'dark'" :hidden="hideEmojiPicker" @emojiClick="selectEmoji" :customEmoji="customEmojis" />
        </v-col>
        <v-col cols="4">
            <v-text-field label="Name" variant="outlined" placeholder="Defaults to Sol Armada Logo"
                v-model="newPosition.name"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-text-field label="Max" variant="outlined" v-model="newPosition.max"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-select label="Min Position" variant="outlined" :items="minRankList" item-title="name" item-value="value"
                v-model="newPosition.min_rank"></v-select>
        </v-col>
        <v-col cols="1">
            <v-btn icon="mdi-plus" color="green" variant="outlined" rounded="lg" size="large"
                v-on:click="addPosition"></v-btn>
        </v-col>
    </v-row>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { VuemojiPicker } from 'vuemoji-picker'
import { getEmojis } from '@/api/emojis'
import EmojiConvertor from 'emoji-js'

const emoji = new EmojiConvertor()
emoji.img_sets.apple.path = "/emojis/"
emoji.replace_mode = 'unified'

const theme = useTheme()
const props = defineProps({
    newPosition: Object,
    addPosition: Function,
})

const hideEmojiPicker = ref(true)
const customEmojis = ref([])

const minRankList = [
    { name: 'anyone', value: 99 },
    { name: 'recruit', value: 7 },
    { name: 'member', value: 6 },
    { name: 'technician', value: 5 },
    { name: 'specialist', value: 4 },
    { name: 'lieutenant', value: 3 },
    { name: 'commander', value: 2 },
    { name: 'admiral', value: 1 }
]

function selectEmoji(detail) {
    props.newPosition.emoji = ':' + detail.emoji.shortcodes[0] + ':'
    hideEmojiPicker.value = true
}

onMounted(() => {
    getEmojis().then(e => {
        e.forEach(emoji => {
            customEmojis.value.push(
                { name: emoji.name, url: 'https://cdn.discordapp.com/emojis/' + emoji.id + '.webp?size=44&quality=lossless', shortcodes: [emoji.name] }
            )
        });
    })
})

</script>
<style lang="scss">
.centered-input input {
    text-align: center;
}

.v-select {
    text-transform: capitalize;
}
</style>
