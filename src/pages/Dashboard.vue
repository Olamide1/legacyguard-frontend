<template>
  <div class="dashboard-container">
    <div :class="['sidebar', { 'is-active': isSidebarActive }]">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Dashboard</h2>
        <button class="sidebar-toggle" @click="toggleSidebar">☰</button>
      </div>
      <ul class="sidebar-menu">
        <li @click="setActiveSection('analytics')" :class="{ active: activeSection === 'analytics' }">
          Analytics
        </li>
        <li @click="setActiveSection('wills')" :class="{ active: activeSection === 'wills' }">
          Your Wills
        </li>
        <li @click="setActiveSection('assets')" :class="{ active: activeSection === 'assets' }">
          Your Assets
        </li>
        <li @click="setActiveSection('recentActivities')" :class="{ active: activeSection === 'recentActivities' }">
          Recent Activities
        </li>
        <li @click="setActiveSection('trustedContacts')" :class="{ active: activeSection === 'trustedContacts' }">
          Trusted Contacts
        </li>
        <li @click="setActiveSection('emergencyAccess')" :class="{ active: activeSection === 'emergencyAccess' }">
          Emergency Access Conditions
        </li>
        <li @click="logout">
          Logout
        </li>
      </ul>
    </div>

    <div class="main-content" :class="{ 'sidebar-active': isSidebarActive }">
      <header class="header">
        <div class="header-content">
          <h1 class="title">👋 Welcome, {{ fullName }}</h1>
          <h2 class="subtitle">Here is your personal dashboard.</h2>
          <button class="sidebar-toggle" @click="toggleSidebar">☰</button>
        </div>
      </header>

      <section v-if="activeSection === 'analytics'" class="section analytics">
        <div class="box">
          <h2 class="title is-4">📊 Analytics</h2>
          <div class="content">
            <p><strong>Total Asset Value:</strong> {{ analytics.totalAssetValue }}</p>
            <p><strong>Number of Wills:</strong> {{ analytics.willCount }}</p>
          </div>
        </div>
      </section>

      <section v-if="activeSection === 'wills'" class="section wills">
        <div class="box">
          <h2 class="title is-4">📜 Your Wills</h2>
          <ul class="content">
            <li v-for="will in wills" :key="will._id" class="box will-box">
              <h3 class="subtitle is-6">Will Created on {{ new Date(will.createdAt).toLocaleDateString() }}</h3>
              <p><strong>Assets:</strong></p>
              <ul>
                <li v-for="asset in will.assets" :key="asset._id">{{ asset.name }} ({{ asset.type }})</li>
              </ul>
              <p><strong>Beneficiaries:</strong></p>
              <ul>
                <li v-for="beneficiary in will.beneficiaries" :key="beneficiary.name">{{ beneficiary.name }} - {{ beneficiary.relationship }} - {{ beneficiary.percentage }}%</li>
              </ul>
            </li>
          </ul>
          <router-link to="/wills" class="button is-primary" >Manage Wills</router-link>
          <p v-if="assets.length === 0" class="has-text-danger">Please add an asset before creating a will.</p>
        </div>
      </section>

      <section v-if="activeSection === 'assets'" class="section assets">
        <div class="box">
          <h2 class="title is-4">💼 Your Assets</h2>
          <ul class="content">
            <li v-for="asset in assets" :key="asset._id">
              <strong>{{ asset.name }}</strong> ({{ asset.type }}) - {{ asset.value }}
            </li>
          </ul>
          <router-link to="/assets" class="button is-primary">Manage Assets</router-link>
          <p v-if="assets.length === 0" class="has-text-danger">Please add an asset before creating a will.</p>
        </div>
      </section>

      <section v-if="activeSection === 'recentActivities'" class="section activities">
        <div class="box">
          <h2 class="title is-4">🔍 Recent Activities</h2>
          <ul class="content">
            <li v-for="log in recentLogs" :key="log._id">
              <strong>{{ log.action }}</strong> on {{ new Date(log.timestamp).toLocaleString() }}<br>
              <span>{{ log.details | json }}</span>
            </li>
          </ul>
          <router-link to="/audit-logs" class="button is-primary">View All Activities</router-link>
        </div>
      </section>

      <section v-if="activeSection === 'trustedContacts'" class="section trusted-contacts">
        <div class="box">
          <h2 class="title is-4">👥 Trusted Contacts</h2>
          <ul class="content">
            <li v-for="contact in trustedContacts" :key="contact.email">
              <strong>{{ contact.name }}</strong> ({{ contact.relationship }}) - {{ contact.email }}
            </li>
          </ul>
          <router-link to="/edit-trusted-contacts" class="button is-primary">Edit Trusted Contacts</router-link>
        </div>
      </section>

      <section v-if="activeSection === 'emergencyAccess'" class="section emergency-access">
        <div class="box">
          <h2 class="title is-4">🔑 Emergency Access Conditions</h2>
          <ul class="content">
            <li v-for="condition in emergencyAccessConditions" :key="condition.condition">
              <strong>{{ condition.condition }}</strong>: {{ condition.value }}
            </li>
          </ul>
          <router-link to="/edit-emergency-access-conditions" class="button is-primary">Edit Conditions</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      fullName: localStorage.getItem('fullName') || '',
      assets: [],
      wills: [],
      analytics: {
        totalAssetValue: 0,
        willCount: 0
      },
      recentLogs: [],
      trustedContacts: [],
      emergencyAccessConditions: [],
      activeSection: 'analytics',
      isSidebarActive: false
    }
  },
  async created() {
    await this.fetchAssets();
    await this.fetchWills();
    await this.fetchAnalytics();
    await this.fetchRecentLogs();
    await this.fetchTrustedContacts();
    await this.fetchEmergencyAccessConditions();
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
    async fetchAnalytics() {
      try {
        const response = await axios.get('/analytics');
        this.analytics = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRecentLogs() {
      try {
        const response = await axios.get('/audit-logs?limit=5');
        this.recentLogs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTrustedContacts() {
      try {
        const response = await axios.get('/user/trusted-contacts');
        this.trustedContacts = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEmergencyAccessConditions() {
      try {
        const response = await axios.get('/user/emergency-access-conditions');
        this.emergencyAccessConditions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    setActiveSection(section) {
      this.activeSection = section;
      this.isSidebarActive = false;
    },
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('fullName');
      this.$router.push('/login');
    }
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.dashboard-container {
  display: flex;
  font-family: 'Poppins', sans-serif;
  color: #073B4C;
  height: 100vh;
}

.sidebar {
  background: #073B4C;
  color: #FFD166;
  height: 100vh;
  width: 250px;
  padding: 20px;
  position: relative;
  transition: transform 0.3s ease-in-out;
}

.sidebar.is-active {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #FFD166;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  margin: 15px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.sidebar-menu li.active,
.sidebar-menu li:hover {
  color: #FFD166;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

.main-content.sidebar-active {
  margin-left: 250px;
}

.header {
  background: #FF6363;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.header .subtitle {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #FFD166;
}

.section {
  padding: 20px 0;
}

.box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.title.is-4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #073B4C !important;
}

.content {
  padding-left: 20px;
  font-size: 1rem;
  color: #073B4C;
}

.content strong {
  color: #073B4C;
}
.content li {
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

.has-text-danger {
  color: #FF6363;
  font-weight: 600;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
    z-index: 1000;
    height: 100%;
  }

  .sidebar.is-active {
    transform: translateX(0);
  }

  .main-content.sidebar-active {
    margin-left: 0;
  }

  .header .title {
    font-size: 1.5rem;
  }

  .header .subtitle {
    font-size: 0.9rem;
  }

  .subtitle.is-6 {
    color: #073B4C;
  }

  .section {
    padding: 10px 0;
  }

  .box {
    padding: 15px;
  }

  .title.is-4 {
    font-size: 1.2rem;
  }

  .content {
    font-size: 0.9rem;
  }

  .button.is-primary {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
}
</style>
