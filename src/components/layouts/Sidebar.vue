<template>
  <div :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <div class="sidebar__toggle" @click="toggleSidebar">
      <svg fill="currentColor" v-if="isCollapsed" height="15" viewBox="0 0 64 64"
           width="15" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m42.7 29.6c-5.5-5.5-11-11-16.5-16.5-.8-.8-1.6-1.6-2.4-2.4-1.8-1.8-4.7 1-2.8 2.8 5.5 5.5 11 11 16.5 16.5.3.3.6.6.9.9-5 5-10 10-15 15-.8.8-1.5 1.5-2.3 2.3-1.8 1.8 1 4.7 2.8 2.8l16.4-16.4 2.3-2.3c.9-.6.9-1.9.1-2.7z"/>
      </svg>
      <svg fill="currentColor" v-else height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
        <path id="angle-left"
              d="m15 19.75a.744.744 0 0 1 -.53-.22l-7-7a.749.749 0 0 1 0-1.06l7-7a.75.75 0 0 1 1.06 1.06l-6.469 6.47 6.469 6.47a.75.75 0 0 1 -.53 1.28z"
              fill="rgb(0,0,0)"/>
      </svg>
    </div>

    <div class="sidebar__menu">
      <div class="sidebar__group">
        <div class="sidebar__heading">QUẢN LÝ CHUNG</div>
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <router-link to="/" class="sidebar__link">
              <span class="icon-menu">
                <svg fill="none" height="25" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg"><g
                  fill="#000"><path
                  d="m15 3.75c.4142 0 .75-.33579.75-.75s-.3358-.75-.75-.75h-3.0452c-1.8366-.00001-3.27619-.00001-4.41832.12373-1.16554.12628-2.10992.38859-2.91624.97442-.48815.35466-.91743.78394-1.27209 1.27208-.58583.80633-.84814 1.75071-.97442 2.91625-.12374 1.14213-.12374 2.58172-.12373 4.41832v.0904c-.00001 1.8366-.00001 3.2762.12373 4.4183.12628 1.1656.38859 2.1099.97442 2.9163.35466.4881.78394.9174 1.27208 1.272.80633.5859 1.75071.8482 2.91625.9745 1.14211.1237 2.58172.1237 4.41822.1237h.0906c1.8365 0 3.2761 0 4.4182-.1237 1.1656-.1263 2.1099-.3886 2.9163-.9745.4881-.3546.9174-.7839 1.272-1.272.5859-.8064.8482-1.7507.9745-2.9163.1237-1.1421.1237-2.5817.1237-4.4182v-3.0453c0-.41421-.3358-.75-.75-.75s-.75.33579-.75.75v3c0 1.8916-.001 3.25-.115 4.302-.1125 1.0379-.3276 1.6881-.6967 2.1961-.2621.3608-.5794.6781-.9402.9402-.508.3691-1.1582.5842-2.1961.6967-1.052.114-2.4104.115-4.302.115s-3.25001-.001-4.30196-.115c-1.03791-.1125-1.68812-.3276-2.19613-.6967-.3608-.2621-.67809-.5794-.94023-.9402-.36909-.508-.58423-1.1582-.69668-2.1961-.11397-1.052-.115-2.4104-.115-4.302s.00103-3.25001.115-4.30195c.11245-1.03792.32759-1.68813.69668-2.19614.26214-.3608.57943-.67809.94023-.94023.50801-.36909 1.15822-.58423 2.19614-.69668 1.05194-.11397 2.41035-.115 4.30195-.115z"/><path
                  d="m6.32665 14.5268c-.18242.3719-.02883.8213.34305 1.0037s.82123.0288 1.00365-.3431l1.46034-2.977c.45263-.9228 1.78301-.8777 2.17211.0736.8792 2.149 3.8846 2.2508 4.9072.1662l1.4604-2.97704c.1824-.37189.0288-.82124-.3431-1.00365-.3719-.18242-.8212-.02883-1.0037.34305l-1.4603 2.97704c-.4526.9228-1.783.8777-2.1721-.0736-.8792-2.14902-3.88465-2.25083-4.90722-.1662z"/><path
                  clip-rule="evenodd"
                  d="m17.5 4c0 1.38071 1.1193 2.5 2.5 2.5s2.5-1.11929 2.5-2.5-1.1193-2.5-2.5-2.5-2.5 1.11929-2.5 2.5zm1.5 0c0 .55228.4477 1 1 1s1-.44772 1-1-.4477-1-1-1-1 .44772-1 1z"
                  fill-rule="evenodd"/></g></svg>
              </span>
              <span class="sidebar__text">Bảng điều khiển</span>
            </router-link>
          </li>
          <li class="sidebar__item">
            <router-link to="" class="sidebar__link">
              <span class="icon-menu">
                <svg height="25" viewBox="0 0 36 36" width="25" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path
                  d="m18 34a1.07 1.07 0 0 1 -.48-.11l-4.87-2.43a13.79 13.79 0 0 1 -7.65-12.41v-12.14a1.07 1.07 0 0 1 1.05-1.07h3.47a7.45 7.45 0 0 0 4-1.19l3.87-2.48a1.07 1.07 0 0 1 1.15 0l3.87 2.48a7.45 7.45 0 0 0 4 1.19h3.47a1.07 1.07 0 0 1 1.12 1.07v12.14a13.79 13.79 0 0 1 -7.67 12.4l-4.87 2.43a1.07 1.07 0 0 1 -.46.12zm-10.88-26v11.05a11.67 11.67 0 0 0 6.49 10.49l4.39 2.2 4.39-2.2a11.67 11.67 0 0 0 6.49-10.49v-11.05h-2.4a9.57 9.57 0 0 1 -5.19-1.53l-3.29-2.14-3.29 2.12a9.57 9.57 0 0 1 -5.19 1.55z"/><path
                  d="m18 18.8a4.8 4.8 0 1 1 4.8-4.8 4.81 4.81 0 0 1 -4.8 4.8zm0-7.47a2.67 2.67 0 1 0 2.67 2.67 2.67 2.67 0 0 0 -2.67-2.66z"/><path
                  d="m24.4 24.67h-2.13a2.14 2.14 0 0 0 -2.13-2.13h-4.28a2.13 2.13 0 0 0 -2.13 2.13h-2.13a4.26 4.26 0 0 1 4.26-4.26h4.27a4.27 4.27 0 0 1 4.27 4.26z"/></svg>
              </span>
              <span class="sidebar__text">Tài khoản quản trị</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="sidebar__group">
        <div class="sidebar__heading">BIÊN SOẠN NỘI DUNG</div>
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <div class="sidebar__dropdown">
              <div class="sidebar__dropdown-header" @click="toggleDropdown($event)">
                <span class="icon-menu">
                  <svg clip-rule="evenodd" fill-rule="evenodd" height="25" stroke-linejoin="round"
                       stroke-miterlimit="2" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg"><g
                    id="Icon"><path
                    d="m2.134 10.356c-.566-.313-.884-.861-.884-1.434 0-.574.318-1.122.884-1.434l8.314-4.595c.944-.521 2.16-.521 3.104 0l8.314 4.595c.566.312.884.86.884 1.434 0 .573-.318 1.121-.884 1.434l-8.314 4.594c-.944.522-2.16.522-3.104 0zm.725-1.313 8.314 4.594c.503.278 1.151.278 1.654 0l8.314-4.594c.055-.03.109-.066.109-.121 0-.056-.054-.091-.109-.122l-8.314-4.594c-.503-.278-1.151-.278-1.654 0l-8.314 4.594c-.055.031-.109.066-.109.122 0 .055.054.091.109.121z"/><path
                    d="m18.25 11.25c0-.414.336-.75.75-.75s.75.336.75.75v4.5c0 2.071-1.679 3.75-3.75 3.75h-8c-2.071 0-3.75-1.679-3.75-3.75v-4.5c0-.414.336-.75.75-.75s.75.336.75.75v4.5c0 1.243 1.007 2.25 2.25 2.25h8c1.243 0 2.25-1.007 2.25-2.25z"/><path
                    d="m11.47 9.78c-.293-.292-.293-.768 0-1.06.292-.293.768-.293 1.06 0l3.5 3.5c.141.14.22.331.22.53v8c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-7.689z"/></g></svg>
                </span>
                <span class="sidebar__text">Quản lý khóa học</span>
              </div>
              <ul class="sidebar__dropdown-list">
                <li class="sidebar__dropdown-item">
                  <router-link to="" class="sidebar__link">
                    <span class="sidebar__text">Danh sách khóa học</span>
                  </router-link>
                </li>
                <li class="sidebar__dropdown-item">
                  <router-link to="" class="sidebar__link">
                    <span class="sidebar__text">Danh sách bài tập</span>
                  </router-link>
                </li>
                <li class="sidebar__dropdown-item">
                  <router-link to="" class="sidebar__link">
                    <span class="sidebar__text">Danh sách bài thi</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <li class="sidebar__item">
            <div class="sidebar__dropdown">
              <div class="sidebar__dropdown-header" @click="toggleDropdown($event)">
                <span class="icon-menu">
                  <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                  <g>
                    <g>
                      <path d="M287,0c-8.284,0-15,6.716-15,15v211c0,8.284,6.716,15,15,15h210c8.284,0,15-6.716,15-15C512,101.875,411.273,0,287,0z
                         M302,211V30.574C397.616,37.919,474.164,114.883,481.435,211H302z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M314.792,478.395L242,283.293V76c0-8.284-6.716-15-15-15C103.476,61,0,161.147,0,286c0,123.919,102.473,226,227,226
                        c27.176,0,53.763-4.818,79.021-14.322C313.759,494.767,317.683,486.142,314.792,478.395z M227,482c-108.626,0-197-87.925-197-196
                        c0-102.529,80.354-186.831,182-194.44V286c0,1.79,0.32,3.566,0.946,5.244l68.309,183.083C263.699,479.424,245.512,482,227,482z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M497,271H287c-4.915,0-9.519,2.408-12.321,6.446c-2.804,4.038-3.45,9.192-1.732,13.798l73.739,197.639
                        c2.912,7.802,11.601,11.706,19.336,8.795C453.336,464.829,512,379.762,512,286C512,277.716,505.284,271,497,271z M369.328,463.75
                        L308.606,300.9h172.815C475.997,371.187,432.81,433.991,369.328,463.75z"/>
                    </g>
                  </g>
                  </svg>
                </span>
                <span class="sidebar__text">Thống kê số liệu</span>
              </div>
              <ul class="sidebar__dropdown-list">
                <li class="sidebar__dropdown-item">
                  <router-link to="" class="sidebar__link">
                    <span class="sidebar__text">Colors</span>
                  </router-link>
                </li>
                <li class="sidebar__dropdown-item">
                  <router-link to="" class="sidebar__link">
                    <span class="sidebar__text">Typography</span>
                  </router-link>
                </li>
                <li class="sidebar__dropdown-item">
                  <router-link class="sidebar__link" to="">
                    <span class="sidebar__text">Components</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SidebarView',
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('toggle-sidebar', this.isCollapsed);
    },
    toggleDropdown(event) {
      const dropdownHeader = event.currentTarget;
      const dropdownList = dropdownHeader.nextElementSibling;

      document.querySelectorAll('.sidebar__dropdown-list--open').forEach((openList) => {
        if (openList !== dropdownList) {
          openList.classList.remove('sidebar__dropdown-list--open');
          openList.previousElementSibling.classList.remove('sidebar__dropdown-header--open');
        }
      });

      dropdownList.classList.toggle('sidebar__dropdown-list--open');
      dropdownHeader.classList.toggle('sidebar__dropdown-header--open');
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/layouts/_sidebar.scss";
</style>
