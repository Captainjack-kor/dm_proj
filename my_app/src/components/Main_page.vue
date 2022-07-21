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
      <div class="list_style" v-if="list_checker" style="width: 1000px; height: 200px;">
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

    <div style="display: flex; justify-content: center; padding-top: 50px;">
    <v-btn v-if="list_checker" @click="makeExcelFile5">Excel5</v-btn>

    </div>
    <div style="height: 200px;">

    </div>
  </v-main>
</template>

<script>
import * as Xlsx from 'xlsx';
// import Xlsx from 'xlsx';
import Header from '../components/Header_part.vue';
import axios from 'axios';

// require('dotenv').config({ path: "../../.env" });


export default {
  name: 'Main_page',
  data: () => ({
    list_checker: false,
    input_items: "",
    pc_result: 0,
    m_result: 0,
    total_result: 0,
    excel_data: []
  }),
  components: {
    Header
  },
  methods: {
    open_list: function() {
      this.list_checker = true;
      
      let search_array = this.input_items.split("\n");
      // console.log(search_array);

      this.excel_data = [];
      for(let i = 0; i < search_array.length; i++) {
        axios.get(("http://localhost:8080/keywordstool"), {
          params: {
            real_data: encodeURI(search_array[i]),
            real_data2: "i am here plz find me",
          }
        }) 
        .then(res => {
          console.log(res.data.keywordList[0])
          this.pc_result = res.data.keywordList[0].monthlyPcQcCnt;
          this.m_result = res.data.keywordList[0].monthlyMobileQcCnt;
          this.total_result = this.pc_result + this.m_result;
          this.excel_data.push({
            "키워드": search_array[i],
            "PC 검색량": this.pc_result,
            "Mobile 검색량": this.m_result,
            "총 검색량": this.total_result,
            "상품수": 20200,
            "경쟁률": 1.258, 
          });
        })

        //TODO: help me out
        // axios.get(("http://localhost:8080/total"), {
        //   params: {
        //     real_data: encodeURI(search_array[i]),
        //     real_data2: "i am here again plz find me",
        //   }
        // })
        // .then(res => {
        //   console.log(res);
        // })
        


        
        // let date = new Date();
        // date.toISOString().slice(0, 10); // result: 2022-07-14
      

        // axios.get((`/v1/search/shop.json?${encodeURI(this.input_items)}"`), {
        // axios.get(("https://openapi.naver.com/v1/search/shop.json?"), {
        //   headers: {
        //     "X-Naver-Client-Id":"toDeg1wsnCOyZ0Ar1IYp",
        //     "X-Naver-Client-Secret":"OYGQu8i3BQ",
        //   },
        //   params: {
        //     query: encodeURI(this.input_items),
        //     sort: "sim",
        //     start: 1,
        //     display: 100,
        //   },
        // }) 
        // .then(res => {
        //   console.log(res.data)
        // })

        // axios.post(("/v1/datalab/shopping/categories/device"), {
        // axios.post(("http://localhost:8080/data"), {
        // axios.post(("http://localhost:8080/data"), {

        // }) 
        // .then(res => {
        //   console.log(res.data)
        // })
      }
    },

    makeExcelFile5: function() {
      const workBook = Xlsx.utils.book_new()
      const workSheet = Xlsx.utils.json_to_sheet(this.excel_data)
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'example')
      Xlsx.writeFile(workBook, 'example.xlsx')
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
