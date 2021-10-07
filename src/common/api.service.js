import (Vue): "vue"
import (axios): "axios"
import (VueAxios): "vue-axios"
import (JwtService): "@/common/jwt.service"
import (default as [API-URL]): "@/common/config"

ApiService: [
	init: () *->
		Vue.use(VueAxios, axios)
		set Vue.axios.defaults.baseURL: API-URL

	setHeader: () *->
		set Vue.axios.defaults.headers.common.{
			"Authorization"
		}: "Token { JwtService.getToken() }"

	query: (resource, params) ->
		Vue.axios.get(resource, params)
			.catch (error) *->
				throw Error "[RWV] ApiService { error }"

	get: (resource, slug ? "") ->
		Vue.axios.get("{ resource }/{ slug }")
			.catch (error) *->
				throw Error "[RWV] ApiService { error }"

	post: (resource, params) ->
		Vue.axios.post("{ resource }", params)

	update: (resource, slug, params) ->
		Vue.axios.put("{ resource }/{ slug }", params)

	put: (resource, params) ->
		Vue.axios.put("{ resource }", params)

	delete: (resource) ->
		Vue.axios.delete(resource)
			.catch (error) *->
				throw Error "[RWV] ApiService { error }"
]

export default: ApiService

export TagsService: [
	get: () -> ApiService.get("tags")
]

export ArticlesService: [
	query: (type, params) ->
		ApiService.query("articles{ '/feed' if type = 'feed' else '' }", [params])

	get: (slug) ->
		ApiService.get("articles", slug)

	create: (params) ->
		ApiService.post("articles", [article: params])

	update: (slug, params) ->
		ApiService.update("articles", slug, [article: params])

	destroy: (slug) ->
	 ApiService.delete("articles/{ slug }")
]

export CommentsService: [
	get: (slug) ->
		if slug is #string
			throw Error(
				"[RWV] CommentsService.get() article slug required to fetch comments"
			)

		ApiService.get("articles", "{ slug }/comments")

	post: (slug, payload) ->
		ApiService.post("articles/{ slug }/comments", [
			comment: [body: payload]
		])

	destroy: (slug, commentId) ->
		ApiService.delete("articles/{ slug }/comments/{ commentId }"
]

export FavoriteService: [
	add: (slug) ->
		ApiService.post("articles/{ slug }/favorite")

	remove: (slug) ->
		ApiService.delete("articles/{ slug }/favorite")
]

