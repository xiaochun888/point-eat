<template>
<div class="about-us">
    <div>
        <div class="picture flex-center">
          <div class="noselect animated slideInLeft"><img src="@/assets/img/logo_transparent.png" /></div>
          <div class="slogan animated slideInLeft"></div>
        </div>
        <div class="present">
            <p>{{$t("WITVUE, headquartered in Paris, France, specializes in artificial intelligence and network communication applications, and is committed to developing products in the fields of education, health, security and catering. "
                  + "Our researchers come from all over the world and cooperate with many research institutions and companies. We provide the best technology and products to make life easier and more convenient.")}}
            </p>
        </div>
        <div class="domains">
          <agile :navButtons="false" :dots="false" :slides-to-show="4" :autoplaySpeed="5000" autoplay>
            <!-- Add &nbsp; for IE to get width of slide -->
            <div class="education">&nbsp;</div>
            <div class="health">&nbsp;</div>
            <div class="security">&nbsp;</div>
            <div class="catering">&nbsp;</div>
            <div class="building">&nbsp;</div>
          </agile>
        </div>
        <!-- <div class="contact">
            <focus-hint>联系我们</focus-hint>
            <div class="row content">
                <div class="col-sm-12">
                    <table><tbody>
                        <tr><td>邮箱: </td><td>hotline@witvue.com</td></tr>
                        <tr><td>热线：</td><td>+33 973502892</td></tr>
                    </tbody></table>
                </div>
            </div>
        </div> -->
        <div class="company">
             @ 2020 {{$t("witvue")|capitalize}} {{$t("All rights reserved")}}
        </div>
    </div>
</div>
</template>
<script lang="js">
import focusHint from '@/components/common/focusHint.vue';
import { VueAgile } from '@/components/common/vue-agile';

export default {
  name: 'about-us',
  components: {
    'focus-hint': focusHint,
    'agile': VueAgile
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
    .picture {
      height: calc(100vh - 3.5em);
      background: no-repeat center/cover url("~@/assets/img/aboutUs/home.jpg");
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
      padding-bottom: 1em;

      .agile__slide {
        height: 3em;
      }
      .education {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/education.jpg");
      }
      .health {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/health.jpg");
      }
      .security {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/security.jpg");
      }
      .catering {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/catering.jpg");
      }
      .building {
        background: no-repeat center/cover url("~@/assets/img/aboutUs/building.jpg");
      }
    }
    .contact {
        padding: 1em 0;
        /deep/ .focus-hint {
            tr {
                border-color: #ddd;
            }
            .focus {
                background-color:#ddd;
                color: black;
            }
            .form {
                border-left: 2em solid #ddd;
            }
        }
        .content {
            margin: 0 1em;
            td {
                height: 2em;
                line-height: 1em;
            }
            td:first-child {
                white-space: nowrap;
            }
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
