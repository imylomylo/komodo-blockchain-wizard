<template>
  <div id="app">
    <h1>{{ msg }}</h1>
   <div class="panel-body col-6">
     <form @submit.prevent="onSubmit">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
     </form>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css"; //full css additions

export default {
  data: function() {
    return {
      msg: "Assetchain Creation Wizard",
      customerrors: [],
      model: {
        id: 1,
        name: "Freedom Howto Coin",
        ticker: "FREE",
        supply: 0,
        password: "FreedomFix",
        notarisation: "None",
        email: "john.doe@gmail.com",
        status: "Proposed",
        active: true 
      },

      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "ID (disabled text field - remove)",
            model: "id",
            readonly: true,
            disabled: true
          },
          {
            type: "input",
            inputType: "text",
            label: "Status",
            model: "status",
            default: "Proposed",
            readonly: true,
            disabled: true
          },
          {
            type: "input",
            inputType: "text",
            label: "Assetchain Full Name",
            model: "name",
            placeholder: "e.g. Komodo",
            featured: true,
            required: true
          },
          {
            type: "input",
            inputType: "text",
            label: "Assetchain Ticker",
            model: "ticker",
            placeholder: "e.g. KMD",
            featured: true,
            required: true
          },
          {
            type: "input",
            inputType: "text",
            label: "Assetchain Supply",
            model: "supply",
            placeholder: "e.g. 100000000",
            featured: true,
            required: true
          },
          {
            type: "select",
            label: "Notarisation",
            model: "notarisation",
            values: function() {
              return [
                { id: "none", name: "None" },
                { id: "standard", name: "Standard dPoW - KMD only" },
                { id: "full", name: "Full dPoW - KMD & BTC" }
              ]
            },
            default: "standard"
          },
          {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            required: true,
            hint: "Minimum 6 characters",
            validator: VueFormGenerator.validators.string
          },
          {
            type: "input",
            inputType: "email",
            label: "E-mail",
            model: "email",
            placeholder: "User's e-mail address"
          },
          {
            type: "submit",
            buttonText: "Submit",
            validateBeforeSubmit: false
          }
        ]
      },

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    };
  },
  methods: {
      onSubmit(){
        console.log("Submit")
        console.log(this.model)
        this.postData()
      },
      postData(){
        console.log("Sending " + JSON.stringify(this.model))
        axios.post('https://3p744v40oa.execute-api.ap-southeast-2.amazonaws.com/v0/acwiz',
          this.model,
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            this.customerrors.push(e)
          })
      }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
