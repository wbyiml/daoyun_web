<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData">获取数据</button>
    <button @click="getDataWithParams">传参获取数据</button>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data(){
    return {}
  },
  methods: {
    getData() {
        axios.get('http://localhost:3000/api/classes/mycreate')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDataWithParams() {
        axios.post('http://localhost:3000/api/classes/myjoin', {
          user_id: 4        // 参数 firstName
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>