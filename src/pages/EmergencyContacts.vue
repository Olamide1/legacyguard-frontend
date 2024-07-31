<template>
    <div>
      <h1>Manage Emergency Contacts</h1>
      <form @submit.prevent="addContact">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="name" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Phone Number</label>
          <div class="control">
            <input class="input" type="text" v-model="phoneNumber" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Relationship</label>
          <div class="control">
            <input class="input" type="text" v-model="relationship" required>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary" type="submit">Add Contact</button>
        </div>
      </form>
      <hr>
      <div v-if="contacts.length">
        <h2>Your Emergency Contacts</h2>
        <ul>
          <li v-for="contact in contacts" :key="contact._id">
            {{ contact.name }} ({{ contact.relationship }}) - {{ contact.phoneNumber }}
            <button @click="deleteContact(contact._id)" class="button is-danger">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/utils/axios'
  
  export default {
    name: 'EmergencyContacts',
    data() {
      return {
        name: '',
        phoneNumber: '',
        relationship: '',
        contacts: [],
        error: ''
      }
    },
    async created() {
      await this.fetchContacts();
    },
    methods: {
      async fetchContacts() {
        try {
          const response = await axios.get('/emergency-contacts');
          this.contacts = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async addContact() {
        try {
          const response = await axios.post('/emergency-contacts', {
            name: this.name,
            phoneNumber: this.phoneNumber,
            relationship: this.relationship,
          });
          this.contacts.push(response.data);
          this.resetForm();
        } catch (error) {
          this.error = error.response.data.msg || 'An error occurred. Please try again.';
        }
      },
      async deleteContact(id) {
        try {
          await axios.delete(`/emergency-contacts/${id}`);
          this.contacts = this.contacts.filter(contact => contact._id !== id);
        } catch (error) {
          console.error(error);
        }
      },
      resetForm() {
        this.name = '';
        this.phoneNumber = '';
        this.relationship = '';
        this.error = '';
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  