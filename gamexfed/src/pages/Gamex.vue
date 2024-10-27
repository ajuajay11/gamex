<template>
    <div v-for="(participants, index) in participants" :key="index">
        {{ participants }}
    </div>
</template>

<script>
    export default {
        name:'gamex',
        data(){
            return{
                participants: [
            [
                {
                    "id": "671bed3f8c9c3497af54a65a",
                    "name": null,
                    "email": "jdsqw@gmail.com",
                    "wallet": 0
                },
                {
                    "id": "671bf08f294a37f1a652b353",
                    "name": null,
                    "email": "jdsqws@gmail.com",
                    "wallet": 0
                }
            ],
            [
                {
                    "id": "671bf0af294a37f1a652b35b",
                    "name": null,
                    "email": "jdsqwsd@gmail.com",
                    "wallet": 0
                }
            ]
        ],
            }
        },
        methods:{
            startGame(){
                
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>