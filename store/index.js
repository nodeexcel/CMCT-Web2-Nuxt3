import Vuex from 'vuex'
import axios from 'axios'

const mainStore = () => {
    return new Vuex.Store({
        state: {
			menu: {},
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
        },
        mutations: {
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
				state.preFillForm.phone = data.phone != undefined ? data.phone : state.preFillForm.phone
				state.preFillForm.email = data.email != undefined ? data.email : state.preFillForm.email
				state.preFillForm.whatsapp = data.whatsapp != undefined ? data.whatsapp : state.preFillForm.whatsapp
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
        },
        actions: {
            async fetchMenu({ commit }) {
				try {
					const menu = (await this.$prismic.api.getSingle('menu'))
					console.log("yes",menu)
					commit('SET_MENU', menu)
				} catch (e) {
					const error = 'Please create a menu document'
					commit('SET_ERROR', e);
				}
			},
			async fetchAuthor ({},payload) {
				try {
					let resp = await this.$prismic.api.query(this.$prismic.predicates.at('document.id', payload))
					return resp
				} catch (error) {
					commit('SET_ERROR', error);
				}
			},
			/* fetchHomelist({ commit }, payload) {
				// return new Promise((resolve, reject) => {
					return this.$axios.post(process.env.MODE === 'prod' ? process.env.PROD_END_POINT : process.env.DEV_END_POINT, {
						//"operatorId": "HaF6mb19L6AzWVavPr5t",
						"neighborhoodId": "",
						"cityId": (payload != undefined && payload.cityId != undefined) ? payload.cityId : ""
					},{
						headers: {
							Authorization: 'Bearer '+process.env.bearer
						}
					}).then((appartments) => {
						let homeList = [];
						if(appartments.data.data.length > 0) {
							appartments.data.data.forEach(function(appartment, index) {
								if(appartment.homeId != undefined) {
									// Extract unique room price
									let roomPrice = [...new Set(appartment.rooms.map(function(item){ 
										if(item.startingPrice != undefined) 
											return { startingPrice: item.startingPrice, priceCurrency: item.priceCurrency } 
										})
									)];
								
									// Sort array in assending order ro extract small price
									roomPrice.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
									let priceCurrency = '';
									let startingPrice = 0;
									if(roomPrice.length > 0) {
										roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
										startingPrice = roomPrice[0].startingPrice
										priceCurrency = roomPrice[0].priceCurrency
									}
									
									// Extract unique room type
									let roomType = [...new Set(appartment.rooms.map(item => item.type))];
									var cardImg = {
										url: '',
										altText: ''
									};
									if(appartment.picture != undefined && appartment.picture.versions.length > 0) {
										cardImg.altText = appartment.picture.description;
										appartment.picture.versions.forEach(function(image) { 
											if(image.versionsName == 'card') {
												cardImg.url = image.link;
											}
										});
										
									}
									if(appartment.listingType != undefined && appartment.listingType != '') {
										roomType.push(appartment.listingType)
									}
									homeList.push({
										homeID: appartment.homeId,
										banner: cardImg,
										cityName:appartment.cityName,
										name:appartment.name,
										neighborhoodName:appartment.neighbourhoodName,
										address:appartment.address,
										description: (appartment.description != null && appartment.description.length > 100) ? appartment.description.substring(0, 100) + '...' : appartment.description,
										startingPrice: startingPrice,
										priceCurrency: priceCurrency,
										availability: appartment.availability,
										roomType: roomType,
										totalBedrooms: appartment.totalBedrooms,
										mapLocation: appartment.mapLocation
									})
								}
							});
							commit('setHomeLists', homeList)
							//resolve(appartments)
						}
					}).catch(error => {
						console.log(error)
						// request failed 
						//reject(error) // return error to calling function
					})
				//})				
			}, */
		},
		getters: {
			getHomeList(state) {
				return state.homeList;
			},
		}
    })
}

export default mainStore;