<template>
  <div class="onboarding-container">
    <header class="header">
      <h1 class="title">Complete Your Onboarding</h1>
    </header>
    <div class="tabs is-boxed">
      <ul>
        <li :class="{ 'is-active': activeTab === 'trustedContacts' }">
          <a @click="activeTab = 'trustedContacts'">Trusted Contacts</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'emergencyAccessConditions' }">
          <a @click="activeTab = 'emergencyAccessConditions'">Emergency Access Conditions</a>
        </li>
      </ul>
    </div>
    <form @submit.prevent="completeOnboarding" class="box">
      <div v-if="activeTab === 'trustedContacts'">
        <div class="section">
          <h2 class="title is-4">Trusted Contacts</h2>
          <p>Trusted contacts are individuals who can be contacted in case of an emergency or if you are unreachable. Examples include close family members, trusted friends, or legal representatives.</p>
          <div v-for="(contact, index) in trustedContacts" :key="index" class="field is-grouped is-grouped-multiline">
            <div class="control is-expanded">
              <label class="label">Name</label>
              <input class="input" v-model="contact.name" placeholder="e.g., John Doe" required>
            </div>
            <div class="control is-expanded">
              <label class="label">Email</label>
              <input class="input" v-model="contact.email" placeholder="e.g., johndoe@example.com" required>
            </div>
            <div class="control is-expanded">
              <label class="label">Relationship</label>
              <input class="input" v-model="contact.relationship" placeholder="e.g., Brother" required>
            </div>
            <div class="control is-expanded">
              <label class="label">Phone Number</label>
              <input class="input" v-model="contact.phoneNumber" placeholder="e.g., 123-456-7890">
            </div>
            <div class="control">
              <button type="button" class="button is-danger" @click="removeTrustedContact(index)">Remove</button>
            </div>
          </div>
          <button type="button" class="button is-primary" @click="addTrustedContact">Add Trusted Contact</button>
        </div>
      </div>
      <div v-if="activeTab === 'emergencyAccessConditions'">
        <div class="section">
          <h2 class="title is-4">Emergency Access Conditions</h2>
          <p>Emergency access conditions define the circumstances under which your trusted contacts can request access to your digital assets. Examples include:</p>
          <ul>
            <li><strong>No Response Period</strong>: If you haven't responded for a specified number of days.</li>
            <li><strong>Multiple Confirmations</strong>: Requires confirmation from multiple trusted contacts.</li>
            <li><strong>Specific Event Triggers</strong>: Access can be requested if a legal document or medical certificate is provided.</li>
            <li><strong>Combination Conditions</strong>: Combines multiple conditions for robust verification.</li>
          </ul>
          <div v-for="(condition, index) in emergencyAccessConditions" :key="index" class="field is-grouped is-grouped-multiline">
            <div class="control is-expanded">
              <label class="label">Condition</label>
              <input class="input" v-model="condition.condition" placeholder="e.g., No response for 30 days" required>
            </div>
            <div class="control is-expanded">
              <label class="label">Value</label>
              <input class="input" v-model="condition.value" placeholder="e.g., 30 days" required>
            </div>
            <div class="control">
              <button type="button" class="button is-danger" @click="removeEmergencyAccessCondition(index)">Remove</button>
            </div>
          </div>
          <button type="button" class="button is-primary" @click="addEmergencyAccessCondition">Add Condition</button>
        </div>
      </div>
      <div class="buttons">
        <button type="submit" class="button is-primary">Complete Onboarding</button>
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
      activeTab: 'trustedContacts',
      trustedContacts: [{ name: '', email: '', relationship: '', phoneNumber: '' }],
      emergencyAccessConditions: [{ condition: '', value: '' }],
      error: ''
    };
  },
  methods: {
    addTrustedContact() {
      this.trustedContacts.push({ name: '', email: '', relationship: '', phoneNumber: '' });
    },
    removeTrustedContact(index) {
      this.trustedContacts.splice(index, 1);
    },
    addEmergencyAccessCondition() {
      this.emergencyAccessConditions.push({ condition: '', value: '' });
    },
    removeEmergencyAccessCondition(index) {
      this.emergencyAccessConditions.splice(index, 1);
    },
    async completeOnboarding() {
      try {
        await axios.put('/user/trusted-contacts', { trustedContacts: this.trustedContacts });
        await axios.put('/user/emergency-access-conditions', { emergencyAccessConditions: this.emergencyAccessConditions });
        this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.response.data.msg || 'An error occurred. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.onboarding-container {
  font-family: 'Poppins', sans-serif;
  color: #073B4C;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #F0F4F8;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #073B4C;
  margin-bottom: 20px;
}

.tabs {
  margin-bottom: 20px;
}

.tabs ul {
  border-bottom: 2px solid #073B4C;
}

.tabs li.is-active a {
  border-color: #073B4C;
  color: #ffffff;
  background-color: #073B4C;
}

.tabs a {
  border: 2px solid transparent;
  border-bottom: none;
  color: #073B4C;
  background-color: #F0F4F8;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tabs a:hover {
  background-color: #E5E5E5;
}

.box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.field.is-grouped-multiline .control {
  flex: 1 1 100%;
  margin-bottom: 15px;
}

@media (min-width: 768px) {
  .field.is-grouped-multiline .control {
    flex: 1 1 48%;
    margin-right: 2%;
  }
}

.input {
  border: 2px solid #073B4C;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  color: #073B4C;
  background-color: #ffffff;
}

::placeholder {
  color: #073B4C;
  opacity: 0.7;
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

.button.is-link {
  background-color: #FFD166;
  color: #073B4C;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.is-link:hover {
  background-color: #FFC04A;
}

.buttons {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}

.buttons .button {
  margin-right: 10px;
}

.has-text-danger {
  color: #FF6363;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .title {
    font-size: 1.5rem;
  }

  .tabs ul {
    display: flex;
    flex-direction: column;
  }

  .tabs a {
    margin-bottom: 10px;
    padding: 10px;
    text-align: center;
  }

  .field.is-grouped-multiline .control {
    width: 100%;
    margin-right: 0;
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
    margin-right: 0;
  }
}
</style>
