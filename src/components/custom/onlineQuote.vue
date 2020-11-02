<template lang="html">
  <div class="online-quote">
    <div class="header">
      <h3>{{$t('Ask for a quote')}}</h3>
    </div>
    <div class="client">
      <table>
        <tr>
          <td class="name">
            <textarea v-model="quote.client.name" :placeholder="'*' + $t(clientColumns.name.title)" rows="2" @input="onInput($event, quote.client, 'name')"></textarea>
          </td>
          <td class="empty"></td>
          <td class="phone">
            <textarea v-model="quote.client.phone" :placeholder="'*' + $t(clientColumns.phone.title)" rows="2" @input="onInput($event, quote.client, 'phone')"></textarea>
          </td>
        </tr>
        <tr>
          <td class="email">
            <textarea v-model="quote.client.email" :placeholder="'*' + $t(clientColumns.email.title)" rows="2" @input="onInput($event, quote.client, 'email')"></textarea>
          </td>
          <td class="empty"></td>
          <td class="type">
            <select v-model="quote.client.type" @change="onChangeClientType" required>
              <option :value="null" disabled selected>{{'*' + $t(clientColumns.type.title)}}</option>
              <option v-for="(option, y) in clientColumns.type.options" :key="y" :value="option.value" :selected="option.value === quote.client.type">
                  {{$t(option.text)}}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="address" colspan="3">
            <textarea v-model="quote.client.address" :placeholder="$t(clientColumns.address.title)" rows="2" @input="onInput($event, quote.client, 'address')"></textarea>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail">
      <table class="table table-striped">
        <thead>
          <tr><th v-for="(col, key) in detailColumns" :key="key">{{$t(col.title)}}</th><th @click="onMinus"></th></tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in quote.detail" :key="index">
            <td v-for="(col, key) in detailColumns" :key="key">
              <template v-if="!!col.options">
                <select v-model="row[key]" @change="onChangeDetailType" required>
                  <option :value="null" disabled selected>{{$t('-- select a product --')}}</option>
                  <option v-for="(option, y) in col.options" :key="y" :value="option.value" :selected="option.value === row[key]">
                    {{$t(option.text)}}
                  </option>
                </select>
              </template>
              <template v-else>
                <input v-model="row[key]" />
              </template>
            </td>
            <td @click="onMinus(index)">-</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td v-for="(col, key) in detailColumns" :key="key"></td><td @click="onPlus">+</td></tr>
        </tfoot>
      </table>
      <form @submit.prevent="onSubmit" id="form">
        <input type="submit" :value="$t('Send')" id="submit" class="press-effet box-shadow"/>
      </form>
    </div>
  </div>
</template>
<script lang="js">
import { Email } from '@/assets/js/smtp.js';
import { objectDefault, cloneDeep, validateEmail } from '@/assets/js/app.utility.js';
import { companyTypeEnum } from '@/assets/js/company.type.enum.js';
import { productTypeEnum } from '@/assets/js/product.type.enum.js';

