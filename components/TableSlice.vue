<template>
    <div class="container-background-wrapper">
        <div class="container-background-sub-wrapper mt-5" :style="{ 'background-color': slice.primary.background_color }">
            <div class="inner-content-wrapper features-wrapper" id="features-table">
                <div v-if="slice != undefined" class="section-main-title">
                    <prismic-rich-text :field="slice.primary.title" class="cms-title description table-h4-heading text-center"/>
                </div>
                <!-- <prismic-rich-text :field="slice.primary.title" class="description"/> -->
                <prismic-rich-text :field="slice.primary.text" class="details mb-4 mb-xl-5"/>
                <div class="navigation-table-wrap">
                    <div class="navigation-button">
                        <span @click="scroll_left" class="left-arrow">
                            <svg fill="#fff" width="32px" height="32px" viewBox="0 0 24 24">
                                <path d="M10.757 12l4.95 4.95a1 1 0 1 1-1.414 1.414l-5.657-5.657a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 0 1 1.414 1.414L10.757 12z"></path>
                            </svg>
                        </span>
                        <span @click="scroll_right" class="right-arrow">
                            <svg data-v-116f6bae="" fill="#fff" width="32px" height="32px" viewBox="0 0 24 24">
                                <path d="M13.314 12.071l-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"></path>
                            </svg>
                        </span>
                    </div>
                    <b-table-simple class="text-center mb-4 mb-xl-5" responsive>
                        <b-thead>
                            <b-tr>
                                <b-th v-for="(header, index) in tHead" :key="index"><prismic-rich-text :field="header.cell"/></b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-for="(body, index) in tBody" :key="'data-' + index">
                                <b-th class="text-left"><prismic-rich-text :field="body[0].cell"/></b-th>
                                <b-td v-for="indexCol in columnLength" :key="indexCol + 'col'">
                                    <prismic-rich-text v-if="indexCol <= columnLength" :field="body[indexCol].cell"/>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                    <div class="text-center">
                        <prismic-link :field="slice.primary.buttonlink" class="book-now-table-btn d-inline-block">
                            {{ slice.primary.button_text }} 
                        </prismic-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'table-slice',
  data() {
    return {
      custFullWidth: 'inner-content-wrapper',
      tHead: {},
      columnLength: 0,
      tBody: {},
    }
  },
  beforeMount() {
      var arr = this.slice.items;
    var size = this.slice.primary.columns;
    var data = this.chunk(arr, size);
    this.tHead = data.slice(0, 1)[0];
    this.tBody = data.slice(1, data.length);
    this.columnLength = Object.keys(this.tHead).length - 1
  },
    methods: {
        chunk(features, chunk_size){
            var index = 0;
            var arrayLength = features.length;
            var featuresArray = [];
            for (index = 0; index < arrayLength; index += chunk_size) {
                var myChunk = features.slice(index, index+chunk_size);
                featuresArray.push(myChunk);
            }
            return featuresArray;
        },
        scroll_left() {
            let content = document.querySelector(".table-responsive");
            content.scrollLeft -= 50;
        },
        scroll_right() {
            let content = document.querySelector(".table-responsive");
            content.scrollLeft += 50;
        }
  }
}
</script>

