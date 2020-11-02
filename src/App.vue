<template>
  <div id="app" class="app">
    <div class="makeScrollable">
      <slim-scroll :touchScrollStep="10" :size="scrollBarWidth" :class="{'scrollBarWidth': !isTouchDevice}" alwaysVisible>
        <div class="app-header container">
          <div class="btn-group btn-group-justified app-header-menu " role="group" aria-label="...">
            <div class="btn-group app-header-logo flex-center" @click="$router.push('/aboutus')">
              <img src="@/assets/img/logo.png" />
              <div class="company">
                <div class="witvue">{{$t("witvue")}}</div>
                <div class="slogan">{{$t("Make good life")}}</div>
              </div>
            </div>
            <div class="btn-group" role="group" v-for="(route, index) in routes" :key="index">
              <router-link class="btn btn-default noselect square-radius" :to="route">{{$t(route.name)}}</router-link>
            </div>
            <div class="btn-group flex-center" role="group">
              <click-popover>
                <img slot="head" :src="flagPath(languageOption)">
                <span slot="head">{{languageOption.text}}</span>
                <div  slot="body" v-for="(option, index) in i18nDefineEnum.toOptions()" :key="index"
                    class="click-popover-option select-option"
                    @click="onClickLanguageOption(option)">
                  <table><tbody><tr>
                    <td><img :src="flagPath(option)"></td>
                    <td>{{option.text}}</td>
                  </tr></tbody></table>
                </div>
              </click-popover>
            </div>
          </div>
        </div>
        <router-view />
      </slim-scroll>
    </div>
  </div>
</template>

<script>
import slimScroll from '@/components/common/slimScroll.vue';
import clickPopover from '@/components/common/clickPopover.vue';
import { i18nDefine, i18nDefineEnum } from '@/assets/js/i18n.define.enum.js';

export default {
  name: 'App',
  components: {
    'slim-scroll': slimScroll,
    'click-popover': clickPopover
  },
  data () {
    return {
      title: document.title,
      languageOption: {}
    };
  },
  created() {
    /**language-COUNTRY
     * fr-FR, zh-CN, ...
     */
    const option = this.i18nDefineEnum.toOptions().find(option => this.browserLocale.toLowerCase().includes(option.value));
    this.languageOption = option || this.i18nDefine.ENGLISH;
    this.$i18n.set(this.languageOption.value);
    this.addLangAndTitle();
  },
  computed: {
    i18nDefine: () => i18nDefine,
    i18nDefineEnum: () => i18nDefineEnum,
    browserLocale: {
      get: function() {
        return navigator.languages && navigator.languages[0] || // Chrome / Firefox
          navigator.language || // All browsers
          navigator.userLanguage || // IE <= 10
          'en';
      }
    },
    routes () {
      return this.$router.options.routes.filter(route => route.path != '*');
    },
    isTouchDevice() {
      return ('ontouchstart' in window) ||
             (navigator.msMaxTouchPoints > 0);
    },
    scrollBarWidth() {
      return this.isTouchDevice ? '3px' : '12px';
    }
  },
  methods: {
    onClickLanguageOption(option) {
      this.$i18n.set(option.value);
      this.languageOption = option;
      document.title = this.$t(this.title);
    },
    async addLangAndTitle() {
      Object.values(this.i18nDefine).forEach(option => {
        const lang = option.value;
        const fileName = lang + '.json';
        import(/* webpackChunkName: "i18n" */ '@/assets/i18n/' + fileName).then(content => {
          this.$i18n.add(lang, content);
        }).then(() => {
          /**avoid multiple translation */
          if(this.languageOption.value == lang) {
            document.title = this.$t(this.title);
          }
        }).catch(error => console.error(error));
      });
    },
    flagPath(option) {
      return 'assets/icon/' + option.value + '.png';
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
.app {
  color: #2c3e50;
  .makeScrollable {
    top: 0.01em;
    width: 100%;
    height: calc(100% - 0.01em);
    position: absolute;
  }
  /**Safari/iOS */
  /deep/ .scrollBarWidth {
    ::-webkit-scrollbar {
      width: 12px;
    }
  }
  &-header {
    width: 100%;
    height: 3.5em;
    &-logo {
      margin-left: 0 !important;
      img {
        width: 3em;
        height: 3em;
        margin: 0.25em;
        margin-left: 0;
      }
      .witvue {
        font-family: "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
        font-weight: 900;
        font-size: 1.3em;
        white-space: nowrap;
        margin-right: 0.25em;
      }
      .slogan {
        font-size: 0.5em;
        white-space: nowrap;
        margin-right: 0.25em;
      }
    }
    .click-popover {
        height: 2.5em;
        line-height: 2.5em;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        /deep/ &-head {
          border: 0px;
          padding: 0;
          display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
          display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
          display: -ms-flexbox;      /* TWEENER - IE 10 */
          display: -webkit-flex;     /* NEW - Chrome */
          display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
          align-items: center;
          justify-content: center;
          text-align: center;
          img {
            height: 0.8em;
            width: 0.8em;
            margin-right: 5px;
          }
          &[class~="square-radius"] {
            border-radius: 1.25em !important; /** compared to font Comic Sans MS */
            -o-border-radius: 1.25em !important;
            -ms-border-radius: 1.25em !important;
            -moz-border-radius: 1.25em !important;
            -webkit-border-radius: 1.25em !important;
          }
        }

        &-option {
          width: 100%;
          text-align: center;
          table {
            margin: auto;
            width: 70%;
            table-layout: fixed;
            td:first-child {
              padding: 0;
              width: 20%;
              img {
                height: 0.8em;
                width: 0.8em;
                float: right;
                margin-right: 5px;
              }
            }
          }
        }
    }
  }

  /**menu */
  .btn {
    padding: 0;
    font-size: 1em;
    height: 100%;
    border: 0px;
    border-radius: 0;
    -o-border-radius: 0;
    -ms-border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;

    /* center */
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .btn-group {
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin-left: 0.2em;
  }
  .btn-group a {
    margin: 0px;
    vertical-align: middle;
    height: 100%;
    width: 100%;
    height: 2.5em;
    margin: auto;
    outline: none;
    box-shadow: none;
    -o-box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
  .btn-group a:focus,
  .btn-group a:hover {
    cursor: pointer;
    color: #fff;
    background-color: #ddd;
  }
  .btn-group a:active:hover {
    color:#fff;
    border-color: #666;
    background-color: #666;
  }

  .btn-group a:hover span:last-child {
    text-decoration: underline;
  }
  .btn-group a span {
    vertical-align: middle;
  }
  .btn-default {
    line-height: 1em;
  }
}
</style>
<style lang='scss'>
  @import 'assets/scss/toast-notification-v0.5.4.scss';
  @import 'assets/scss/app-commun.scss';
  @import 'assets/scss/app-theme.scss';
</style>
