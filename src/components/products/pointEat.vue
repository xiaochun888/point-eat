<template>
  <div class="point-eat">
    <div class="introduct">
      <burst :options="particles" ref="burst">
        <div>{{$t("Need to decrease servers?")}}</div>
        <div>{{$t("Need a certificated cashier device?")}}</div>
        <div>{{$t("Need to order a meal wirelessly and contactlessly?")}}</div>
        <div>{{$t("Want to attract more guests?")}}</div>
        <div>{{$t("Want to avoid the queue of clients?")}}</div>
        <div class="clickhere">{{$t("Click here")}}</div>
      </burst>
      <div class="product">
        <div class="legend"><span class="text">{{$t("Wireless, contactless, screen as choice")}}</span></div>
        <span class="caption">{{$t("Mini payment and ordering server")}}</span>
        <div class="subtitle">{{$t("For restaurants, fast food, snacks, bars, buffets, canteens, ...")}}</div>
        <lazy-img class="stick_hand" src="assets/img/products/stick_hand.jpg" />
        <div class="subtitle">{{$t("Support iPhone, iPad, Android phone, Android tablet, touchscreen, TV set, ...")}}</div>
        <lazy-img class="sreens" src="assets/img/products/sreens.jpg" />
      </div>
    </div>
    <div class="details border-box">
      <focus-hint>{{$t("Functions introduction")}}<div slot="hint">{{$t("Usual screens and habitual manipulations")}}</div>
        <div slot="pave" class="row border-box">
          <div class="col-sm-12 header">
            <div>{{$t("Serving as cashier device, order kiosk, electron-menu, client or kitchen terminal, it is enough to use a usual smartphone, tablet, PC , Mac, TV set, even touchscreen. Nothing to be installed in client side, it is enough to use a browser by entering a URL or by scanning a QR code; In kitchen, even you can use a TV set to display all orders. All manipulations are enough simple just as if you are using a piece of paper and a pen as before, you won't lose your habit.")}}</div>
          </div>
          <div class="col-sm-6 features">
            <div class="caption">{{$t("Features")}}</div>
            <grid-container :layout.sync="layout" :gridSize="{w:90, h:60}" bubbleUp pinned>
              <grid-box
                v-for="(slide, index) in features"
                :boxId="index"
                :key="index"
                @dragEnd="onDragEnd($event, index)"
                dragSelector="div.postit">
                <div class="postit postit-shadow noselect">
                  <span class="label">{{$t(slide.head)}}</span>
                </div>
              </grid-box>
            </grid-container>
          </div>
          <div class="col-sm-6 functions">
            <div class="caption">{{$t("Functions")}}</div>
            <swiper ref="papers" :dots="false" :mousewheel="false" direction="horizontal" @curr="onCurr" @prev="onPrev" @next="onNext" paginate btns>
              <div class="papers papers-shadow noselect">
                <div class="title">{{$t(feature.head)}}</div>
                <ul>
                  <li v-for="(item, index) in feature.body" :key="index">{{$t(item)}}</li>
                </ul>
              </div>
              <arrow slot="prev" @click.native="$refs.papers.prev()" v-show="currIndex > 0"></arrow>
              <arrow slot="next" @click.native="$refs.papers.next()" v-show="currIndex + 1 < features.length" dir="right"></arrow>
            </swiper>
          </div>
        </div>
      </focus-hint>
    </div>
    <div class="experience">
      <focus-hint>{{$t("Simple fast and fine experience")}}<div slot="hint">{{$t("Paginated, sliding and responsive design")}}</div>
        <div slot="pave" class="row border-box">
          <div class="col-sm-12 header">
            <div>{{$t("Designed by professional graphist, in very few colors so as not to dazzle you, with very few buttons to keep screen looking very neat, just click without search. Using pagination, sliding and responsive layout technology, it is easy to manipulate on smartphone in single hand. Sliding as Youtube or Tiktok, writing as Excel whithout popup window, touching as if on paper or post-it, it is so easy to use that you don't need time to learn.")}}</div>
          </div>
          <div class="col-sm-6 landscape">
            <swiper :paginate="false" :mousewheel="false" direction="horizontal" autoplay loop>
              <div><lazy-img src="assets/img/horizontal/home.jpg" /></div>
              <div><lazy-img src="assets/img/horizontal/menus.jpg" /></div>
              <div><lazy-img src="assets/img/horizontal/tables.jpg" /></div>
              <!-- <div><lazy-img src="assets/img/horizontal/kitchen.jpg" /></div> -->
              <div><lazy-img src="assets/img/horizontal/graphic.jpg" /></div>
            </swiper>
          </div>
          <div class="col-sm-6 portrait">
            <swiper :paginate="false" :mousewheel="false" direction="horizontal" autoplay loop>
              <div><lazy-img src="assets/img/vertical/home.jpg" /></div>
              <div><lazy-img src="assets/img/vertical/menus.jpg" /></div>
              <div><lazy-img src="assets/img/vertical/tables.jpg" /></div>
              <!-- <div><lazy-img src="assets/img/vertical/kitchen.jpg" /></div> -->
              <div><lazy-img src="assets/img/vertical/graphic.jpg" /></div>
            </swiper>
          </div>
        </div>
      </focus-hint>
    </div>
    <div class="contact">
      <focus-hint>{{$t("Technical support")}}<div slot="hint">{{$t("Software certified, hotline anytime")}}</div>
        <div slot="pave" class="row border-box">
          <div class="col-sm-6">
            <column>
              <div>{{$t("The cashier software is certified, the public demo version is free to download and try out, just click the link below.")}}</div>
              <div class="demo-link"><a href="http://demo.point-eat.fr">http://demo.point-eat.fr</a></div>
              <div></div>
              <!-- <div>{{$t('This is a version with some settings for demonstration but no server, so neither the functions for communication nor the reports of receipt and income can work in this version.')}}</div> -->
            </column>
          </div>
          <div class="col-sm-6">
            <column>
              <div>{{$t("The hotline technical team will answer your questions every day.")}}</div>
              <table><tbody>
                <tr><td>{{$t("Email")}}：</td><td>hotline@point-eat.fr</td></tr>
                <tr><td>{{$t("Phone")}}：</td><td>+33 9 83 48 58 02</td></tr>
              </tbody></table>
              <div class="quote">
                <router-link to="/priceMini"><a>{{$t("Ask for a quote directly.")}}</a></router-link>
              </div>
            </column>
          </div>
        </div>
      </focus-hint>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script lang="js">
