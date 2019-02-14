import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      user: {
        isLogin: false,
        id: undefined,
        playList: [],
      },
      song: {
        id: undefined,
        isPlay: false,
        url: undefined,
        duration: undefined,
        currentTime: undefined,
      },
      playlist: {
        tracks: [],
        id: undefined,
      },
      recommend: [], // 推荐歌单
    },
    getters: {
      userId(state) {
        return state.user.id;
      },
      userPlayList(state) {
        return state.user.playList;
      },
      isPlay(state) {
        return state.song.isPlay;
      },
      songUrl(state) {
        return state.song.url;
      },
      songId(state) {
        return state.song.id;
      },
      duration(state) {
        return state.song.duration;
      },
      currentTime(state) {
        return state.song.currentTime;
      },
      tracks(state) {
        return state.playlist.tracks;
      },
    },
    mutations: {
      updateUserId(state, id) {
        state.user.id = id;
      },
      updateUserPlayList(state, list) {
        state.user.playList = list;
      },
      operate(state, status) {
        state.song.isPlay = status;
      },
      updateSongUrl(state, url) {
        state.song.url = url;
      },
      updateSongId(state, id) {
        state.song.id = id;
      },
      duration(state, time) {
        state.song.duration = time;
      },
      currentTime(state, time) {
        state.song.currentTime = time;
      },
      updatePlaylist(state, playlist) {
        if (state.playlist.id !== playlist.id) {
          state.playlist.id = playlist.id;
          state.playlist.tracks = playlist.tracks;
        }
      },
      updateRecommend(state, recommend) {
        state.recommend = recommend;
      },
    },
    actions: {
      requestResource({ commit }) {
        return api.requestResource().then((data) => {
          if (+data.code === 200) {
            commit('updateRecommend', data.recommend);
          }
        });
      },
    },
  });
}
