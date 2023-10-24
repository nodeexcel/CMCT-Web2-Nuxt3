export const state = () => ({
    menu: {},
    Author:{},
    roomId: '',
    openModal: false,
    homeList: [],
    headerLogo: null,
    sideFormTop: {
        roomType: null
    },
    anyRoomAvailable: false,
    preFillForm: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        whatsApp: '',
        company: '',
        address: '',
        city: '',
        country: '',
        sos: null,
        ageGroup: null,
        gender: null,
        forCouples: null,
        nationality: null,
        bathroomType: null,
        phoneNumber : "",
        whatsappNumber : "",
        budget: '',
        los: null,
        postalcode: '',
        nob: '',
        job: '',
        ageGroup: null,
        roomType: null,
        discount_code: '',
    },
    faq_topic : null,
    roomsType: []
})
export const mutations = () => ({
    SET_AUTHOR(state, Author){
        state.Author = Author
    },
    SET_MENU(state, menu) {
        state.menu = menu
    },
    SET_ROOM_ID(state, roomId) {
        state.roomId = roomId
    },
    SET_MODAL_FLAG(state, openModal) {
        state.openModal = openModal
    },
    SET_ERROR(state, error) {
        state.menu = error
    },
    setHomeLists(state, homes) {
        state.homeList = homes
    },
    setHeaderLogo(state, payload) {
        state.headerLogo = payload
    },
    setSideFormTop(state, data) {
        state.sideFormTop = data
    },
    SET_ROOM_AVAILABLE_STATUS(state, status) {
        state.anyRoomAvailable = status
    },
    SET_ROOMS_TYPE(state, payload) {
        state.roomsType = payload
    },
    SET_FORM_FIELDS(state, data) {
        state.preFillForm.firstName = data.firstName != undefined ? data.firstName : state.preFillForm.firstName
        state.preFillForm.lastName = data.lastName != undefined ? data.lastName : state.preFillForm.lastName
        state.preFillForm.phoneNumber = data.phoneNumber != undefined ? data.phoneNumber : state.preFillForm.phoneNumber
        state.preFillForm.email = data.email != undefined ? data.email : state.preFillForm.email
        state.preFillForm.whatsappNumber = data.whatsappNumber != undefined ? data.whatsappNumber : state.preFillForm.whatsappNumber
        state.preFillForm.company = data.company != undefined ? data.company : state.preFillForm.company
        state.preFillForm.address = data.address != undefined ? data.address : state.preFillForm.address
        state.preFillForm.city = data.city != undefined ? data.city : state.preFillForm.city
        state.preFillForm.country = data.country != undefined ? data.country : state.preFillForm.country
        state.preFillForm.sos = data.sos != undefined ? data.sos : state.preFillForm.sos
        state.preFillForm.budget = data.budget != undefined ? data.budget : state.preFillForm.budget
        state.preFillForm.los = data.los != undefined ? data.los : state.preFillForm.los
        state.preFillForm.budget = data.budget != undefined ? data.budget : state.preFillForm.budget
        state.preFillForm.postalcode = data.postalcode != undefined ? data.postalcode : state.preFillForm.postalcode
        state.preFillForm.nob = data.nob != undefined ? data.nob : state.preFillForm.nob
        state.preFillForm.job = data.job != undefined ? data.job : state.preFillForm.job
        state.preFillForm.ageGroup = data.ageGroup != undefined ? data.ageGroup : state.preFillForm.ageGroup
        state.preFillForm.roomType = data.roomType != undefined ? data.roomType : state.preFillForm.roomType
        state.preFillForm.discount_code = data.discount_code != undefined ? data.discount_code : state.preFillForm.discount_code
    },
    SET_FAQ(state, faqs) {
        state.faq_topic = faqs
    },
})

export const actions = () => ({
    async fetchMenu({ commit }) {
        try {
            client.getSingle('menu').then((result) => {
                // let menuContent = result
                console.log("resultss",result)
                commit('SET_MENU', result)
               
                }).catch((error) => {
                console.error(error);
                });
        } catch (e) {
            const error = 'Please create a menu document'
            commit('SET_ERROR', e);
        }
    },
    async fetchAuthor ({commit}) {
        try {
            await client.get({filters:this.$prismic.filter.at('document.id', payload)}).then(async (response) => {
                console.log("resp",response)
                commit('SET_AUTHOR', response)
                 return response
              })
        } catch (error) {
            SET_AUTHOR
            commit('SET_ERROR', error);
        }
    },
})

export const getters = () => ({
    getHomeList(state) {
        return state.homeList;
    },
})



