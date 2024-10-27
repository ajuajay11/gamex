<template>
    <form @submit.prevent="loginFunction" class="mt-4">
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="log.email" placeholder="Enter your email" required />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="log.password" placeholder="Enter a strong password" required />
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
        </div>
    </form>
</template>

<script>
import { login } from "@/service/Service.js";
export default {
    name: "login",
    data() {
        return {
            log: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async loginFunction() {
            try {
                const response = await login(this.log);
                console.log(response);
                this.$router.push({ name: 'Landing' });
                this.$store.commit('SET_USER', response); // 'setUserData' is the mutation, and response.data is the payload
                this.$store.commit('isAuthenticated', true); // 'setUserData' is the mutation, and response.data is the payload
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped></style>