<template lang="pug">
    section
        .section-caption(v-if='this.dateStart')
            | Запишитесь сейчас 
            .highlight cтарт {{ this.dateStart }}
        .section-caption(v-else)
            | Запишитесь сейчас 

        entry-form(formType="online")
</template>

<script>
    export default {
        name: 'CaptionSection',
        components: {
            EntryForm: () => import('@/components/entry-form.vue'),
        },
        props: {
            dateStart: {
                type: String,
                default: null
            },
        },
        data () {
            return {
               
            }
        }
    }
</script>
