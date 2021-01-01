<template>
<div class="about-us">
    <div>
        <lazy-div class="picture flex-center" cls="home">
          <div class="noselect animated slideInLeft"><img src="@/assets/img/logo_transparent.png" /></div>
          <div class="slogan animated slideInLeft"></div>
        </lazy-div>
        <div class="present">
            <p>{{$t("WITVUE, headquartered in Paris, France, specializes in artificial intelligence and network communication applications, and is committed to developing products in the fields of education, health, security and catering. "
                  + "Our researchers come from all over the world and cooperate with many research institutions and companies. We work hard to provide the best technology and products to make life easier and more convenient.")}}
            </p>
        </div>
        <div class="domains">
          <swiper :paginate="false" :mousewheel="false" direction="horizontal" autoplay loop>
            <!-- Add &nbsp; for IE to get width of slide -->
            <lazy-div cls="education">&nbsp;</lazy-div>
            <lazy-div cls="health">&nbsp;</lazy-div>
            <lazy-div cls="security">&nbsp;</lazy-div>
            <lazy-div cls="catering">&nbsp;</lazy-div>
            <lazy-div cls="building">&nbsp;</lazy-div>
          </swiper>
        </div>
        <div class="contact">
          <div class="container">
            <div class="row border-box">
              <div class="col-sm-12">
                <div class="social-medias">
                  <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/facebook_icon.svg" alt="Facebook" width="24" class="mx-8"></a>
                  <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/twitter_bird_icon.svg" alt="Twitter" width="60" class="mx-8"></a>
                  <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/linkedin_icon.svg" alt="Linkedin" width="50" class="mx-8"></a>
                  <a rel="noopener" href="" target="_blank"><img src="@/assets/icon/instagram_icon.svg" alt="Instagram" width="60" class="mx-8"></a>
                </div>
              </div>
              <div class="col-sm-6">
                <column>
                  <div class="contact-us">{{$t("Contact us")}}</div>
                  <table><tbody>
                    <tr><td>{{$t("Address")}}：</td><td>15 Bis Avenue du Moulin de Saquet</td></tr>
                    <tr><td></td><td>94400 Vitry-Sur-Seine</td></tr>
                    <tr><td>{{$t("Email")}}：</td><td>contact@witvue.com</td></tr>
                    <tr><td>{{$t("Phone")}}：</td><td>+33 9 73 50 28 92</td></tr>
                  </tbody></table>
                </column>
              </div>
              <div class="col-sm-6">
                <column>
                  <!-- <div class="recruitment">{{$t("If you are passionate about new technology and full of creativity, welcome to join us.")}}</div>
                  <table><tbody>
                    <tr><td>{{$t("Email")}}：</td><td>recruitment@witvue.com</td></tr>
                  </tbody></table> -->
                  <ul class="others">
                    <router-link tag="li" active-class="active" to="/contactUs" exact><a>Contact us</a></router-link>
                    <router-link tag="li" active-class="active" to="/recruitment" exact><a>Recruitment</a></router-link>
                    <router-link tag="li" active-class="active" to="/legalNotices"><a>Legal notices</a></router-link>
                    <router-link tag="li" active-class="active" to="/termsOfUse"><a>Terms of use</a></router-link>
                    <router-link tag="li" active-class="active" to="/cookiesPolicy"><a>Cookies policy</a></router-link>
                  </ul>
                </column>
              </div>
            </div>
          </div>
        </div>
        <div class="company">
             @2020 {{$t("witvue")|capitalize}}
        </div>
    </div>
</div>
</template>
<script lang="js">
import focusHint from '@/components/common/focusHint.vue';
import lazyDiv from '@/components/common/lazyDiv.vue';
import swiper from '@/components/common/swiper';
import column from '@/components/common/column.vue';

export default {
  name: 'about-us',
  components: {
    'focus-hint': focusHint,
    'lazy-div': lazyDiv,
    'swiper': swiper,
    'column': column
  },
  filters: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
  }
};
</script>
<style scoped lang="scss">
.about-us {
    height: 100%;
    .home {
      background: no-repeat center/cover url("~@/assets/img/aboutUs/home.jpg");
    }
    .picture {
      height: calc(100vh - 3.5em);
      // background: no-repeat center/cover url("~@/assets/img/aboutUs/home.jpg");
      position: relative;
      img {
        width: 16em;
      }
      .slogan {
        position: absolute;
        top: 1em;
        left: 0;
        font-size: 1.6em;
        font-weight: 600;
        color: white;
      }
    }
    .present {
        padding: 1em;
        padding-left: 20%;
        padding-right: 20%;
    }
    .domains {
      padding-top: 1em;

      .agile__slide {
        height: 3em;
      }
      .swiper {
        height: 3em;
        &-wrap {
          width: 100%;
          div {
            width: 25%;
          }
        }
      }
      .education {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/education.jpg");
        height: 100%;
      }
      .health {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/health.jpg");
        height: 100%;
      }
      .security {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/security.jpg");
        height: 100%;
      }
      .catering {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/catering.jpg");
        height: 100%;
      }
      .building {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/building.jpg");
        height: 100%;
      }
    }
    .contact {
        background-color: #ddd;
        padding: 1em 0;
        /deep/ .column {
          &-head {
            height: 0 !important;
          }
        }
        .contact-us {
          border-bottom: 1px solid #aaa;
        }
        .recruitment {
          margin-bottom: 1em;
        }
        .others {
          list-style: none;
          padding:0;
          li {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
          }
          a {
            color: black;
          }
        }
        .social-medias {
          display: flex;
          justify-content: space-between;
        }
    }
    .company {
      height: 2em;
      display: block;
      text-align: center;
      border-top: 1px solid;
    }
}
</style>
