const mutations = {
        openRemodal(state, id) {
            var sel = "[data-remodal-id=" + id + "]"
            var obj = $(sel).remodal();
            obj.open();
        },
    }

    export default{
    namespaced: true,
    mutations
}