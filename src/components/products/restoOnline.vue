<template>
  <div class="resto-online container">
    <div class="introduct">
      <burst :options="particles" ref="burst">
        <div>{{$t("Difficult to recruit?")}}</div>
        <div>{{$t("Too busy on clients peak?")}}</div>
        <div>{{$t("Want more clients?")}}</div>
        <div class="clickhere">{{$t("Click here")}}</div>
      </burst>
      <div class="product">
        <div class="legend"><span>{{$t("Restaurant online")}}</span></div>
        <span class="caption">{{$t("Mini cashier and order server")}}</span>
        <div class="scenes">{{$t("For restaurants, fast food, snacks, bars, buffets, canteens, ...")}}</div>
        <div><img src="@/assets/img/mini_pc3.png"></div>
      </div>
    </div>
    <div class="feature border-box">
      <focus-hint>{{$t("Complete functions")}}<div slot="hint">{{$t("Use usual screens, simple operation")}}</div></focus-hint>
      <div class="large">
        <agile ref="large" :as-nav-for="asNavForSmall" :navButtons="false" :dots="false" :fade="true">
          <div v-for="(slide, index) in features" :key="index" class="slide" :class="slide.cssClass">
            <div class="present">
              <div class="title">{{$t(slide.head)|capitalize}}</div>
              <ul class="square-radius">
                <li v-for="(feature, index) in slide.body" :key="index">{{$t(feature)}}</li>
              </ul>
            </div>
            <div class="picture">
            </div>
          </div>
        </agile>
      </div>
      <div class="small">
        <agile ref="small" :as-nav-for="asNavForLarge" :slides-to-show="4" :dots="false" class="agile-middle" :autoplaySpeed="60000" autoplay>
          <div v-for="(slide, index) in features" :key="index" class="slide" :class="slide.cssClass"  @click="$refs.small.goTo(index)">
            <span class="label">{{$t(slide.head)|capitalize}}</span>
          </div>
          <template slot="prevButton"><div class="arrow border-box flex-center"><div class="arrow-left"></div></div></template>
          <template slot="nextButton"><div class="arrow border-box flex-center"><div class="arrow-right"></div></div></template>
        </agile>
      </div>
    </div>
    <div class="themes">
      <focus-hint>{{$t("Simple and fine layout")}}<div slot="hint">{{$t("Paginated and sliding, theme colors personalized")}}</div></focus-hint>
      <div class="row border-box">
        <div class="col-sm-4">
          <div class="desktop">
            <agile :navButtons="false" :dots="false" :fade="true">
              <slide>
                <div slot="head"></div>
                <div><img src="@/assets/img/others.png"></div>
              </slide>
              <slide>
                <div slot="head"></div>
                <div><img src="@/assets/img/desktop.png"></div>
              </slide>
            </agile>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="tablet">
            <agile :navButtons="false" :dots="false" :fade="true">
              <slide>
                <div slot="head"></div>
                <div><img src="@/assets/img/tablet.png"></div>
              </slide>
              <slide>
                <div slot="head"></div>
                <div><img src="@/assets/img/tablet.png"></div>
              </slide>
            </agile>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="mobile">
            <agile :navButtons="false" :dots="false" :fade="true">
              <slide>
                <div slot="head"></div>
                <div><img src="@/assets/img/mobile.png"></div>
              </slide>
              <slide>
                <div slot="head"></div>
                <div><img src="@/assets/img/mobile.png"></div>
              </slide>
            </agile>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="perform">
      <focus-hint>{{$t("Simple and easy operation")}}<div slot="hint">{{$t("Click to open the video for demonstration")}}</div></focus-hint>
      <div class="row border-box">
        <div class="col-sm-6" v-for="(post, index) in performs.slice(0, 2)" :key="index">
          <pane-video class="square-radius box-shadow" poster="assets/img/palm_tree.jpg" :sources="post.sources">
            <slide>
              <div slot="head">{{$t(post.head)|capitalize}}</div>
              <table><tbody>
                <tr v-for="(item, index) in post.body" :key="index">
                  <td>{{index}}</td>
                  <td><div class="text-ellipsis">{{$t(item)|capitalize}}</div></td>
                </tr>
              </tbody></table>
            </slide>
          </pane-video>
        </div>
      </div>
      <div class="row border-box">
        <div class="col-sm-6" v-for="(post, index) in performs.slice(2,4)" :key="index">
          <pane-video class="square-radius box-shadow" poster="assets/img/palm_tree.jpg" :sources="post.sources">
            <slide>
              <div slot="head">{{$t(post.head)|capitalize}}</div>
              <table><tbody>
                <tr v-for="(item, index) in post.body" :key="index">
                  <td>{{index}}</td>
                  <td><div class="text-ellipsis">{{$t(item)|capitalize}}</div></td>
                </tr>
              </tbody></table>
            </slide>
          </pane-video>
        </div>
      </div>
      <div class="row border-box">
        <div class="col-sm-6" v-for="(post, index) in performs.slice(4)" :key="index">
          <pane-video class="square-radius box-shadow" poster="assets/img/palm_tree.jpg" :sources="post.sources">
            <slide>
              <div slot="head">{{$t(post.head)|capitalize}}</div>
              <table><tbody>
                <tr v-for="(item, index) in post.body" :key="index">
                  <td>{{index}}</td>
                  <td><div class="text-ellipsis">{{$t(item)|capitalize}}</div></td>
                </tr>
              </tbody></table>
            </slide>
          </pane-video>
        </div>
      </div>
    </div> -->
    <div class="contact">
      <focus-hint>{{$t("Price affordable")}}<div slot="hint">{{$t("Spend less but more efficient")}}</div></focus-hint>
      <div class="row border-box">
        <div class="col-sm-6">
          <slide>
            <div>{{$t("We provide solutions, installation and technical services, as well as personalized design. According to the actual situation, you can purchase the server, screen display or printer separately, or just rent the system software.")}}</div>
          </slide>
        </div>
        <div class="col-sm-6">
          <slide>
            <div>{{$t("For more details, please contact us.")}}</div>
            <table><tbody>
              <tr><td>{{$t("Email")}}：</td><td>hotline@witvue.com</td></tr>
              <tr><td>{{$t("Hotline")}}：</td><td>+33 973502892</td></tr>
            </tbody></table>
          </slide>
        </div>
      </div>
    </div>
    <div class="company">
      @ 2020 {{$t("witvue")|capitalize}} {{$t("All rights reserved")}}
    </div>
  </div>
