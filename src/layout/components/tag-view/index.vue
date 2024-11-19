<template>
  <div class="tag-view">
    <div class="tags-scroll-container-hidden">
      <div class="tags-scroll-container">
        <el-tag
          v-for="tag in visitedViews"
          :key="tag.path"
          :closable="!(tag.meta && tag.meta.affix)"
          :effect="setEffect(tag)"
          @click="onClick(tag)"
          @contextmenu.prevent.native="onContextmenu(tag, $event)"
          @close="onClose(tag)"
        >
          {{ tag.meta && tag.meta.title }}
        </el-tag>
      </div>
    </div>
    <!--  右键工具栏  -->
    <contextmenu
      v-show="visible"
      :style="{ left: position.left, top: position.top }"
      :selected="selected"
      @refresh="onRefresh(selected)"
      @close="onClose(selected)"
      @closeOther="onCloseOther(selected)"
      @closeAll="onCloseAll(selected)"
    />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, getCurrentInstance, watch} from 'vue'
import { useTagViewStore, usePermissionStore } from '@/store'
import contextmenu from './contextmenu.vue'
import {useRoute, useRouter} from "vue-router";

// 生成 tagView 数据
function generateTagView(route) {
  return {
    path: route.path,
    name: route.name,
    meta: route.meta
  }
}

export default {
  name: "TagView",

  components: {
    contextmenu
  },

  setup() {
    const { ctx } = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
    const tagViewStore = useTagViewStore()
    const permissionStore = usePermissionStore()

    const state = reactive({
      visible: false,
      position: {
        left: 0,
        top: 0
      },
      selected: {}
    })

    // 显示的 tagViews
    const visitedViews = computed(() => tagViewStore.visitedViews);
    // 拉平的应用路由 appRoutes
    const flatAppRoutes = computed(() => permissionStore.flatAppRoutes)

    // 初始化tags
    onMounted(() => {
      init()
    })

    // 监听 $route 当前路由来 添加/处理 tagView
    watch(
        () => route.path,
        () => {
          addView(generateTagView(route))
        }
    )

    // 监听 contextmenu 的 visible，在打开工具栏时绑定事件，点击任意处时移除事件
    watch(
        () => state.visible,
        (val) => {
          if(val) {
            document.body.addEventListener('click', closeMenu)
          } else {
            document.body.removeEventListener('click', closeMenu)
          }
        }
    )

    // 初始化
    function init() {
      // 得到是 route.cofig 中 mata.affix 为 true 的数组，即在tagViews中默认显示的 route
      const affixRoutes = filterAffixRoute(flatAppRoutes.value);
      // 初始化会显示的 tags， 此时还不涉及到缓存 keep-alive， 要点击后才会有缓存
      affixRoutes.forEach(tagRoute => {
        tagViewStore.addVisitedView(tagRoute)
      })
      // 初始化的当前路由 tag 需要添加到缓存列表中
      if(route.name) {  // 缓存列表中保存的是 route.name  对应着组件内部的 name， 所以 route.name要和模块组件name 一致， 因为 keep-alive 的 include就是 组件的 name
        tagViewStore.addView(generateTagView(route))
      }
    }

    // 增加标签栏的 tagView
    function addView(tagRoute) {
      // 1.首先要有 name 属性，并且是和菜单组件的name一致，
      // 2.tagView显示的路由必须是在 appRoute 菜单应用路由中的，不然如果直接修改url的形式改变路由，类似于 /login 这类也会显示了在 tagsView 中了，所以确保是 应用路由的 tagRoute
      if(tagRoute.name && flatAppRoutes.value.some(route => route.path === tagRoute.path) ) {
        tagViewStore.addView(tagRoute)
      }
    }

    // 处理得到 tagViews 默认显示的 route，  以 meta.affix 为根据
    function filterAffixRoute(flatAppRoutes) {
      const affixRoutes = []
      flatAppRoutes.forEach(route => {
        if(route.meta && route.meta.affix) {
          affixRoutes.push(generateTagView(route))
        }
      })
      return affixRoutes
    }

    // 设置tag的颜色主题
    function setEffect(tagRoute) {
      if(tagRoute.path === route.path) {
        return 'dark'
      } else {
        return 'plain'
      }
    }

    // 点击标签
    function onClick(tagRoute) {
      if(tagRoute.path === route.path) return;
      router.push(tagRoute.path)
    }

    // 右键点击 tag
    function onContextmenu(tagRoute, e) {
      const offsetLeft = e.target.getBoundingClientRect().left - ctx.$el.getBoundingClientRect().left
      const offsetTop = e.target.getBoundingClientRect().top - ctx.$el.getBoundingClientRect().top;
      const left = offsetLeft + e.offsetX + 'px';
      const top = offsetTop + e.offsetY + 'px';

      state.position = {
        left,
        top
      }
      state.visible = true
      state.selected = tagRoute
    }

    // 关闭 contextmenu 工具栏
    function closeMenu() {
      state.visible = false;
      state.selected = {};
    }

    // 刷新
    function onRefresh(selected) {
      tagViewStore.delCachedView(selected)
      const path = '/redirect' + selected.path;   // /redirect/:path(.*) 中存在路由重定向，首先跳到该路径，然后在重定向
      router.push({ path })
    }

    // 关闭单个标签
    function onClose(tagRoute) {
      const { visitedViews } = tagViewStore.delView(tagRoute)
      // 删除的view和当前路由一致，则重定向到删除后的最后一个。否则保持在当前页面，关闭要关闭的tag
      if(tagRoute.path === route.path) {
        const lastRoute = visitedViews[visitedViews.length-1];
        router.push(lastRoute.path);
      } else {
        return false;
      }
    }

    // 关闭其他标签
    function onCloseOther(tagRoute) {
      tagViewStore.delOthersViews(tagRoute)
      if(tagRoute.path === route.path) {
        return false
      } else {
        router.push(tagRoute.path)
      }
    }

    // 关闭所有标签
    function onCloseAll() {
      const { visitedViews } = tagViewStore.delAllViews()
      const lastPath = visitedViews[visitedViews.length-1]
      router.push(lastPath ? lastPath : '/')
    }

    return {
      ...toRefs(state),
      visitedViews,
      setEffect,
      onClick,
      onContextmenu,
      onRefresh,
      onClose,
      onCloseOther,
      onCloseAll,
    }
  }
}
</script>

<style scoped lang="scss">
.tag-view {
  position: relative;
  height: 34px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  padding: 5px 10px 0;
  box-sizing: border-box;
  user-select:none;
  white-space: nowrap;

  .tags-scroll-container-hidden {
    height: 100%;
    overflow: hidden;
  }

  .tags-scroll-container {
    height: 50px;
    overflow-x: auto;
  }

  .el-tag {
    margin-right: 8px;
  }
}
</style>
