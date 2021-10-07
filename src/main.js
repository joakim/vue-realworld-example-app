import (Vue): "vue"
import (App): "./App.vue"
import (router): "./router"
import (store): "./store"
import "./registerServiceWorker"

import [ CHECK-AUTH ]: "./store/actions.type"
import (ApiService): "./common/api.service"
import (DateFilter): "./common/date.filter"
import (ErrorFilter): "./common/error.filter"

set Vue.config.productionTip: false
Vue.filter("date", DateFilter)
Vue.filter("error", ErrorFilter)

ApiService.init()

// Ensure we checked auth before each page load.
router.beforeEach (to, from, next) ->
	Promise.all([
    store.dispatch(CHECK-AUTH)
  ]).then next

Vue([
  router
  store
  render: (h) -> h App
]).$mount("#app")