</template>

<script lang="js">
import slimScroll from '@/components/common/slimScroll.vue';
// import paneVideo from '@/components/common/paneVideo.vue';
import { VueAgile } from '@/components/common/vue-agile';
import focusHint from '@/components/common/focusHint.vue';
import burst from '@/components/common/vue-burst';
import slide from '@/components/common/slide.vue';

export default {
  name: 'resto-online',
  components: {
    'slim-scroll': slimScroll,
    // 'pane-video': paneVideo,
    'agile': VueAgile,
    'focus-hint': focusHint,
    'slide': slide,
    'burst': burst
  },
  data () {
    return {
      particles: {
        type: 'triangle',
        easing: 'easeOutQuart',
        size: 6,
        particlesAmountCoefficient: 4,
        oscillationCoefficient: 2,
        color: function () {
          return '#fe5815';
          /**plume effet */
          // return Math.random() < 0.5 ? '#000000"' : '#ffffff';
        },
        direction: 'top',
        duration: 3000,
        onComplete: () => {},
        onBegin: () => {},
        visible: true,
        animating: false
      },
      asNavForSmall: [],
      asNavForLarge: []
    };
  },
  mounted() {
    this.asNavForSmall.push(this.$refs.small);
    this.asNavForLarge.push(this.$refs.large);
    setTimeout(() => {
      if(this.$refs.burst) this.$refs.burst.disintegrate();
    }, 6000);
  },
  computed: {
    features: {
      get: function() {
        return [
          { head: 'Wireless',
            body: [
              'Mobile, tablet or computer in WiFi',
              'No keyboard or mouse required',
              'Wireless printing'
            ],
            cssClass: 'restaurant'
          },
          { head: 'Multi-modes',
            body: [
              'Scan code to order',
              'Order by waiter',
              'Order on electron-menu',
              'Order on POS',
              'Order Simultaneously'
            ],
            cssClass: 'fastfood'
          },
          { head: 'Interactive',
            body: [
              'Notifier client request',
              'Notify service or cooking'
            ],
            cssClass: 'snack'
          },
          { head: 'Cooperative',
            body: [
              'Role operations different',
              'Messages shared'
            ],
            cssClass: 'bar'
          },
          { head: 'separate printing',
            body: [
              'Multi-meal separate printing',
              'Multi-kitchen separate printing'
            ],
            cssClass: 'buffet'
          },
          { head: 'Secure and reliable',
            body: [
              'Daily scheduled backup',
              'No need Internet'
            ],
            cssClass: 'canteen'
          }
        ];
      }
    }
    // performs: {
    //   get: function() {
    //     return [
    //       { head: 'Client',
    //         body: [
    //           'order with one hand',
    //           'cooking signal',
    //           'serving reminder'],
    //         sources: [{src:'assets/media/palm_tree.mp4', type:'video/mp4'}]
    //       },
    //       { head: 'Waiter',
    //         body: [
    //           'order with one hand',
    //           'service recording',
    //           'serving reminder',
    //           'cleaning signal',
    //           'summary printing'],
    //         sources: [{src:'assets/media/palm_tree.mp4', type:'video/mp4'}]
    //       },
    //       { head: 'Cook',
    //         body: [
    //           'order postits',
    //           'order printing',
    //           'cooking notification',
    //           'serving notification'],
    //         sources: [{src:'assets/media/palm_tree.mp4', type:'video/mp4'}]
    //       },
    //       { head: 'Cashier',
    //         body: [
    //           'order slides',
    //           'payment recording',
    //           'separate printing',
    //           'report printing'],
    //         sources: [{src:'assets/media/palm_tree.mp4', type:'video/mp4'}]
    //       },
    //       { head: 'Manager',
    //         body: ['statistics graph'],
    //         sources: [{src:'assets/media/palm_tree.mp4', type:'video/mp4'}]
    //       },
    //       { head: 'Point of sale',
    //         body: [
    //           'order with one hand',
    //           'call number signal',
    //           'call number printing'],
    //         sources: [{src:'assets/media/palm_tree.mp4', type:'video/mp4'}]
    //       }
    //     ];
    //   }
    // }
  },
  filters: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
  }
};
</script>