import slimScroll from '@/components/common/slimScroll.vue';
import focusHint from '@/components/common/focusHint.vue';
import burst from '@/components/common/vue-burst';
import column from '@/components/common/column.vue';
import arrow from '@/components/common/arrow.vue';
import lazyImg from '@/components/common/lazyImg.vue';
import lazyDiv from '@/components/common/lazyDiv.vue';
import swiper from '@/components/common/swiper';
import {gridContainer, gridBox} from '@/components/common/dndGrid';
import Circular from '@/assets/js/Circular.js';
import onlineQuote from '@/components/custom/onlineQuote.vue';
import appFooter from '@/components/appFooter.vue';

export default {
  name: 'point-eat',
  components: {
    'slim-scroll': slimScroll,
    'focus-hint': focusHint,
    'column': column,
    'burst': burst,
    'arrow': arrow,
    'lazy-img': lazyImg,
    'lazy-div': lazyDiv,
    'swiper': swiper,
    'grid-container': gridContainer,
    'grid-box': gridBox,
    'online-quote': onlineQuote,
    'app-footer': appFooter
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
      scrollBar: null,
      scrollBarColor:'',
      layout: [],
      currIndex: 0
    };
  },
  created() {
    this.circular = new Circular(this.features);
  },
  mounted() {
    setTimeout(() => {
      if(this.$refs.burst) this.$refs.burst.disintegrate();
    }, 20000);

    this.$nextTick(() => {
      this.scrollBar = document.getElementsByClassName('slimScrollBarY')[0];
      this.scrollBarColor = this.scrollBar.style.backgroundColor;
      this.scrollBar.style.backgroundColor = '#FE5815';
    });
  },
  beforeDestroy() {
    this.scrollBar.style.backgroundColor = this.scrollBarColor;
  },
  computed: {
    features: {
      get: function() {
        return [
          { head: 'Wireless',
            body: [
              'Wireless connection',
              'Wireless printing',
              'Use a keyboard in screen'
            ]
          },
          { head: 'Multi-modes',
            body: [
              'Scan QR code to order',
              'Order by waiter',
              'Order on electron-menu',
              'Order on POS',
              'Order on kiosk',
              'Order sharing'
            ]
          },
          { head: 'Interactive',
            body: [
              'Notify client flavors',
              'Notify client call',
              'Notify service or cooking'
            ]
          },
          { head: 'Cooperative',
            body: [
              'Manipulation by role',
              'Share messages'
            ]
          },
          { head: 'Multi-printings',
            body: [
              'Separate kitchen printing',
              'Separate meal printing',
              'Expense report printing',
              'Handover report printing',
              'Income declaration printing'
            ]
          },
          { head: 'Secure',
            body: [
              'Daily backup',
              'Use a local router',
              'Login by role password'
            ]
          },
          { head: 'Multi-languages',
            body: [
              'Support French',
              'Support English',
              'Support German',
              'Support Chinese',
              '...'
            ]
          }
        ];
      }
    },
    feature() {
      return this.features[this.currIndex];
    }
  },
  methods: {
    onCurr() {
      this.currIndex = this.circular.index;
    },
    onPrev() {
      this.circular.prev();
    },
    onNext() {
      this.circular.next();
    },
    onDragEnd(event, index) {
      if(event.clicking) {
        this.circular.index = index;
        this.onCurr();
      }
    }
  }
};
</script>

