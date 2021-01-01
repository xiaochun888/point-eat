<template lang="html">
  <div class="contact-us container">
    <div class="header">
      <h3>{{$t('Contact us')}}</h3>
    </div>
    <div class="client">
      <table>
        <tr>
          <td class="name">
            <textarea v-model="quote.client.name" :placeholder="$t(clientColumns.name.title)" rows="2" @input="onInput($event, quote.client, 'name')"></textarea>
          </td>
          <td class="empty"></td>
          <td class="phone">
            <textarea v-model="quote.client.phone" :placeholder="$t(clientColumns.phone.title)" rows="2" @input="onInput($event, quote.client, 'phone')"></textarea>
          </td>
        </tr>
        <tr>
          <td class="email">
            <textarea v-model="quote.client.email" :placeholder="$t(clientColumns.email.title)" rows="2" @input="onInput($event, quote.client, 'email')"></textarea>
          </td>
          <td class="empty"></td>
          <td class="nofield"></td>
        </tr>
        <tr>
          <td class="subject" colspan="3">
            <textarea v-model="quote.client.subject" :placeholder="$t(clientColumns.subject.title)" rows="2" @input="onInput($event, quote.client, 'subject')"></textarea>
          </td>
        </tr>
        <tr>
          <td class="message" colspan="3">
            <textarea v-model="quote.client.message" :placeholder="$t(clientColumns.message.title)" rows="10" @input="onInput($event, quote.client, 'message')"></textarea>
          </td>
        </tr>
      </table>
    </div>
    <form @submit.prevent="onSubmit" id="form">
      <input type="submit" :value="$t('Send')" id="submit" class="press-effet box-shadow"/>
    </form>
    <app-footer></app-footer>
  </div>
</template>
<script lang="js">
import { Email } from '@/assets/js/smtp.js';
import { objectDefault, cloneDeep, validateEmail } from '@/assets/js/app.utility.js';
import appFooter from '@/components/appFooter.vue';

const clientDefine = {
  columns: {
    name: {title: 'Name', default: ''},
    phone: {title: 'Phone', default: ''},
    email: {title: 'Email', default: ''},
    subject: {title: 'Subject', default: ''},
    message: {title: 'Message', default: ''}
  }
};
export default {
  name: 'contact-us',
  components: {
    appFooter
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
    clientColumns: () => clientDefine.columns
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
        if(!['subject', 'message'].includes(key)) {
          html += '<li>' + key + ': ' + quote.client[key] + '</li>';
        }
      }
      html += '</ul>';
      html += quote.client['message'];
      console.log(html);
      return html;
    },
    onSubmit(event) {
      const quote = cloneDeep(this.quote);
      quote.client.name = quote.client.name.trim();
      quote.client.phone = quote.client.phone.trim();
      quote.client.email = quote.client.email.trim();
      quote.client.subject = quote.client.subject.trim();
      quote.client.message = quote.client.message.trim();

      if (quote.client.name &&
          quote.client.phone &&
          quote.client.email &&
          quote.client.subject &&
          quote.client.message) {
        if(validateEmail(quote.client.email)) {
          /**anti-spam */
          if(JSON.stringify(this.lastQuote) == JSON.stringify(this.quote)) {
            console.warn('Spammy!');
            return;
          };

          Email.send({
            To: 'contact@point-eat.fr',
            Subject : quote.client.subject,
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
        this.$toast.info(this.$t('Please fill in all the blanks.'), {position: 'bottom'});
      }
    }
  }
};
</script>
<style scoped lang="scss">
.contact-us {
  width: 100%;
  height: 100%;
  border-top: 1px solid #fe5815;

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
      width: 100%;
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
    .phone, .nofield {
      width: 40%;
    }
    .nofield {
      border: 0;
    }
    .subject {
      /**colspan border bug */
      border-top: 1px solid white;
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
  .contact {
    margin: 1em;
  }

</style>