<!-- Layer scoped -->
<style scoped lang="scss">
.resto-online {
  .introduct {
    position: relative;
    border-top: 1px solid #fe5815;
    height: 12rem;/**em is relative to font-size, rem is always relative to the root. */
    text-align: center;
    /deep/ .vue-burst {
      position: absolute;
      width: 100%;
      height: 100%;
      .clickhere {
        color: black;
        text-decoration: underline;
      }
      .particles {
        height: 100%;
        &-wrapper {
          height: 100%;
          .particles-content {
            height: 100%;
            background: white;
            color: #fe5815;
            font-size: 1.3em;
            z-index: 2;
            padding-top: 1.5rem;
          }
        }
      }
    }
    .product {
      .legend {
        position: relative;
        margin-left: 2em;
        width: 100%;
        height: 1.5em;
        span {
          float: left;
          background: #fe5815;
          color: white;
        }
      }
      .caption {
        font-size: 1.3em;
        line-height: 1.4em;
      }
      .scenes {
        font-size: 0.8em;
      }
      img {
        width: 8em;
      }
    }
  }
  .feature {
    height: 22em;
    margin-top: 2em;
    .focus-hint {
      margin-bottom: 1em;
    }
    .large {
      height: 15em;
      .slide {
        text-align: center;
        color: white;
        .present {
          width: 50%;
          height: 100%;
          float: left;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 1.3em;
            white-space: nowrap;
          }
          ul {
            list-style-type: disc;
            background: white;
            color: black;
            padding: 0.5em;
            padding-left: 1.5em;
          }
          li {
            text-align: left;
            font-size: 0.9em;
          }
        }
        .picture {
          width: 50%;
          height: 100%;
          float: right;
          padding-right: 5%;
        }
      }
    }
    .small {
      height: 4em;
      margin-top: 1em;
      .slide {
        text-align: center;
        background-origin: content-box;
        padding: 0 0.1em;
        .label {
          padding-top: 1px;
          background: white;
          color: black;
          font-size: 1.2em;
          padding-left: 0.5em;
          padding-right: 0.5em;
        }
      }
    }
    .arrow {
      width: 2em;
      height: 2em;
      background: transparent;
      border: 5px solid transparent;

      border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      &:hover {
        background-color: white;
        // border: 5px solid white;
        border-color: white;
        .arrow-left, .arrow-right {
          border-color: black;
        }
        &:active {
          background-color: #666;
          border-color: transparent;
          .arrow-left, .arrow-right {
            border-color: white;
          }
        }
      }
    }

    .restaurant {
      background: no-repeat center/cover url("~@/assets/img/restaurant.jpg");
    }
    .fastfood {
      background: no-repeat center/cover url("~@/assets/img/fastfood.jpg");
    }
    .snack {
      background: no-repeat center/cover url("~@/assets/img/snack.jpg");
    }
    .bar {
      background: no-repeat center/cover url("~@/assets/img/bar.jpg");
    }
    .buffet {
      background: no-repeat center/cover url("~@/assets/img/buffet.jpg");
      // background-origin: content-box;
      // padding: 3em;
    }
    .canteen {
      background: no-repeat center/cover url("~@/assets/img/canteen.jpg");
    }
  }
  .themes {
    margin-top: 2em;
    .focus-hint {
      margin-bottom: 1em;
    }
    .tablet, .mobile, .desktop {
      height: 10em;
      /deep/ .slide {
        &-head {
          font-size: 0.9em;
        }
        &-body {
          padding: 0;
          div {
            width: 100%;
            height: 100%;
            img {
              height: 100%;
              margin: auto;
              display: block;
            }
          }
        }
      }
    }
  }
  .perform {
    margin-top: 2em;
    .col-sm-6 {
      padding: 1em;
    }
    .pane-video {
      border: 1px solid;
      overflow: hidden;
      min-height: 10em;
      /deep/ .slide {
        &-body {
          padding-top: 0;
          padding-bottom: 0;
          .text-ellipsis {
            max-height: 1.2em;
          }
          table {
            width: 100%;
            tr, td {
              font-size: 0.9em;
              padding: 0;
            }
          }
        }
      }
    }
    .box-shadow:active:hover {
      --box-shadow-color: white;
    }
  }
  .contact {
    margin-top: 2em;
    .row {
      padding-left: 1em;
      padding-right: 1em;
    }
    /deep/ .slide {
      &-head {
        height: 1rem;
      }
      &-body {
        height: calc(100% - 1rem);
        border-left: 1px solid #fe5815;
        td {
          text-align: left;
        }
        td:first-child {
          text-align: right;
        }
      }
    }
  }
  .company {
    margin-top: 2em;
    height: 4em;
    display: block;
    text-align: center;
    border-top: 1px solid #fe5815;
  }
}
</style>
<!-- Theme scoped -->
<style scoped lang="scss">
  @import '@/assets/scss/vueAgile.scss';
</style>
