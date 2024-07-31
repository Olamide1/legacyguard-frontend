<template>
  <div class="emergency-access-container">
    <header class="header">
      <router-link to="/dashboard" class="button is-link">← Back to Dashboard</router-link>
      <h1 class="title">Edit Emergency Access Conditions</h1>
    </header>
    <form @submit.prevent="updateEmergencyAccessConditions" class="box">
      <div v-for="(condition, index) in emergencyAccessConditions" :key="index" class="field is-grouped">
        <div class="control is-expanded">
          <input class="input" v-model="condition.condition" placeholder="e.g., No response for 30 days" required>
        </div>
        <div class="control is-expanded">
          <input class="input" v-model="condition.value" placeholder="e.g., 30 days" required>
        </div>
        <div class="control">
          <button type="button" class="button is-danger" @click="removeEmergencyAccessCondition(index)">Remove</button>
        </div>
      </div>
      <div class="buttons">
        <button type="button" class="button is-primary" @click="addEmergencyAccessCondition">Add Condition</button>
        <button type="submit" class="button is-primary">Save Changes</button>
      </div>
      <p v-if="error" class="has-text-danger">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from '@/utils/axios';

export default {
  data() {
    return {
      emergencyAccessConditions: [{ condition: '', value: '' }],
      error: ''
    };
  },
  async created() {
    await this.fetchEmergencyAccessConditions();
  },
  methods: {
    async fetchEmergencyAccessConditions() {
      try {
        const response = await axios.get('/user/emergency-access-conditions');
        this.emergencyAccessConditions = response.data;
      } catch (error) {
        console.error(error);
        this.error = 'Failed to fetch emergency access conditions';
      }
    },
    addEmergencyAccessCondition() {
      this.emergencyAccessConditions.push({ condition: '', value: '' });
    },
    removeEmergencyAccessCondition(index) {
      this.emergencyAccessConditions.splice(index, 1);
    },
    async updateEmergencyAccessConditions() {
      try {
        await axios.put('/user/emergency-access-conditions', { emergencyAccessConditions: this.emergencyAccessConditions });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
        this.error = 'Failed to update emergency access conditions';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.emergency-access-container {
  font-family: 'Poppins', sans-serif;
  color: #073B4C;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #F0F4F8;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #073B4C;
}

.field {
  margin-bottom: 15px;
}

.label {
  font-weight: 600;
}

.input {
  border: 2px solid #073B4C;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  color: #073B4C;
  background-color: #ffffff;
}

.button.is-primary {
  background-color: #FF6363;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.button.is-primary:hover {
  background-color: #FF4A4A;
}

.button.is-danger {
  background-color: #FF4A4A;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.is-danger:hover {
  background-color: #FF3636;
}

.has-text-danger {
  color: #FF6363;
  font-weight: 600;
}

.box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header .title {
    font-size: 1.5rem;
  }

  .header .button.is-link {
    margin-top: 10px;
  }

  .field {
    flex-direction: column;
  }

  .field.is-grouped {
    flex-direction: column;
    align-items: flex-start;
  }

  .field.is-grouped .control {
    width: 100%;
    margin-bottom: 10px;
  }

  .input {
    padding: 8px;
    font-size: 0.9rem;
  }

  .button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .buttons {
    flex-direction: column;
  }

  .buttons .button {
    margin-top: 10px;
  }
}
</style>
