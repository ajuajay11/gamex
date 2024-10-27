<template>
  <form @submit.prevent="registerFunction" class="mt-4">
    <!-- First Name -->
 
    <div class="mb-3">
      <label for="firstname" class="form-label">First Name</label>
      <input
        type="text"
        class="form-control"
        id="firstname"
        v-model="reg.firstname"
        placeholder="Enter your first name"
        required
      />
    </div>
    <!-- Last Name -->
    <div class="mb-3">
      <label for="lastname" class="form-label">Last Name</label>
      <input
        type="text"
        class="form-control"
        id="lastname"
        v-model="reg.lastname"
        placeholder="Enter your last name"
        required
      />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="reg.email"
        placeholder="Enter your email"
        required
      />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="reg.password"
        placeholder="Enter a strong password"
        required
      />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label for="age" class="form-label">Age</label>
      <input
        type="number"
        class="form-control"
        id="age"
        v-model="reg.age"
        placeholder="Enter your age"
        required
      />
    </div>
    <!-- Submit Button -->
    <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary btn-block">Submit</button>
    </div>
  </form>
</template>

<script>
import { register } from "@/service/Service.js";
export default {
  name: "register",
  data() {
    return {
      reg: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        age: "",
      },
    };
  },
  methods: {
    async registerFunction() {
      try {
        const response = await register(this.reg);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
