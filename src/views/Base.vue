<template>
  <Header/>
  <Sidebar :is-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar"/>
  <main class="main-content" :class="{ 'collapsed': isSidebarCollapsed }">
    <div class="box-layout">
      <h3>Button group</h3>
      <br>
      <div class="list-group-item">
        <button class="btn btn--primary">
          <svg class="icon" fill="currentColor"
               xml:space="preserve"
               width="20"
               height="20"
               viewBox="0 0 682.66669 682.66669"
               xmlns="http://www.w3.org/2000/svg"><defs
             id="defs139"><clipPath
               clipPathUnits="userSpaceOnUse"
               id="clipPath157"><path
                 d="M 0,512 H 512 V 0 H 0 Z"
                 id="path155" /></clipPath></defs>
            <g
              id="g141"
              transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)"><g
               id="g143"
               transform="translate(256,346.0176)"><path
                 d="M 0,0 V -180"
                 style="fill:none;stroke:#fff;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
                 id="path145" /></g>
              <g
                id="g147"
                transform="translate(166,256.0176)"><path
                 d="M 0,0 H 180"
                 style="fill:none;stroke:#fff;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
                 id="path149" /></g>
              <g
                id="g151"><g
                 id="g153"
                 clip-path="url(#clipPath157)"><g
                   id="g159"
           transform="translate(378.0996,53.9995)"><path
             d="m 0,0 c -35.623,-21.578 -77.411,-34 -122.1,-34 -130.339,0 -236,105.661 -236,236 0,130.34 105.661,236 236,236 130.34,0 236,-105.66 236,-236 0,-48.467 -14.943,-93.521 -40,-131"
             style="fill:none;stroke:#fff;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
             id="path161" /></g></g></g></g></svg>
          Thêm mới
        </button>
        <button class="btn btn--secondary">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" x="0px"
               y="0px"
               viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g transform="translate(1 1)">
              <g>
                <g>
                  <path d="M436.016,73.984c-99.979-99.979-262.075-99.979-362.033,0.002c-99.978,99.978-99.978,262.073,0.004,362.031
                    c99.954,99.978,262.05,99.978,362.029-0.002C535.995,336.059,535.995,173.964,436.016,73.984z M405.848,405.844
                    c-83.318,83.318-218.396,83.318-301.691,0.004c-83.318-83.299-83.318-218.377-0.002-301.693
                    c83.297-83.317,218.375-83.317,301.691,0S489.162,322.549,405.848,405.844z"/>
                  <path d="M360.592,149.408c-8.331-8.331-21.839-8.331-30.17,0l-75.425,75.425l-75.425-75.425c-8.331-8.331-21.839-8.331-30.17,0
                    s-8.331,21.839,0,30.17l75.425,75.425L149.43,330.4c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0
                    l75.397-75.397l75.419,75.419c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17l-75.419-75.419l75.425-75.425
                    C368.923,171.247,368.923,157.74,360.592,149.408z"/>
                </g>
              </g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            </svg>
          hủy bỏ
        </button>
        <button class="btn btn--danger btn--remove">
          <span class="icon-remove">
            <svg
              class="bin-top"
              viewBox="0 0 39 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
              <line
                x1="12"
                y1="1.5"
                x2="26.0357"
                y2="1.5"
                stroke="white"
                stroke-width="3"
              ></line>
            </svg>
            <svg
              class="bin-bottom"
              viewBox="0 0 33 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_8_19" fill="white">
                <path
                  d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                ></path>
              </mask>
              <path
                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                fill="white"
                mask="url(#path-1-inside-1_8_19)"
              ></path>
              <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
              <path d="M21 6V29" stroke="white" stroke-width="4"></path>
            </svg>
          </span>
          Xóa bỏ
        </button>
        <button class="btn btn--success">
          <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="m15.9201 3.78929c-.1316-.03379-.2818-.03929-.8451-.03929h-8.87481c-.57242 0-.95675.00058-1.25274.02476-.28729.02347-.42464.06536-.51516.11148-.23501.11975-.42611.3109-.54605.54629-.04614.09057-.08802.22785-.11148.51497-.02418.29587-.02476.68008-.02476 1.25251v11.59999c0 .5724.00058.9566.02476 1.2525.02346.2871.06534.4244.11148.515.11993.2353.31101.4265.54605.5462.09053.0461.22789.088.51517.1115.29599.0242.68032.0248 1.25273.0248h.04981v-3.0804c-.00001-.5342-.00002-.98.02974-1.3443.03104-.3798.09815-.7365.26999-1.0738.26355-.5172.68393-.938 1.20157-1.2018.33731-.1718.6941-.2389 1.07403-.27.36433-.0297.81028-.0297 1.34447-.0297h3.6608c.5342 0 .9799 0 1.3441.0297.3798.0311.7363.0982 1.0736.27.5171.2635.9384.6841 1.2022 1.2018.1719.3374.2389.6941.2699 1.074.0296.3635.0296.8085.0296 1.3413v3.0832h.0502c.5724 0 .9565-.0006 1.2523-.0248.2869-.0234.4242-.0653.5148-.1115.2355-.12.427-.3114.5467-.5462.0461-.0905.0879-.2277.1113-.5149.0242-.2959.0247-.6801.0247-1.2526v-8.57204c0-.48653-.0044-.61706-.0303-.7331-.0269-.12027-.0708-.23499-.1304-.34084-.0583-.10351-.1422-.20305-.468-.56502l-2.7252-3.02795c-.3765-.41835-.4817-.52683-.5949-.60207-.1166-.07745-.2455-.13484-.3811-.16969zm1.084 17.96071h.8261c.5344 0 .9803 0 1.3445-.0298.3798-.031.7364-.0982 1.0736-.27.5171-.2635.9383-.684 1.2022-1.2017.1719-.3374.2389-.6941.2699-1.074.0296-.3635.0296-.8085.0296-1.3414v-8.60514c0-.02153 0-.04281 0-.06385.0002-.39093.0003-.69765-.0664-.99637-.0585-.26185-.1549-.51458-.2874-.74987-.1499-.26619-.3549-.49374-.6156-.78301-.0146-.01623-.0294-.03266-.0444-.0493l-2.7251-3.02796c-.017-.01889-.0338-.03757-.0504-.05604-.3011-.33493-.5376-.59798-.8293-.79183-.2565-.17052-.54-.29669-.8382-.37329-.3386-.08697-.6915-.08675-1.1402-.08647-.0257.00002-.0517.00003-.078.00003h-8.90522c-.53417-.00001-.98012-.00002-1.34444.02974-.37993.03103-.73673.09813-1.07404.26999-.51764.26375-.93801.68457-1.20157 1.20182-.17184.33726-.23895.69391-.26999 1.0738-.02976.36423-.02975.81007-.02974 1.34423v11.66082c-.00001.5342-.00002.98.02974 1.3443.03104.3798.09815.7365.26999 1.0738.26357.5172.68397.938 1.20157 1.2017.3373.1719.69408.239 1.07402.27.36443.0298.81052.0298 1.34491.0298h10.82977zm-.7541-1.5v-3.05c0-.5725-.0005-.9567-.0247-1.2526-.0234-.2872-.0652-.4244-.1113-.5149-.1197-.2349-.3112-.4263-.5467-.5463-.0906-.0461-.2278-.088-.5148-.1114-.2958-.0242-.6799-.0248-1.2523-.0248h-3.6c-.57243 0-.95676.0006-1.25276.0248-.28729.0234-.42464.0653-.51515.1114-.23501.1198-.42611.3109-.54605.5463-.04614.0906-.08803.2279-.11148.515-.02418.2959-.02476.6801-.02476 1.2525v3.05zm-8-13.25c0-.41421.33578-.75.75-.75h6c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-6c-.41422 0-.75-.33579-.75-.75z"
                  fill="#fff" fill-rule="evenodd"/>
          </svg>
          Lưu lại
        </button>
        <button class="btn btn--info">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon"
               x="0px" y="0px"
               viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <g>
                <g>
                  <path d="M256,0C114.509,0,0,114.496,0,256c0,141.489,114.496,256,256,256c141.491,0,256-114.496,256-256
                    C512,114.511,397.504,0,256,0z M256,476.279c-121.462,0-220.279-98.816-220.279-220.279S134.538,35.721,256,35.721
                    S476.279,134.537,476.279,256S377.462,476.279,256,476.279z"/>
                </g>
              </g>
            <g>
                <g>
                  <path d="M256.006,213.397c-15.164,0-25.947,6.404-25.947,15.839v128.386c0,8.088,10.783,16.174,25.947,16.174
                    c14.49,0,26.283-8.086,26.283-16.174V229.234C282.289,219.8,270.496,213.397,256.006,213.397z"/>
                </g>
              </g>
            <g>
                <g>
                  <path d="M256.006,134.208c-15.501,0-27.631,11.12-27.631,23.925c0,12.806,12.131,24.263,27.631,24.263
                    c15.164,0,27.296-11.457,27.296-24.263C283.302,145.328,271.169,134.208,256.006,134.208z"/>
                </g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
              </svg>
          Thông tin
        </button>
        <button class="btn btn--warning">
          <svg width="18" height="18"
               x="0px" y="0px"
               viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <g>
                <g>
                  <path d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256
                    C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216
                    c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"/>
                </g>
              </g>
            <g>
                <g>
                  <path d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877
                    C276,137.831,267.046,128.877,256,128.877z"/>
                </g>
              </g>
            <g>
                <g>
                  <circle cx="256" cy="349.16" r="27"/>
                </g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
            <g>
              </g>
              </svg>
          Lưu ý
        </button>
      </div>
      <br>
      <h3>Button Custom</h3>
      <br>
      <div class="list-group-item">
        <Dropdown>
          <template #toggle>
            <button class="btn btn--default arrow">Dropdown</button>
          </template>
          <li class="dropdown-item">Edit</li>
          <li class="dropdown-item">Delete</li>
          <li class="dropdown-item">View</li>
          <li class="dropdown-item" disabled>Disabled</li>
        </Dropdown>

        <button class="btn btn--primary" @click="openModal1('top')">Mở Modal (Top)</button>
        <button class="btn btn--info" @click="openModal2('center')">Mở Modal (Center)</button>
        <ModalCommon :show="isShowModal" :position="modalPosition" @close="closeModal">
          <div v-if="modal_1">
            <h2>Modal 1 - position Top</h2>
          </div>
          <div v-else>
            <h2>Modal 2 - position Center</h2>
          </div>
        </ModalCommon>
      </div>
      <br>
      <div class="list-group-item">
        <button class="btn-style">Button Default</button>
        <button class="btn-style btn-style--secondary">Button Secondary</button>
        <button class="btn-style btn-style--danger">Button Danger</button>
        <button class="btn-style btn-style--success">Button Success</button>
        <button class="btn-style btn-style--info">Button Info</button>
        <button class="btn-style btn-style--warning">Button Warning</button>
      </div>
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import Header from "@/components/layout/NavHeader.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import ModalCommon from "@/components/ui/ModalCommon.vue";

export default {
  name: 'BaseTemplate',
  components: {ModalCommon, Dropdown, Sidebar, Header},
  data() {
    return {
      isSidebarCollapsed: false,
      isShowModal: false,
      modalPosition: 'center',
      modal_1: true,
      modal_2: false,
    };
  },

  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    openModal1(position) {
      this.modalPosition = position;
      this.isShowModal = true;
      this.modal_1 = true;
    },
    openModal2(position) {
      this.modalPosition = position;
      this.isShowModal = true;
      this.modal_2 = true;
    },
    closeModal() {
      this.isShowModal = false;
      this.modal_1 = false;
      this.modal_2 = false;
    },
  },
};
</script>
