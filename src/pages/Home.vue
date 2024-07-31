<template>
  <div class="homepage-container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">👋 Welcome to LegacyGuard</h1>
          <h2 class="subtitle">Secure and manage your digital legacy with ease.</h2>
          <router-link to="/register" class="button is-primary">Get Started</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">✨ Features</h2>
        <div class="feature-list">
          <div class="feature-item">
            <span class="icon">📜</span>
            <h3>Create & Manage Wills</h3>
            <p>Easily create, update, and manage your digital wills.</p>
          </div>
          <div class="feature-item">
            <span class="icon">🔐</span>
            <h3>Secure & Trusted Contacts</h3>
            <p>Add and manage trusted contacts for emergency access.</p>
          </div>
          <div class="feature-item">
            <span class="icon">📊</span>
            <h3>Analytics & Insights</h3>
            <p>Gain insights into your digital assets and wills.</p>
          </div>
          <div class="feature-item">
            <span class="icon">🔄</span>
            <h3>Version Control</h3>
            <p>Keep track of different versions of your wills.</p>
          </div>
          <div class="feature-item">
            <span class="icon">🔔</span>
            <h3>Notifications & Reminders</h3>
            <p>Stay updated with regular reminders and pulse checks.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="education">
      <div class="container">
        <h2 class="section-title">📚 Learn About Estate Management</h2>
        <p>Managing your digital estate is crucial in the modern world. LegacyGuard helps you safeguard your assets, ensure your wishes are honored, and provide peace of mind for you and your loved ones.</p>
      </div>
    </section>

    <section class="getting-started">
      <div class="container">
        <h2 class="section-title">🚀 Get Started</h2>
        <router-link to="/register" class="button is-primary">Create an Account</router-link>
        <router-link to="/login" class="button is-link">Login</router-link>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <h3 class="footer-title">LegacyGuard</h3>
            <p>Secure and manage your digital legacy with ease.</p>
          </div>
          <div class="footer-column">
            <h3 class="footer-title">Resources</h3>
            <ul>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
              <li><router-link to="/privacy">Privacy Policy</router-link></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3 class="footer-title">Support</h3>
            <ul>
              <li><router-link to="/faq">FAQ</router-link></li>
              <li><router-link to="/support">Support Center</router-link></li>
            </ul>
          </div>
        </div>
        <p>&copy; 2024 LegacyGuard. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #073B4C;
  background-color: #F0F4F8;
}

.homepage-container {
  font-family: 'Poppins', sans-serif;
  color: #073B4C;
}

.hero {
  background: #FF6363;
  color: #fff;
  padding: 80px 0;
  text-align: center;
}

.hero .title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.hero .subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #FFD166;
}

.hero .button {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
}

.features {
  padding: 60px 0;
  background: #ffffff;
}

.features .section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #FF6363;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.feature-item {
  width: 100%;
  max-width: 300px;
  margin: 10px;
  padding: 20px;
  background: #F0F4F8;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  text-align: center;
}

.feature-item .icon {
  font-size: 3rem;
  margin-bottom: 10px;
  color: #FF6363;
}

.education {
  padding: 60px 0;
  background: #F7FAFC;
  text-align: center;
}

.education .section-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #06D6A0;
}

.getting-started {
  padding: 60px 0;
  background: #06D6A0;
  text-align: center;
  color: #fff;
}

.getting-started .section-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.getting-started .button {
  margin: 10px;
}

.footer {
  background: #073B4C;
  color: #D1D5DB;
  padding: 40px 0;
  text-align: center;
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 20px;
}

.footer-column {
  flex: 1;
  min-width: 200px;
  padding: 10px;
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.footer p {
  margin: 0;
  color: #D1D5DB;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-links a {
  color: #D1D5DB;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #fff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero .title {
    font-size: 2rem;
  }

  .hero .subtitle {
    font-size: 1rem;
  }

  .hero .button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .features .feature-item {
    width: 100%;
    margin-bottom: 20px;
  }

  .features .feature-list {
    flex-direction: column;
    align-items: center;
  }

  .education .section-title,
  .getting-started .section-title {
    font-size: 2rem;
  }

  .getting-started .button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .footer .container {
    flex-direction: column;
    align-items: center;
  }

  .footer-columns {
    flex-direction: column;
    align-items: center;
  }

  .footer-links {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
