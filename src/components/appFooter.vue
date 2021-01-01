<template>
  <div class="app-footer">
    <!-- <div class="social-medias">
      <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/facebook_icon.svg" alt="Facebook" width="24"></a>
      <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/twitter_bird_icon.svg" alt="Twitter" width="60"></a>
      <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/linkedin_icon.svg" alt="Linkedin" width="50"></a>
      <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/instagram_icon.svg" alt="Instagram" width="60"></a>
    </div> -->
    <ul class="others">
      <router-link tag="li" active-class="active" to="/contactUs"><a>{{$t("Contact us")}}</a></router-link>
      <!-- <router-link tag="li" active-class="active" to="/recruitment"><a>{{$t("Recruitment")}}</a></router-link> -->
      <router-link tag="li" active-class="active" to="/legalNotices"><a>{{$t("Legal notices")}}</a></router-link>
      <!-- <router-link tag="li" active-class="active" to="/termsOfUse"><a>{{$t("Terms of use")}}</a></router-link> -->
      <router-link tag="li" active-class="active" to="/cookiesPolicy"><a>{{$t("Cookies policy")}}</a></router-link>
    </ul>
    <div class="copyright">
      @2020 {{$t("Point Eat")|capitalize}}
    </div>
    <cookie-law theme="dark-lime--rounded" :buttonText="acceptText">
      <div slot="message">{{$t('Continuing on this site, you accept the use of cookies to allow us to improve your user experience.')}}</div>
    </cookie-law>
  </div>
</template>
<script lang="js">
import cookieLaw from '@/components/common/cookieLaw.vue';

export default {
  name: 'app-footer',
  components: { cookieLaw },
  computed: {
    acceptText() {
      return this.$t('Accept');
    }
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
.app-footer {
  width: 100%;
  border-top: 1px solid #fe5815;
  margin-top: 2em;
  bottom: 0;
  .social-medias {
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    img {
      height: 1.5em;
    }
  }
  .others {
    list-style: none;
    text-align: center;
    padding:0;
    margin: 0;
    li {
      display: inline;
      &:before{
        content: "|";
        text-indent: 0.5em;
        padding-right: 0.5em;
        display: inline-block;
      }
      &:first-child:before{
        content: "";
      }
    }
    a {
      color: black;
    }
  }
  .copyright {
    display: block;
    text-align: center;
    padding: 1em 0;
  }
}
</style>
