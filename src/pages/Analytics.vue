<template>
    <div>
      <h1>Analytics</h1>
      <div>
        <h2>Total Asset Value: {{ analytics.totalAssetValue }}</h2>
        <h2>Number of Wills: {{ analytics.willCount }}</h2>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/utils/axios'
  
  export default {
    name: 'Analytics',
    data() {
      return {
        analytics: {
          totalAssetValue: 0,
          willCount: 0
        }
      }
    },
    async created() {
      await this.fetchAnalytics();
    },
    methods: {
      async fetchAnalytics() {
        try {
          const response = await axios.get('/analytics');
          this.analytics = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  