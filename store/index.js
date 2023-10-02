export const state = () => ({
	loadedPosts: [1,1,3]
  });
  
//   export const mutations = {
// 	setPosts(state, posts){
// 	  state.loadedPosts = posts;
// 	}
//   };
  
//   export const actions = {
// 	setPosts(vuexContext){
// 	  vuexContext.commit('setPosts', [1,2]);
// 	}
//   };
  
  export const getters = {
	loadedPosts(state){
	  return state.loadedPosts;
	}
  };