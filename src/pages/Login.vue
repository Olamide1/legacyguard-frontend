<template>
    <div class="auth-container">
      <div class="auth-box">
        <h1>🔐 Login to Your Account</h1>
        <form @submit.prevent="login">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" v-model="email" placeholder="e.g., john@example.com" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" v-model="password" placeholder="••••••••" required>
            </div>
          </div>
          <div class="control">
            <button class="button is-primary" type="submit">Login</button>
          </div>
          <p v-if="error" class="has-text-danger">{{ error }}</p>
        </form>
        <p class="mt-3">Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/utils/axios'
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/auth/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('fullName', response.data.fullName);
  
          const onboardingComplete = await axios.get('/user/onboarding-complete', {
            headers: {
              Authorization: `Bearer ${response.data.token}`
            }
          });
          if (!onboardingComplete.data.onboardingComplete) {
            this.$router.push('/onboarding');
          } else {
            this.$router.push('/dashboard');
          }
        } catch (error) {
          this.error = error.response.data.msg || 'An error occurred. Please try again.';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #FFD166, #06D6A0);
    font-family: 'Poppins', sans-serif;
  }
  
  .auth-box {
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #073B4C;
    margin-bottom: 20px;
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
    background: #F0F4F8;
  }
  
  .input::placeholder {
    color: #9E9E9E;
  }
  
  .button.is-primary {
    background-color: #FF6363;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .button.is-primary:hover {
    background-color: #FF4A4A;
  }
  
  .has-text-danger {
    color: #FF6363;
    font-weight: 600;
  }
  
  .mt-3 {
    margin-top: 1rem;
  }
  </style>
  