<style scoped>
/************ Begin Feature-list-css ***********/
.navigation-button {
    display: none;
}
.table-slice {
    width: 100%;
    padding-bottom: 100px;
}
.features-wrapper {
    padding: 50px 15px;
    max-width: 1120px;
}
#features-table .table-h4-heading :first-child {
    margin-bottom: 35px;
    padding-top: 35px;
    text-align: center;
    font-size: 31px;
    font-weight: 700;
    line-height: 39px;
    letter-spacing: normal;
}
:deep(.details p  ){
    color: #000000 !important;
}
#features-table .details p { 
    text-align: center;
    font-size: 20px;
    color: #000000 !important;
    font-weight: 400;
    line-height: 31.5px;
    letter-spacing: normal;
}
#features-table p {
    margin: 0;
    
}
#features-table .table-responsive {
    background-color: #FFFFFF;
    border-radius: 10px;
}
#features-table table {
    color: #000000;
}
#features-table table {
    border-collapse: separate;
}
#features-table table thead th, #features-table table tbody th, #features-table table tbody td {
    border: 1px solid #F7F7F7;
    border-top: 2px solid #F7F7F7;
    border-bottom: 2px solid #F7F7F7;
}
#features-table table tbody th, #features-table table tbody td {
    border-top: none;
}
#features-table table tbody tr:last-child th, #features-table table tbody tr:last-child td {
    border-bottom: 1px solid #d4d9de;
}
#features-table table thead th:nth-child(1), #features-table table tbody th:nth-child(1), #features-table table thead th:nth-child(2), #features-table table tbody td:nth-child(2) {
    border-right: 2px solid #70c242;
}
#features-table table thead th:nth-child(2) {
    border-top: 2px solid #70c242;
    /* border-bottom: 2px solid #70c242; */
}
#features-table table tbody tr:last-child td:nth-child(2) {
    border-bottom: 2px solid #70c242;
}
#features-table table th, #features-table table td {
    padding: 25px 0.75rem;
}
#features-table table thead th {
    text-align: center;
    vertical-align: middle;
    font-size: 17px;
    width: 180px;
    font-weight: 700;
    letter-spacing: normal;
    line-height: 22px;
    padding: 32px 16px;
}
#features-table table thead th:first-child {
    text-align: left;
    padding: 28px 12px 28px 27px;
    border-radius: 10px 0px 0 0;
}
#features-table table thead th:last-child{
    border-radius: 0px 10px 0 0;
}
#features-table table thead th img {
    width: 50px;
}
#features-table table thead th:first-child,#features-table table tbody tr th:first-child{
    border-left: 2px solid #F7F7F7;
}   
#features-table table thead th:last-child,#features-table table tbody tr td:last-child{
    border-right: 2px solid #F7F7F7;
}  
#features-table table tbody tr:last-child th,#features-table table tbody tr:last-child td{
    border-bottom: 2px solid #F7F7F7;
}   
#features-table table tbody tr:last-child th:first-child{
    border-radius: 0 0 0 10px;
}
#features-table table tbody tr:last-child td:last-child{
    border-radius: 0 0 10px 0;
}
#features-table table tbody th {
    font-weight: 400;
    font-size: 17px;
    padding: 28px 12px 28px 27px;
    line-height: 22px;
    letter-spacing: normal;
    
}
#features-table table tbody th strong{
    font-weight: 400;
}
#features-table table tbody td {
    vertical-align: middle;
}
#features-table table tbody img {
    width: 20px;
}
#features-table table p {
    font-size: inherit;
}

.title-top-space {
    margin-top: 6rem !important;
}

@media only screen and (max-width: 542px) {
    .navigation-button {
        display: block;
    }
    .navigation-button .right-arrow { 
        position: absolute;
        right: 0;
    }
}

/************ End Feature-list-css ***********/

@media (max-width:1199px){
   #features-table .table-h4-heading :first-child {
        margin-bottom: 10px;
        padding-top: 0;
        text-align: center;
        font-size: 21px;
        line-height: 39px;
    }
    #features-table .details p {
        font-size: 12px;
        line-height: 20px;
    }
    #features-table table tbody th {
        font-size: 13px;
        line-height: 19px;
    }
    #features-table table th, #features-table table td{
        padding: 18px 12px 18px 15px !important;
        min-width: 180px;
    }
    #features-table table thead th{
        font-size: 14px;
        min-width: 180px;
        padding: 18px 10px 18px 15px !important;
    }
    .table-slice {
        padding-bottom: 40px;
    }
    #features-table table tbody .block-img  img{
        height: 17px;
        width: 17px;
    }
    #features-table table thead th img{
        width: 38px;
    }
    .navigation-table-wrap {
        position: relative;
    }
    .navigation-table-wrap .navigation-button .left-arrow {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        height: 32px;
        margin: auto;
        background: #72bf44;
        color: #fff;
        border-radius: 50%;
    }
    .navigation-table-wrap .navigation-button .right-arrow {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        height: 32px;
        margin: auto;
        background: #72bf44;
        color: #fff;
        border-radius: 50%;
    }
}
@media (min-width:768px) and (max-width:1199px){
    #features-table .table-h4-heading :first-child{
        font-size: 21px;
        line-height: 39px;
        margin-bottom: 10px;
    }
    #features-table .details p{
        font-size: 13px;
        line-height: 20px;
    }
    #features-table table thead th{
        font-size: 15px;
    }
    #features-table table tbody th{
        font-size: 14px;
    }
}
@media (min-width:992px) and (max-width:1199px){
      #features-table .table-h4-heading :first-child{
        font-size: 27px;
        line-height: 39px;
        margin-bottom: 20px;
    }
    #features-table .details p{
        font-size: 16px;
        line-height: 22px;
    }
}
</style>
