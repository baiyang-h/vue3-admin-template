import {defineStore} from "pinia";

const useTagViewStore = defineStore('tagView', {
  state: () => ({
    // 所有显示的 tagView。  这里存的是一个个的对象
    visitedViews: [],
    // keep-alive 需要缓存的 tagView, 注意这里要把 meta.noCache 排除掉。  这里存的是一个个的 name 字符串
    // 缓存列表中保存的是 route.name  要对应组件内部的 name，所以 route.name要和模块组件name 一致， 因为 keep-alive 的 include就是 组件的 name
    cachedViews: []
  }),
  getters: {},
  actions: {
    // 添加单个 visitedView
    ADD_VISITED_VIEW(view) {
      if(this.visitedViews.some(v => v.path === view.path)) return;
      this.visitedViews.push(view)
    },
    // 添加单个 cachedView，主要为了 keep-alive 的功能
    ADD_CACHED_VIEW(view) {
      if(this.cachedViews.includes(view.name)) return;
      // 如果 meta.noCache: true 不需要缓存
      if(!(view.meta && view.meta.noCache)) {
        this.cachedViews.push(view.name)
      }
    },
    // 关闭单个 visitedView
    DEL_VISITED_VIEW(view) {
      for(let [i, v] of this.visitedViews.entries()) {
        if(v.path === view.path) {
          this.visitedViews.splice(i, 1);
          break
        }
      }
    },

    // 关闭单个 cachedView
    DEL_CACHED_VIEW(view) {
      const index = this.cachedViews.indexOf(view.name);
      index > -1 && this.cachedViews.splice(index, 1);
    },
    // 关闭其他 visitedViews,     保留 默认显示的tag、当前tag
    DEL_OTHERS_VISITED_VIEWS(view) {
      this.visitedViews = this.visitedViews.filter(v => v.meta && v.meta.affix || v.path === view.path)
    },
    // 关闭其他 cachedViews
    DEL_OTHERS_CACHED_VIEWS(view) {
      this.cachedViews = this.cachedViews.filter(name => view.name === name)
    },

    // 关闭所有visitedViews，只留下默认显示的
    DEL_ALL_VISITED_VIEWS() {
      this.visitedViews = this.visitedViews.filter(view => view.meta && view.meta.affix)
    },
    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = [];
    },

    // 添加 visitedView, cachedView
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    // 添加 visitedView
    addVisitedView(view) {
      this.ADD_VISITED_VIEW(view)
    },
    // 添加 cachedView，主要为了 keep-alive 的功能
    addCachedView(view) {
      this.ADD_CACHED_VIEW(view)
    },

    // 关闭 visitedView、cachedView
    delView(view) {
      this.delVisitedView(view)
      this.delCachedView(view)
      return {
        visitedViews: this.visitedViews,
        cachedViews: this.cachedViews
      }
    },
    // 关闭 visitedView
    delVisitedView(view) {
      this.DEL_VISITED_VIEW(view)
    },
    // 关闭 cachedView
    delCachedView(view) {
      this.DEL_CACHED_VIEW(view)
    },

    // 关闭其他 visitedView、cachedView
    delOthersViews(view) {
      this.delOthersVisitedViews(view)
      this.delOthersCachedViews(view)
    },
    // 关闭其他 visitedView
    delOthersVisitedViews(view) {
      this.DEL_OTHERS_VISITED_VIEWS(view)
    },
    // 关闭其他 cachedView
    delOthersCachedViews(view) {
      this.DEL_OTHERS_CACHED_VIEWS(view)
    },

    // 关闭所有 visitedView、cachedView
    delAllViews() {
      this.delAllVisitedViews()
      this.delAllCachedViews()
      return {
        visitedViews: this.visitedViews,
      }
    },
    // 关闭所有 visitedView
    delAllVisitedViews() {
      this.DEL_ALL_VISITED_VIEWS()
    },
    // 关闭所有 cachedView
    delAllCachedViews() {
      this.DEL_ALL_CACHED_VIEWS()
    }
  }
})

export default useTagViewStore
