<template>
<div class="price-mini">
  <swiper :paginate="false" :mousewheel="false" direction="horizontal" :autoplaySpeed="2000" autoplay loop>
    <!-- Add &nbsp; for IE to get width of slide -->
    <lazy-div cls="bar">&nbsp;</lazy-div>
    <lazy-div cls="buffet">&nbsp;</lazy-div>
    <lazy-div cls="canteen">&nbsp;</lazy-div>
    <lazy-div cls="restaurant">&nbsp;</lazy-div>
    <lazy-div cls="snack">&nbsp;</lazy-div>
  </swiper>
  <div class="row border-box">
    <div class="col-sm-6">
      <column>
        <div>{{$t("We provide the complete solution include:")}}</div>
        <ul>
          <li>{{$t("Installation")}}</li>
          <li>{{$t("Training")}}</li>
          <li>{{$t("Maintenance")}}</li>
          <li>{{$t("Updates")}}</li>
          <li>{{$t("Hardware warranty")}}</li>
          <li>{{$t("Dish photography")}}</li>
        </ul>
      </column>
    </div>
    <div class="col-sm-6">
      <column>
        <div>{{$t("There are three suites of software in choice:")}}</div>
        <ul>
          <li>{{$t("Cashier system")}}</li>
          <li>{{$t("Ordering system")}}</li>
          <li>{{$t("Storage system")}}</li>
        </ul>
      </column>
    </div>
  </div>
  <div>{{$t("According to the actual situation or need, you can purchase the server, printer or other devices separately, or just rent a software service. For more details, please contact us.")}}</div>
  <table class="contact"><tbody>
    <tr><td>{{$t("Email")}}：</td><td>sales@point-eat.fr</td></tr>
    <tr><td>{{$t("Sales")}}：</td><td>+33 9 73 50 28 92</td></tr>
    <!-- <tr><td>{{$t("Sales")}}：</td><td>+33 9 83 48 58 02</td></tr> -->
  </tbody></table>
  <app-footer></app-footer>
</div>
</template>
<script lang="js">
import swiper from '@/components/common/swiper';
import lazyDiv from '@/components/common/lazyDiv.vue';
import column from '@/components/common/column.vue';
import appFooter from '@/components/appFooter.vue';

export default {
  name: 'price-mini',
  components: {
    swiper,
    lazyDiv,
    column,
    appFooter
  },
  data () {
    return {
      scrollBar: null,
      scrollBarColor:''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollBar = document.getElementsByClassName('slimScrollBarY')[0];
      this.scrollBarColor = this.scrollBar.style.backgroundColor;
      this.scrollBar.style.backgroundColor = '#FE5815';
    });
  }
};
</script>
<style scoped lang="scss">
.price-mini {
  .swiper {
    height: 15em;
    &-wrap {
      width: 100%;
    }
  }
  .bar {
    background: no-repeat center/cover url("~@/assets/img/bar.jpg");
    height: 100%;
  }
  .buffet {
    background: no-repeat center/cover url("~@/assets/img/buffet.jpg");
    height: 100%;
  }
  .canteen {
    background: no-repeat center/cover url("~@/assets/img/canteen.jpg");
    height: 100%;
  }
  .fastfood {
    background: no-repeat center/cover url("~@/assets/img/fastfood.jpg");
    height: 100%;
  }
  .restaurant {
    background: no-repeat center/cover url("~@/assets/img/restaurant.jpg");
    height: 100%;
  }
  .snack {
    background: no-repeat center/cover url("~@/assets/img/snack.jpg");
    height: 100%;
  }
  /deep/ .column {
    &-head,
    &-foot {
      height: 1rem !important;
    }
    &-body {
      padding: 0 1em;
      height: calc(100% - 2rem);
      border-left: 1px solid #fe5815;
      ul {
        margin: 0;
        margin-top: 1em;
      }
    }
  }
  .contact {
    margin: 1em;
  }
}
</style>