const clientDefine = {
  columns: {
    name: {title: 'Name', default: ''},
    phone: {title: 'Phone', default: ''},
    email: {title: 'Email', default: ''},
    type: {title: 'Type', default: null, options: companyTypeEnum.toOptions()},
    address: {title: 'Address', default: ''}
  }
};
const detailDefine = {
  columns: {
    product: {title: 'Product', default: null, options: productTypeEnum.toOptions()},
    quantity: {title: 'Quantity', default: 1}
  }
};
export default {
  name: 'online-quote',
  components: {
  },
  props: {
  },
  data () {
    return {
      quote: {
        client: objectDefault(clientDefine.columns),
        detail: []
      },
      lastQuote: null
    };
  },
  computed: {
    clientColumns: () => clientDefine.columns,
    detailColumns: () => detailDefine.columns
  },
  methods: {
    isOverflown(element) {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    },
    onInput(event, value, field) {
      /**textarea */
      if(this.isOverflown(event.currentTarget)) {
        value[field] = value[field].slice(0, -1);
      }
    },
    onChangeClientType() {
    },
    onChangeDetailType() {
    },
    onMinus(index) {
      this.quote.detail.splice(index, 1);
    },
    onPlus() {
      const detail = objectDefault(detailDefine.columns);
      if(this.quote.detail.length == 0) detail.product = 0;
      this.quote.detail.push(detail);
    },
    toHTML(quote) {
      let html = '<ul style="padding-left:0;">';
      for(let key in quote.client) {
        html += '<li>' + key + ': ' + quote.client[key] + '</li>';
      }
      html += '</ul>';

      if(quote.detail.length) {
        html += '<table>';
        quote.detail.forEach(item => {
          html += '<tr>';
          for(let key in item) {
            html += '<td>' + item[key] + '</td>';
          }
          html += '</tr>';
        });
        html += '</table>';
      }
      console.log(html);
      return html;
    },
    onSubmit(event) {
      const quote = cloneDeep(this.quote);
      quote.client.name = quote.client.name.trim();
      quote.client.phone = quote.client.phone.trim();
      quote.client.email = quote.client.email.trim();
      quote.client.type = companyTypeEnum.toText(quote.client.type);
      quote.detail = quote.detail.filter(item => item.product !== null);
      quote.detail.forEach(item => {
        item.product = productTypeEnum.toText(item.product);
      });

      if (quote.client.name &&
          quote.client.phone &&
          quote.client.email &&
          quote.client.type) {
        if(validateEmail(quote.client.email)) {
          /**anti-spam */
          if(JSON.stringify(this.lastQuote) == JSON.stringify(this.quote)) {
            console.warn('Spammy!');
            return;
          };

          const today = new Date();
          Email.send({
            Subject : 'Quote at ' + today.toUTCString(),
            Body : this.toHTML(quote)
          }).then(() => {
            this.$toast.success(this.$t('Sent'), {position: 'bottom'});
            this.lastQuote = cloneDeep(this.quote);
          }).catch(error => {
            console.error(error);
            this.$toast.error(this.$t('Not sent'), {position: 'bottom'});
          });
        } else {
          this.$toast.info(this.$t('Email is not valid.'), {position: 'bottom'});
        }
      } else {
        this.$toast.info(this.$t('The fields with * should be filled.'), {position: 'bottom'});
      }
    }
  }
};
</script>
<style scoped lang="scss">
.online-quote {
  width: 100%;
  height: 100%;

  textarea {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    overflow: hidden;
    resize: none;
    outline: none;
    padding-left: 1em;
    cursor: pointer;
  }

  /**NOTE
  * Avoid compacting the pseudo-elements  */
  textarea::-webkit-input-placeholder {
    color: black;
  }

  textarea:-moz-placeholder { /* Firefox 18- */
    color:black;
  }

  textarea::-moz-placeholder {  /* Firefox 19+ */
    color: black;
  }

  textarea:-ms-input-placeholder {
    color:black;
  }

  textarea::placeholder {
    color: black;
  }

  select {
    width: 100%;
    height: 100%;
    border: 0px;
    padding-left: 1em;
    cursor: pointer;
    background-color: white;

    &:focus {
      outline: none;
    }
    /**placeholder */
    option[value=""][disabled] {
      display: none;
    }
    &:required:invalid {
      color:black;
      padding-left: 1em;
    }
  }

  .header {
    border-bottom: 1px solid;
    padding: 1em;
    text-align: center;
  }

  .client {
    width: 100%;
    font-size: 0.9em;
    margin-top: 1em;
    table {
      width: 90%;
      tr, td {
        height: 2.5em;
        // line-height: 1.25em;
        border: 0;
      }
      td {
        border-bottom: 1px solid #ddd;
      }
      td.empty {
        border: 0;
        width: 10%;
      }
    }

    .name, .email {
      width: 50%;
    }
    .phone, .type {
      width: 40%;
    }
    .message,
    .address {
      /**colspan border bug */
      border-top: 1px solid white;
      textarea::-webkit-input-placeholder {
        color: #aaa;
      }

      textarea:-moz-placeholder { /* Firefox 18- */
        color: #aaa;
      }

      textarea::-moz-placeholder {  /* Firefox 19+ */
        color: #aaa;
      }

      textarea:-ms-input-placeholder {
        color: #aaa;
      }

      textarea::placeholder {
        color: #aaa;
      }
    }
  }
  .detail {
    width: 100%;
    margin-top: 2em;
    table {
      width: 100%;
      table-layout: fixed;
      text-align: center;

      select,
      input {
        width: 100%;
        height: 100%;
        border: 0px;
        padding: 0px;
        margin: 0px;
        outline: none;
        text-align: center;
        cursor: pointer;
        background-color: transparent;
      }
      select {
        padding-left: 1em;
      }
      th:last-child,
      td:last-child {
        width: 3em;
        border-right: 0;
        cursor: pointer;
      }
      tr, th, td {
        padding: 0;
      }
      thead {
        background: #aaa;
        color: white;
        th {
          border-right: 1px solid #ddd;
        }
      }
      tbody {
        td {
          border-right: 1px solid #ddd;
        }
      }
    }

    #form {
      width: 100%;
      #submit {
        display: block;
        margin: auto;
        border-radius: 4px;
        outline: none;
        border-style: none;
        padding: 0.25em;
        &:active {
          outline: none !important;
        }
      }
    }
  }

}
</style>
