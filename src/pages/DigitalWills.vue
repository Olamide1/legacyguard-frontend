<template>
  <div class="will-container">
    <header class="header">
      <router-link to="/dashboard" class="button is-link">← Back to Dashboard</router-link>
      <h1 class="title">Manage Your Digital Asset Will</h1>
    </header>
    <form @submit.prevent="addOrUpdateWill" class="box">
      <fieldset>
        <legend class="label">Assets</legend>
        <div class="control" v-if="assets.length > 0">
          <div v-for="asset in assets" :key="asset._id" class="checkbox-wrapper">
            <label class="checkbox">
              <input type="checkbox" :value="asset._id" v-model="selectedAssets">
              {{ asset.name }} ({{ asset.type }})
            </label>
          </div>
        </div>
        <div class="control" v-else>
          <p>No assets available. Please <router-link to="/assets">add an asset</router-link> to create a will.</p>
        </div>
      </fieldset>

      <hr>

      <fieldset v-if="assets.length > 0">
        <legend class="label">Beneficiaries</legend>
        <div v-for="(beneficiary, index) in beneficiaries" :key="index" class="field is-grouped">
          <div class="control is-expanded">
            <input class="input" type="text" v-model="beneficiary.name" placeholder="e.g., John Doe" required>
            <p class="help is-danger" v-if="!beneficiary.name">Name is required.</p>
          </div>
          <div class="control is-expanded">
            <input class="input" type="text" v-model="beneficiary.relationship" placeholder="e.g., Brother" required>
            <p class="help is-danger" v-if="!beneficiary.relationship">Relationship is required.</p>
          </div>
          <div class="control is-expanded">
            <input class="input" type="number" v-model="beneficiary.percentage" placeholder="e.g., 50" required>
            <p class="help is-danger" v-if="!beneficiary.percentage">Percentage is required.</p>
          </div>
          <div class="control">
            <button type="button" class="button is-danger is-light" @click="removeBeneficiary(index)">Remove</button>
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="button is-primary" @click="addBeneficiary">Add Beneficiary</button>
        </div>
      </fieldset>

      <div class="control" v-if="assets.length > 0">
        <button class="button is-primary" type="submit">{{ editMode ? 'Update' : 'Create' }} Will</button>
      </div>
      <p v-if="error" class="has-text-danger">{{ error }}</p>
    </form>

    <hr>

    <div v-if="wills.length" class="wills-list">
      <h2 class="subtitle">📜 Your Wills</h2>
      <ul>
        <li v-for="will in wills" :key="will._id" class="will-item box">
          <h3 class="subtitle is-6">Will Created on {{ new Date(will.createdAt).toLocaleDateString() }}</h3>
          <p><strong>Assets:</strong></p>
          <ul>
            <li v-for="asset in will.assets" :key="asset._id">{{ asset.name }} ({{ asset.type }})</li>
          </ul>
          <p><strong>Beneficiaries:</strong></p>
          <ul>
            <li v-for="beneficiary in will.beneficiaries" :key="beneficiary.name">{{ beneficiary.name }} - {{ beneficiary.relationship }} - {{ beneficiary.percentage }}%</li>
          </ul>
          <div class="buttons">
            <button @click="editWill(will)" class="button is-info">Edit</button>
            <button @click="deleteWill(will._id)" class="button is-danger is-light">Delete</button>
            <button @click="showVersions(will)" class="button is-secondary is-light">Show Versions</button>
          </div>
        </li>
      </ul>
    </div>

    <hr>

    <div v-if="selectedWill">
      <h2 class="subtitle">📜 Previous Versions of Will Created on {{ new Date(selectedWill.createdAt).toLocaleDateString() }}</h2>
      <ul>
        <li v-for="version in willVersions" :key="version._id" class="will-version box">
          <h3 class="subtitle is-6">Version {{ version.version }} - Created on {{ new Date(version.createdAt).toLocaleDateString() }}</h3>
          <p><strong>Assets:</strong></p>
          <ul>
            <li v-for="asset in version.assets" :key="asset._id">{{ asset.name }} ({{ asset.type }})</li>
          </ul>
          <p><strong>Beneficiaries:</strong></p>
          <ul>
            <li v-for="beneficiary in version.beneficiaries" :key="beneficiary.name">{{ beneficiary.name }} - {{ beneficiary.relationship }} - {{ beneficiary.percentage }}%</li>
          </ul>
          <button @click="revertToVersion(version._id)" class="button is-warning">Revert to this version</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'

