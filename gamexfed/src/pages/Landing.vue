<template>
  <!-- header -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="@/assets/images/gamex.png" alt="gamex" class="w-25 uimg-fluid"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Gamex' }"> Gamex </router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-success">Play Games</button>
          </li>
          <li class="nav-item ms-3">
            <button class="btn btn-success">Create Games</button>
          </li>
        </ul>
        <router-link :to="{ name: 'Login' }" v-if="!$store.state.isAuth"> Login </router-link>
        <router-link :to="{ name: 'Dashboard' }" v-else> Profile </router-link>
      </div>
    </div>
  </nav>
  <!-- header -->

  <div class="container">
    <div class="row">
      <div class="create-match col-12">
        <h1>Create Match</h1>
        <p>Select a slot for the entry fee and prize pool:</p>

        <div class="slots">
          <div v-for="(slot, index) in slots" :key="index" class="slot-card" :class="{ active: selectedSlot === slot }"
            @click="selectSlot(slot)">
            <h2>{{ slot.label }}</h2>
            <p>Entry Fee: {{ slot.entryFee }} Rs</p>
            <p>Prize Pool: {{ slot.prizePool }} Rs</p>
          </div>
        </div>

        <button @click="createMatchFunction" class="btn btn-primary" :disabled="!selectedSlot">
          Create Match
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createMatch } from "@/service/Service.js";

export default {
  data() {
    return {
      // Predefined slots for match creation
      slots: [
        { title: '500 Rs Slot', entryFee: 500, prizePool: 5000, matchtime:30, playerFixturesCount:8 },
        { title: '1000 Rs Slot', entryFee: 1000, prizePool: 10000, matchtime:30, playerFixturesCount:8 },
        { title: '2000 Rs Slot', entryFee: 2000, prizePool: 20000, matchtime:30, playerFixturesCount:8 },
        { title: '10000 Rs Slot', entryFee: 10000, prizePool: 100000, matchtime:30, playerFixturesCount:8 }
      ],
      selectedSlot: null
    };
  },
  methods: {
    // Select a slot
    selectSlot(slot) {
      this.selectedSlot = slot;
    },
    // Create a match using the selected slot
    async createMatchFunction() {
      try {
        const response = await createMatch(this.selectedSlot);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style scoped>
.slots {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.slot-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  width: 150px;
  cursor: pointer;
  transition: all 0.3s;
}

.slot-card.active {
  border-color: #007bff;
  background-color: #e7f1ff;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
