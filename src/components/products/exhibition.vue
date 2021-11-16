<template>
  <div class="point-eat">
    <div class="introduct">
      <burst :options="particles" ref="burst">
        <div>{{$t("Reduce waiters by more than 50%")}}</div>
        <div>{{$t("Increase table use rate")}}</div>
        <div>{{$t("Increase client consumption")}}</div>
        <div>{{$t("Expand repeat clients")}}</div>
        <div class="clickhere">{{$t("Click here")}}</div>
      </burst>
      <div class="product">
        <div class="legend"><span class="text">{{$t("No wires, no contact, no APP, any screen")}}</span></div>
        <div class="caption">{{$t("Mini cashier and ordering server")}}</div>
        <div class="subtitle">{{$t("For restaurants, fast food, snacks, bars, buffets, canteens, ...")}}</div>
        <div class="subtitle">{{$t("Support iPhone, iPad, Android phone, Android tablet, touchscreen, ...")}}</div>
        <lazy-img class="mini_server" src="assets/img/mini_server.png" />
      </div>
    </div>
    <div class="experience">
      <focus-hint>{{$t("Exquisite, Simple and fast")}}<div slot="hint">{{$t("No need to learn, get started right away")}}</div>
        <div slot="pave" class="border-box">
          <div class="row">
            <div class="col-sm-12">
              <span class="slogan absolute-center animated slideInRight">{{$t("Point while serving")}}</span>
              <lazy-img class="image" src="assets/img/scenes/single_hand.jpg" />
            </div>
            <div class="col-sm-12">
              <div class="text">{{$t("Sliding as Youtube or Tiktok, writing as Excel whithout popup window, touching as if on paper or post-it, it's so simple and fast that you can operate in single hand on smartphone, you don't need time to learn.")}}</div>
              <div class="text">{{$t("Place orders quickly to the kitchen, it improves the quality of service and dramatically reduces the labor of waiters.")}}</div>
            </div>
          </div>
        </div>
      </focus-hint>
    </div>
    <div class="features">
      <focus-hint>{{$t("Efficient, saving time and labor")}}<div slot="hint">{{$t("Multi-scene, multi-screen and multi-report")}}</div>
        <div slot="pave" class="border-box">
          <div class="row header">
            <div class="col-sm-12">
              <span class="slogan animated slideInRight">{{$t("Point while eating")}}</span>
              <lazy-img class="image" src="assets/img/scenes/eating_order.jpg" />
            </div>
            <div class="col-sm-12">
              <div class="text">{{$t("Introduce special and new dishes, remind automatically for dish serving, all dishes served and table clearance, it increases quickly turnover.")}}</div>
            </div>
          </div>
          <div class="row scenes">
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/client_order.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("Ordering on a smartphone, nothing to be installed, it is sufficient to use the browser by entering the URL or scanning the QR code. After the order is submitted, the client will receive the cooking messages from the kitchen. He can delete and modify the order at any time.")}}</span>
            </div>
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/order_kiosk.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("Ordering at the kiosk, after the order is submitted, the client will receive a ticket with the order number.")}}</span>
            </div>
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/waiter_order.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("The waiter can place multiple orders for multiple different customers at the same time.")}}</span>
            </div>
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/kitchen_postits.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("All orders are displayed, clickable and movable on the kitchen screen. The chef can centralize cooking of the same dishes, and send cooking messages to the clients and all the waiters.")}}</span>
            </div>
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/takeway_postits.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("All orders are displayed on the screen, clickable to record packaging.")}}</span>
            </div>
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/cash_register.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("The cashier only needs to select the table or order number and then accept the payment.")}}</span>
            </div>
            <div class="col-sm-5 scene">
              <lazy-img class="image" src="assets/img/scenes/graphic_analyse.png" />
            </div>
            <div class="col-sm-7 scene">
              <span>{{$t("The manager can analyze all data and print reports every month. Every waiter can print out performance reports every day.")}}</span>
            </div>
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
            </column>
          </div>
          <div class="col-sm-6">
            <column>
              <div>{{$t("The hotline technical team will answer your questions every day.")}}</div>
              <table><tbody>
                <tr><td>{{$t("Email")}}：</td><td>hotline@point-eat.fr</td></tr>
                <tr><td>{{$t("Phone")}}：</td><td>+33 9 73 50 28 92</td></tr>
                <!-- <tr><td>{{$t("Phone")}}：</td><td>+33 9 83 48 58 02</td></tr> -->
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
import appFooter from '@/components/appFooter.vue';

export default {
  name: 'exhibition',
  components: {
    'slim-scroll': slimScroll,
    'focus-hint': focusHint,
    'column': column,
    'burst': burst,
    'arrow': arrow,
    'lazy-img': lazyImg,
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
      scrollBarColor:''
    };
  },
  created() {
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

  .introduct {
    position: relative;
    border-top: 1px solid #fe5815;
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
          //margin-left: 2em;
          float: left;
          background: #fe5815;
          color: white;
          font-size: 0.7em;
        }
      }
      .caption {
        font-size: 1.3em;
      }
      .subtitle {
        font-size: 0.8em;
      }
      .mini_server {
        margin-bottom: 1em;
        width: 30em;
        max-width: calc(100% - 2em);
      }
    }
  }
  .experience {
    .focus-hint {
      margin-top: 2em;
    }
    .slogan {
      color: #fe5815;
      font-size:2.5em;
      position: absolute;
      top: 1em;
      left: 1em;
    }
    .image {
      width: 100%;
      height: 100%;
    }
    .text {
      padding-top: 1em;
    }
  }
  .features {
    .focus-hint {
      margin-top: 2em;
    }
    .header {
      position: relative;
      .slogan {
        color: #fe5815;
        font-size:2.5em;
        position: absolute;
        top: 1em;
        left: 1em;
      }
      .image {
        width: 100%;
        height: 100%;
      }
      .text {
        padding-top: 1em;
      }
    }
    .scenes {
      .scene {
        margin-top: 2em;
        .image {
          width: 100%;
          height: 100%;
        }
      }
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
