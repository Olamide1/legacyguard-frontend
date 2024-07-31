<template>
    <div class="assets-container">
      <header class="header">
        <router-link to="/dashboard" class="button is-link">← Back to Dashboard</router-link>
        <h1 class="title">Manage Your Digital Assets</h1>
      </header>
      <form @submit.prevent="addOrUpdateAsset" class="box">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <label class="label">Asset Name</label>
            <input class="input" type="text" v-model="name" placeholder="e.g., Bitcoin" required>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <label class="label">Asset Type</label>
            <input class="input" type="text" v-model="type" placeholder="e.g., Cryptocurrency" required>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <label class="label">Description</label>
            <input class="input" type="text" v-model="description" placeholder="e.g., My crypto wallet, username is farm, password is xxxx...">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <label class="label">Value</label>
            <input class="input" type="number" v-model="value" placeholder="e.g., 5000">
          </div>
        </div>
        <div class="buttons">
          <button class="button is-primary" type="submit">{{ editMode ? 'Update' : 'Add' }} Asset</button>
        </div>
        <p v-if="error" class="has-text-danger">{{ error }}</p>
      </form>
      <hr>
      <div v-if="assets.length" class="assets-list">
        <h2 class="subtitle">💼 Your Assets</h2>
        <ul>
          <li v-for="asset in assets" :key="asset._id" class="asset-item box">
            <div class="asset-info">
              <strong>{{ asset.name }}</strong> ({{ asset.type }}) - {{ asset.value }}
              <p>{{ asset.description }}</p>
            </div>
            <div class="buttons">
              <button @click="editAsset(asset)" class="button is-info">Edit</button>
              <button @click="deleteAsset(asset._id)" class="button is-danger">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/utils/axios'
  
  export default {
    name: 'DigitalAssets',
    data() {
      return {
        name: '',
        type: '',
        description: '',
        value: '',
        assets: [],
        editMode: false,
        assetId: null,
        error: ''
      }
    },
    async created() {
      await this.fetchAssets();
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
      async addOrUpdateAsset() {
        try {
          if (this.editMode) {
            await axios.put(`/assets/${this.assetId}`, {
              name: this.name,
              type: this.type,
              description: this.description,
              value: this.value,
            });
          } else {
            const response = await axios.post('/assets', {
              name: this.name,
              type: this.type,
              description: this.description,
              value: this.value
            });
            this.assets.push(response.data);
          }
          this.resetForm();
          await this.fetchAssets();
        } catch (error) {
          this.error = error.response.data.msg || 'An error occurred. Please try again.';
        }
      },
      editAsset(asset) {
        this.name = asset.name;
        this.type = asset.type;
        this.description = asset.description;
        this.value = asset.value;
        this.assetId = asset._id;
        this.editMode = true;
      },
      async deleteAsset(id) {
        try {
          await axios.delete(`/assets/${id}`);
          this.assets = this.assets.filter(asset => asset._id !== id);
        } catch (error) {
          console.error(error);
        }
      },
      resetForm() {
        this.name = '';
        this.type = '';
        this.description = '';
        this.value = '';
        this.editMode = false;
        this.assetId = null;
        this.error = '';
      }
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  
  .assets-container {
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
  
  .asset-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .asset-info {
    max-width: 70%;
    color: #073B4C;
  }
  
  .buttons {
    display: flex;
  }
  
  .router-link {
    display: inline-block;
    margin-top: 20px;
    background: none;
    border: none;
    color: #073B4C;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .router-link:hover {
    color: #05668D;
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
  
    .asset-item {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .buttons {
      margin-top: 10px;
    }
  
    .button.is-info,
    .button.is-danger {
      margin-left: 0;
      margin-right: 10px;
    }
  }
  </style>
  