import createApp from './main';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  // set current url
  router.push(context.url);

  // waiting utill async component is ready
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(new Error('code 404'));
    }

    // call `asyncData()` in all components
    return Promise.all(matchedComponents.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute,
        });
      }
      return {};
    })).then(() => {
      // state convert `window.__INITIAL_STATE__` and write into html
      context.state = store.state;
      return resolve(app);
    }).catch(reject);
  }, reject);
});
