<template>
    <v-list-item
        :key="title"
        :title="title"
        :subtitle="'Minimum Rank: ' + minRank + ' | Max Steats: ' + (max != 0 ? max : 'Unlimited')"
    >
        <template v-slot:prepend>
            <v-avatar>
                {{emoji.replace_colons(icon)}}
            </v-avatar>
        </template>
        <template v-slot:append v-if="deletable">
            <v-btn
                color="red"
                icon="mdi-trash-can"
                variant="outlined"
                rounded="lg"
                size="small"
                v-on:click="onDelete(id)"
            ></v-btn>
        </template>
    </v-list-item>
</template>
<script setup>
import EmojiConvertor from 'emoji-js'

const emoji = new EmojiConvertor()
emoji.img_sets.apple.path = "/emojis/"
emoji.replace_mode = 'unified'

const props = defineProps({
    id: String,
    icon: String,
    title: String,
    subtitle: String,
    minRank: String,
    max: String,
    deletable: Boolean,
    onDelete: Function,
})
</script>
<style lang="scss">
emoji-picker {
    --background: $primary;
}
</style>