export default {
  name: 'DigitalWills',
  data() {
    return {
      assets: [],
      selectedAssets: [],
      beneficiaries: [{ name: '', relationship: '', percentage: 0 }],
      wills: [],
      willVersions: [],
      selectedWill: null,
      editMode: false,
      willId: null,
      error: ''
    }
  },
  computed: {
    isFormValid() {
      return this.selectedAssets.length > 0 && this.beneficiaries.every(b => b.name && b.relationship && b.percentage > 0);
    }
  },
  async created() {
    await this.fetchAssets();
    await this.fetchWills();
  },
  methods: {
    async fetchAssets() {
      try {
        const response = await axios.get('/assets');
        this.assets = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchWills() {
      try {
        const response = await axios.get('/wills');
        this.wills = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchWillVersions(willId) {
      try {
        const response = await axios.get(`/wills/${willId}/versions`);
        this.willVersions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    addBeneficiary() {
      this.beneficiaries.push({ name: '', relationship: '', percentage: 0 });
    },
    removeBeneficiary(index) {
      this.beneficiaries.splice(index, 1);
    },
    async addOrUpdateWill() {
      if (!this.isFormValid) {
        this.error = 'Please ensure all fields are filled correctly.';
        return;
      }
      try {
        if (this.editMode) {
          await axios.put(`/wills/${this.willId}`, {
            assets: this.selectedAssets,
            beneficiaries: this.beneficiaries,
          });
        } else {
          const response = await axios.post('/wills', {
            assets: this.selectedAssets,
            beneficiaries: this.beneficiaries,
          });
          this.wills.push(response.data);
        }
        this.resetForm();
        await this.fetchWills();
      } catch (error) {
        this.error = error.response.data.msg || 'An error occurred. Please try again.';
      }
    },
    editWill(will) {
      this.selectedAssets = will.assets.map(asset => asset._id);
      this.beneficiaries = will.beneficiaries;
      this.willId = will._id;
      this.editMode = true;
      this.selectedWill = will;
      this.fetchWillVersions(will._id);
    },
    async deleteWill(id) {
      try {
        await axios.delete(`/wills/${id}`);
        this.wills = this.wills.filter(will => will._id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async revertToVersion(versionId) {
      try {
        if (!this.willId) {
          throw new Error('Will ID is not set');
        }
        const response = await axios.post(`/wills/${this.willId}/versions/${versionId}/revert`);
        console.log('Response:', response); // Log the response for debugging

        if (response && response.data) {
          this.selectedWill = response.data;
          this.fetchWillVersions(this.willId);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error(error); // Log the actual error for debugging
        this.error = error.response?.data?.msg || error.message || 'An error occurred. Please try again.';
      }
    },
    resetForm() {
      this.selectedAssets = [];
      this.beneficiaries = [{ name: '', relationship: '', percentage: 0 }];
      this.editMode = false;
      this.willId = null;
      this.error = '';
      this.selectedWill = null;
      this.willVersions = [];
    },
    showVersions(will) {
      this.selectedWill = will;
      this.willId = will._id;
      this.fetchWillVersions(will._id);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.will-container {
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

.subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #073B4C;
  margin-bottom: 15px;
}

.field {
  margin-bottom: 15px;
}

.label {
  font-weight: 600;
  color: #073B4C;
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

.checkbox-wrapper {
  margin-bottom: 10px;
  color: #073B4C;
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

.button.is-info {
  background-color: #06D6A0;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.button.is-info:hover {
  background-color: #04C58E;
}

.button.is-danger {
  background-color: #FF4A4A;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.button.is-danger:hover {
  background-color: #FF3636;
}

.button.is-secondary {
  background-color: #FFD166;
  color: #073B4C;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.button.is-secondary:hover {
  background-color: #FFC04A;
}

.wills-list,
.will-versions {
  list-style: none;
  padding: 0;
}

.will-item,
.will-version {
  background: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  margin-top: 10px;
}

.help.is-danger {
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

  .will-item,
  .will-version {
    flex-direction: column;
    align-items: flex-start;
  }

  .buttons {
    flex-direction: column;
  }

  .button.is-info,
  .button.is-danger,
  .button.is-secondary {
    margin-left: 0;
    margin-right: 10px;
    margin-top: 10px;
  }
}
</style>
