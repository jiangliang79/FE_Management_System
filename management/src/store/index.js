import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
// 2.定义

const state = {
    userInfo: {
        username: '',
        type: 1,
        userId: '',
    }
} // state相当于data是公用数据地方

const mutations = {
    getUserInfo(state, userInfo) {
        console.log(userInfo);
        state.userInfo.username = userInfo.username;
        state.userInfo.type = userInfo.type;
        state.userInfo.userId = userInfo.userId;
    }
} // mutatiions 是方法 s
const actions = {
    getUserInfo(context, userInfo) {
        context.commit('getUserInfo', userInfo);
    }
}

// 3.实例化导出

export default new Vuex.Store({
    state,
    mutations,
    actions
})