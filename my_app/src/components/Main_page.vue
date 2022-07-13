/* eslint-disable vue/multi-word-component-names */
<template>
  <v-main>
    <div>
      <Header />
    </div>

    <div style="margin-top: 200px; display: flex; justify-content: center;">
      <div style="width: 1000px; height: 200px; display: flex;">
        <v-textarea
          outlined
          no-resize
          name="input-7-4"
          label="검색어 입력"
          placeholder="여기에 물품을 입력하세요."
          :value="input_items"
          @change="data => (input_items = data)"
        ></v-textarea>

        <v-btn elevation="3" style="width: 150px; height: 148px; font-size: 25px;" @click="open_list()">
          search
        </v-btn>
      </div>

    </div>

    <div class="
    popup_list
    rjjs" style="display: flex; justify-content: center;">
      <div class="list_style" v-if="list_checker" style="width: 1000px; height: 500px;">
        {{ input_items }}
        <!-- <table>
          <thead>
            <tr>
              <th>Lorem</th><th>Ipsum</th><th>Dolor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem</td><td>Ipsum</td><td>Dolor</td>
            </tr>
            <tr>
              <td>Lorem</td><td>Ipsum</td><td>Dolor</td>
            </tr>
            <tr>
              <td>Lorem</td><td>Ipsum</td><td>Dolor</td>
            </tr>
            <tr>
              <td>Lorem</td><td>Ipsum</td><td>Dolor</td>
            </tr>
            <tr>
              <td>Lorem</td><td>Ipsum</td><td>Dolor</td>
            </tr>
          </tbody>
        </table> -->
      </div> 
    </div>
  </v-main>
</template>

<script>
import Header from '../components/Header_part.vue';
import axios from 'axios';

// require('dotenv').config({ path: "../../.env" });


export default {
  name: 'Main_page',
  data: () => ({
    list_checker: false,
    input_items: "",
  }),
  components: {
    Header
  },
  methods: {
    open_list: function() {
    
      this.list_checker = true;
      // console.log(process.env.VUE_APP_NAVER);

      // axios.get('https://openapi.naver.com/v1/datalab/shopping/category/device')
      // .then(res => {
      //   console.log(res.data)
      // })
      console.log(encodeURI(this.input_items));
      //TODO: 엔터마다 짤라서 for문돌리면서 검색 하나하나 axios 요청을 처리한다
      axios.get((`/v1/search/shop.json?${encodeURI(this.input_items)}"`), {
        headers: {
        },
        params: {
          query: this.input_items,
          sort: "sim",
          start: 1,
          display: 100,
        },
      }) 
      .then(res => {
        console.log(res.data)
      })

      // let query = encodeURI("iphone");
      // const URL = '/v1/search/shop.json?query='+ query + '&display=20';
      // // const URL = 'https://cors-anywhere.herokuapp.com/https://openapi.naver.com/api/v1/search/shop.json?query='+ query + '&display=20';
      // let config = {
      //   headers: {
      //     'Host': 'openapi.naver.com',
      //     'User-Agent': 'cur1/7.49.1',
      //     'Accept': '*/*',
      //     'X-Naver-Client-Id': 'toDeg1wsnCOyZ0Ar1IYp',
      //     'X-Naver-Client-Secret': 'OYGQu8i3BQ'
      //   }
      // }

      // axios.get(URL, '', config).then((response) => {
      //   console.log(response)
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table {
    width: 100%;
  }

  .list_style {
    padding: 20px;
    border: 1px solid gray;
  }
</style>
