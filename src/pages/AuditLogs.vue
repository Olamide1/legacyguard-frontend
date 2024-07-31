<template>
  <div class="audit-logs-container">
    <header class="header">
      <router-link to="/dashboard" class="button is-link">← Back to Dashboard</router-link>
      <h1 class="title">🔍 Audit Logs</h1>
    </header>
    <div class="table-container box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log._id">
            <td>{{ new Date(log.timestamp).toLocaleString() }}</td>
            <td>{{ log.action }}</td>
            <td>{{ log.details | json }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'

export default {
  name: 'AuditLogs',
  data() {
    return {
      logs: []
    }
  },
  async created() {
    await this.fetchLogs();
  },
  methods: {
    async fetchLogs() {
      try {
        const response = await axios.get('/audit-logs');
        this.logs = response.data;
      } catch (error) {
        console.error(error);
      }
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

.audit-logs-container {
  font-family: 'Poppins', sans-serif;
  color: #073B4C;
  padding: 20px;
  max-width: 1000px;
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

.table-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

.table thead {
  background: #073B4C;
  color: #fff;
}

.table th,
.table td {
  padding: 12px 15px;
}

.table tbody tr:nth-child(even) {
  background: #f9f9f9;
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

  .table th,
  .table td {
    padding: 8px 10px;
  }
}
</style>