<!-- Layer scoped -->
<style scoped lang="scss">
.point-eat {
  height: 100%;
  /deep/ .slimScrollBarY {
    background-color: #fe5815 !important;
  }
  @function paperShadow($color:white, $orientation:right, $amount:3, $sheet-size:2px) {
    $alpha: 0.3;
    $bottom: 1px;
    $side: null;
    $modifier: null;
    @if $orientation == left {
      $side: -1px;
      $modifier: -1;
    }
    @else {
      $side: 1px;
      $modifier: 1;
    }
    $ret: #{$side} #{$bottom} 0 #{rgba(darken($color,90%), $alpha)};
    @for $i from 1 through $amount {
      $bottom: $bottom + $sheet-size;
      $side: $side + $sheet-size * $modifier;
      $alpha: $alpha + 0.025;
      $ret: $ret, #{$side} #{$bottom} 0 #{$color};
      $bottom: $bottom + 1;
      $side: $side + 1 * $modifier;
      $ret: $ret, #{$side} #{$bottom} 0 #{rgba(darken($color,90%), $alpha)};
    };
    @return $ret;
  }

  .swiper {
    height: 100%;
    cursor: pointer;
    img {
      height: 100%;
      margin: auto;
      display: block;
    }
  }
  .header {
    font-size: 0.9em;
    padding: 1em;
  }
  .introduct {
    position: relative;
    border-top: 1px solid #fe5815;
    height: 100vh;/**em is relative to font-size, rem is always relative to the root. */
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
        width: 100%;
        height: 1.5em;
        img {
          float: left;
          width: 1.5em;
          height: 1.5em;
        }
        span.name {
          float: left;
          font-style: italic;
        }
        span.text {
          margin-left: 2em;
          float: left;
          background: #fe5815;
          color: white;
          font-size: 0.7em;
        }
      }
      .caption {
        font-size: 1.3em;
        line-height: 1.4em;
      }
      .subtitle {
        font-size: 0.8em;
      }
      .stick_hand {
        width: 10em;
        margin-bottom: 1em;
      }
      .sreens {
        width: 22em;
        margin-top: 1em;
        max-width: calc(100% - 2em);
      }
    }
  }
  .details {
    .focus-hint {
      margin-top: 2em;
      margin-bottom: 1em;
    }
    .caption {
      width: 100%;
      text-align: center;
      padding-bottom: 1em;
    }
    .features,
    .functions {
      height: 17em;
    }
    .features {
      .grid-container {
        height: 14em;
        .grid-box {
          cursor: pointer;
        }
      }
      .postit {
        width: 100%;
        height: 80%;
        font-size: 0.8em;
        font-weight: 400;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.125);
        span {
          background: white;
        }
      }
      .postit-shadow {
        box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.5);
        &:hover {
          box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
          &:active { /* mouse down */
            box-shadow: none;
          }
        }
      }
    }
    .functions {
      .swiper {
        height: 14em;
      }
      .arrow {
        position: absolute;
        bottom: 6em;/**15em/2(large) - 2em/2(arrow) - 0.5em(shadow) */
        margin-left: 1em;
        &:last-child {
          right: 0;
          margin-right: 1em;
        }
      }
      .papers {
        width: 100%;
        text-align: center;
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
          li {
            text-align: left;
            font-size: 0.9em;
            overflow-wrap: break-word;
            word-wrap: break-word;
            white-space: normal !important;
          }
        }
      }
      .papers-shadow {
        margin-right: 0.5em;
        height: calc(100% - 0.5em);
        flex-shrink: 1;
        border: 1px solid rgba(0, 0, 0, 0.125);
        box-shadow: paperShadow(#ddd, right, 2);
      }
    }
  }
  .experience {
    .focus-hint {
      margin-top: 2em;
    }
    .portrait, .landscape {
      height: 11em;
      padding-bottom: 1em;
    }
  }
  .contact {
    margin-top: 2em;
    .demo-link {
      padding: 1em;
    }
    .row {
      padding-left: 1em;
      padding-right: 1em;
    }
    .quote {
      margin-top: 1em;
      text-decoration: underline;
    }
    /deep/ .column {
      &-head {
        height: 1rem !important;
      }
      &-body {
        padding-top: 0;
        height: calc(100% - 1rem);
        border-left: 1px solid #fe5815;
        table {
          margin-left: 1em;
          td {
            text-align: left;
          }
          td:first-child {
            text-align: right;
          }
        }
      }
    }
    .footer {
      margin-top: 1em;
      border-top: 1px solid #fe5815;
    }
  }
}
</style>
