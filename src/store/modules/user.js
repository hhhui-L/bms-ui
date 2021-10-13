const user = {
  // 全局state对象
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    user: {
      name: ''
    }
  },
  // 获取state对象里的对象（计算属性）
  getters: {
    getUser (state) {
      return state.user
    }
  },
  // 设置，唯一可以修改state对象里值的方法（同步）
  mutations: {
    updateUser (state, user) {
      state.user = user
    }
  },
  // 异步执行mutations方法
  actions: {
    asyncUpdateUser (context, user) {
      context.commit('updateUser', user)
    }
  }
}
export default user
