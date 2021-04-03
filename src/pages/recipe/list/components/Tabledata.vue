<template>
     <v-data-table
      :headers="headers"
      :items="recipes"
      >
       <template v-slot:item="{ item }">
        <row-component :key="item.id" :recipe="item" />
      </template>
      </v-data-table>
</template>

<script>
import Vue, { PropOptions } from "vue";
  import { Recipe } from "../viewModel";
  import RowComponent from "./Row.vue";
  import HeaderComponent from "./Header.vue";
  export default {
    name: "TabledataComponent",
    components: { HeaderComponent, RowComponent },
    props: {
    recipes: { required: true },
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Description', value:'description' },
        ],
        
       
      }
    },
  }
</script>
