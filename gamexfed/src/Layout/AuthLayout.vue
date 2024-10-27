<template>
    <div class="d-flex gap-5">
        <router-link :to="{name:'Register'}">register</router-link>
        <router-link :to="{name:'Login'}">Login</router-link>
    </div>
    <div>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    export default {
        name:'authlayout'
    }
</script>

<style lang="scss" scoped>

</style>