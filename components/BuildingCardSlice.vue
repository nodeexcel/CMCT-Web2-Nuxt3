<template>
	<div class="image-map-section">
	  <b-row  ref="map-block" class="d-flex mx-0">
		<!-- {{newHomeLists}} -->
		<b-col cols="12" v-if="slice.primary.map === true">
		  <div class="showHideButton">
			<button
			  v-show="showToggleButton && isDisplayMode"
			  :style="{
				'background-color': divider_and_button_color,
				'border-color': divider_and_button_color,
			  }"
			  class="btn sticky-toggle-map-button mb-5"
			  @click="showMapOrList()"
			>
			  <span v-show="isMap">Show List</span>
			  <span v-show="isList">Show Map</span>
			</button>
			<button
			  v-show="showToggleButton"
			  id="sticky-map-button"
			  :style="{
				'background-color': divider_and_button_color,
				'border-color': divider_and_button_color,
			  }"
			  class="btn toggle-map-button mb-5"
			  @click="showMapOrList()"
			>
			  <span v-show="isMap">Show List</span>
			  <span v-show="isList">Show Map</span>
			</button>
		  </div>
		</b-col>
		<b-col
		  :cols="slice.primary.map ? '8 image-map-col-1 px-0' : 12"
		  :class="[isList ? (!isMap ? 'col-12' : '') : 'map-hide']"
		>
		  <div class="building-main-outer">
			<div
			  :class="
				'inner-content-wrapper ' +
				[
				  slice != undefined &&
				  slice.primary.slice_section == 'similar_cards'
					? 'remove-right-padding'
					: '',
				]
			  "
			>
			  <div class="cms-main-wrap building-cms">
				<div class="row mb-2 mb-md-4 pb-md-1 align-items-center">
				  <div class="col-sm-6 col-md-8 text-left">
					<div
					  v-if="
						slice != undefined && slice.primary.title != undefined
					  "
					  class="title map-image-heading mb-2"
					>
					  <prismic-rich-text
						:field="slice.primary.title"
						class="title map-image-heading"
					  />
					</div>
					<div class="map-image-subheading">
					  <prismic-rich-text
						:field="slice.primary.subtitle"
						v-if="slice.primary.subtitle"
						class="map-image-subheading"
					  />
					  <p>{{ currentHomeLists.length }} {{ resultFor }}</p>
					  <b-button
					    v-if="temp !== true"
						@click="changeList()"
						style="background-color: #72BF44; border: none;"
						>See By
						{{
						  resultFor === "Rooms" ? "Homes" : "Rooms"
						}}</b-button>
					</div>
				  </div>
				  <div
					v-if="!hideFilter"
					class="building-filter form-cms-build px-3 col-sm-6 col-md-4 text-left text-md-right input-serach-main mt-3 mt-md-0"
				  >
					<div class="sort-by-filter sort-filter">
					  <div class="item-wrap">
						<b-button
						  variant="outline-primary"
						  class="text-left d-flex justify-content-between align-items-baseline ml-sm-0 mr-sm-auto ml-md-auto mr-md-0"
						  @click="openFilterbox('sortBy')"
						  :style="background"
						>
						  <!-- <b-icon-filter-left :style="{'color': divider_and_button_color}"></b-icon-filter-left>  -->
						  <span>Sort by </span>
						  <!-- <i
							class="fa fa-sort-desc dropdown-icon"
							aria-hidden="true"
						  ></i> -->
						  <!-- <div class="sort-label" :style="{color: '#fffffff'}">{{ resFilter.sortBy }}, {{ resFilter.sortBy1 }}</div> -->
						</b-button>
					  </div>
					  <div
						v-show="filterBox.sortBy"
						class="box row"
						:style="background"
					  >
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<template v-slot:prepend>
							  <b-input-group-text
								:style="{
								  'background-color': '#72BF44',
								}"
							  >
								SORT BY
							  </b-input-group-text>
							</template>
							<b-form-select
							  v-model="searchFilter.sortBy"
							  :options="sortByOptions"
							  class="form-inputs"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<template v-slot:prepend>
							  <b-input-group-text
								:style="{
								  'background-color': '#72BF44',
								}"
							  >
								SORT BY
							  </b-input-group-text>
							</template>
							<b-form-select
							  v-model="searchFilter.sortBy1"
							  :options="sortByOptions1"
							  class="form-inputs"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<div class="col-sm-12 text-center submit-btn">
						  <b-button
							id="sort_by"
							variant="primary"
							@click="sortResult('sortBy', $event)"
							:style="{
							  'background-color': divider_and_button_color,
							}"
							>UPDATE</b-button
						  >
						</div>
					  </div>
					</div>
				  </div>
				</div>
				<div
				  v-if="!hideFilter"
				  class="building-filter row form-cms-build mb-4 mb-sm-3 mb-md-4 pb-md-2 mb-xl-5 pb-xl-3"
				>
				  <div
					class="col-12 col-lg-4 col-xl-2 input-serach-main mb-sm-3 mb-lg-0"
				  >
					<div class="filter-item">
					  <div class="filter-item-type text-left mb-2">City</div>
					  <div class="item-wrap text-left text-lg-center">
						<b-button
						  variant="outline-primary"
						  @click="openFilterbox('city')"
						  v-if="typeof resFilter.area == 'object'"
						>
						  <!-- <b-icon-geo-alt :style="{'color': divider_and_button_color}"></b-icon-geo-alt> 
												  {{ resFilter.city}},<br/> -->
								<span>{{ resFilter.area.join(",") }}</span>
						  <i
							class="fa fa-sort-desc dropdown-icon"
							aria-hidden="true"
						  ></i>
						</b-button>
					  </div>
					  <div
						v-show="filterBox.city"
						class="box row"
						:style="background"
					  >
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
							<div class="position-relative w-100">
							  <b-form-input
								list="city-list-id"
								autocomplete="off"
								class="form-inputs ct-filter-selector w-100"
								required
								v-model="searchFilter.city"
								:style="{
								  'border-color': background_color,
								  color: background_color,
								}"
								@change="cityChange()"
							  ></b-form-input>
  
							  <datalist id="city-list-id">
								<option
								  v-for="(city, index) in cities"
								  :key="index"
								>
								  {{ city }}
								</option>
							  </datalist>
							  <!-- <i class="fa fa-sort-desc city-dropdown-arrow" aria-hidden="true"></i> -->
							</div>
						  </b-input-group>
						</b-form-group>
						<!-- <b-form-group class="col-lg-12 col-md-12 col-sm-12">
													  <b-input-group prepend="AREA" class="input-group mb-2 mr-sm-2 mb-sm-0">
														  <b-form-input list="area-list-id" autocomplete="off" 
														  class="form-inputs"
														  placeholder="Required Field"
														  required
														  v-model="searchFilter.area"></b-form-input>
															  <datalist id="area-list-id">
																  <option v-for="(area, index) in areas" :key="index">{{ area }}</option>
															  </datalist>
													  </b-input-group>
												  </b-form-group> -->
						<BFormGroup
						  class="col-lg-12 col-md-12 col-sm-12 neighbourhood-check"
						>
						  <!-- <b-input-group
							class="neighbour mb-2 mr-sm-2 mb-sm-0 city-list-main"
						  > -->
							<template v-slot:prepend>
							  <b-input-group-text
								:style="{ 'background-color': '#72bf44' }"
							  >
								AREA
							  </b-input-group-text>
							</template>
							<BFormCheckboxGroup
							  id="neighbour"
							  @change="areaChange($event)"
							  class="form-inputs custom-checkbox-true checkbox-dropdown"
							  v-model="searchFilter.area"
							  :options="areas"
							  name="flavour-1"
							></BFormCheckboxGroup>
						  <!-- </b-input-group> -->
						  <!-- :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color, '--divider-and-button-color': divider_and_button_color}" -->
						</BFormGroup>
						<div class="col-sm-12 text-center submit-btn">
						  <b-button
							variant="primary"
							class="city-filter"
							@click="searchResult('city', $event)"
							:style="{
							  'background-color': divider_and_button_color,
							}"
							>UPDATE</b-button
						  >
						</div>
					  </div>
					</div>
				  </div>
				  <div
					class="col-12 col-lg-4 col-xl-2 input-serach-main mb-sm-3 mb-md-0"
				  >
					<div class="filter-item" id="Start-of-Stay-popover">
					  <div class="filter-item-type text-left mb-2">
						Start of Stay
					  </div>
					  <div class="item-wrap text-left text-lg-center">
						<b-button
						  variant="outline-primary"
						  @click="openFilterbox('sos')"
						>
						  <!-- <b-icon-calendar :style="{'color': divider_and_button_color}"></b-icon-calendar>  -->
						  <span>{{ resFilter.sos }}</span>
						  <i
							class="fa fa-sort-desc dropdown-icon"
							aria-hidden="true"
						  ></i>
						</b-button>
					  </div>
					  <div
						v-show="filterBox.sos"
						class="box row"
						:style="background"
					  >
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<!-- <template v-slot:prepend>
														  <b-input-group-text
															  :style="{'background-color': background_color,
																  'border-color': background_color}" >
															  START OF STAY
														  </b-input-group-text>
													  </template> -->
							<b-form-select
							  id="los2"
							  v-model="searchFilter.sos"
							  :options="sosOptions"
							  class="form-inputs ct-filter-selector w-100"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							  required
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<div class="col-sm-12 text-center submit-btn">
						  <b-button
							id="sos-filter"
							variant="primary"
							@click="searchResult('sos', $event)"
							:style="{
							  'background-color': divider_and_button_color,
							}"
							>UPDATE</b-button
						  >
						</div>
					  </div>
					</div>
				  </div>
				  <div class="sos-popover">
					<b-popover v-if="currentHomeLists.length <= 3 &&  currentHomeLists.length > 0" target="Start-of-Stay-popover" :show="PopOverSos" :disabled="disabledPopOver" placement="top">
						<div class="d-flex justify-content-end">
                          <i class="fa fa-times" aria-hidden="true" @click="closeSosPopover()"></i>
                        </div>
						<div class="d-flex mascot-row">
						  <span class="col-3 col-lg-3 col-md-3 col-sm-3 pl-2"><img class="mascot-image ml-1" src="~/public/gif_Butler.gif" alt="popover_logo"/></span>
						  <span class="pop-text col-9 col-lg-9 col-md-9 col-sm-9 mascot-text" v-if="resultFor == 'Rooms'"> If your start date is flexible, there are more rooms matching your criteria here (<span v-if="sosOptions.some(obj => obj.text === 'Immediately')">{{ immediateLength1 }} rooms available immediately</span>
						  <span v-if="sosOptions.some(obj => obj.text === 'Next two weeks') && sosOptions.some(obj => obj.text === 'Immediately')">,</span><span v-if="sosOptions.some(obj => obj.text === 'Next two weeks')"> {{nextTwoWeeksLength2}}  rooms available  within the next two weeks</span> 
						  <span v-if="(sosOptions.some(obj => obj.text === 'Next two weeks') || sosOptions.some(obj => obj.text === 'Immediately')) && sosOptions.some(obj => obj.text === 'Two weeks to a month')">, </span><span v-if="sosOptions.some(obj => obj.text === 'Two weeks to a month')">{{twoWeeksToAmonthlength3}}  rooms available two weeks to a month from now</span> 
						  <span v-if="(sosOptions.some(obj => obj.text === 'Next two weeks') || sosOptions.some(obj => obj.text === 'Immediately') || sosOptions.some(obj => obj.text === 'Two weeks to a month')) && sosOptions.some(obj => obj.text === 'More than a month')">,</span>
						  <span v-if="sosOptions.some(obj => obj.text === 'More than a month')">{{ moreThanAMonthlength4 }}  rooms available more than a month from now</span>)</span>
						</div>
					</b-popover>
				</div>
				  <div
					class="col-12 col-lg-4 col-xl-2 input-serach-main mb-sm-3 mb-md-0"
				  >
					<div class="filter-item">
					  <div class="filter-item-type text-left mb-2">Budget</div>
					  <div class="item-wrap text-left text-lg-center">
						<b-button
						  variant="outline-primary"
						  @click="openFilterbox('price')"
						>
						  <!-- <b-icon-credit-card :style="{'color': divider_and_button_color}"></b-icon-credit-card> -->
						  {{
							resFilter.minPrice != null &&
							resFilter.maxPrice != null
							  ? "$" +
								Number(resFilter.minPrice).toLocaleString() +
								" - $" +
								Number(resFilter.maxPrice).toLocaleString()
							  : " Any Price"
						  }}
						  <i
							class="fa fa-sort-desc dropdown-icon"
							aria-hidden="true"
						  ></i>
						</b-button>
					  </div>
					  <div
						v-show="filterBox.price"
						class="box row"
						:style="background"
					  >
						<!-- <b-form-group class="col-lg-12 col-md-12 col-sm-12">
												  <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
													  <template v-slot:prepend>
														  <b-input-group-text
															  :style="{'background-color': background_color,
																  'border-color': background_color}" >
															  BUDGET
														  </b-input-group-text>
													  </template>
													  <b-form-spinbutton
														  class="form-inputs"
														  id="sb-days"
														  v-model="searchFilter.price"
														  :formatter-fn="curFormatter"
														  :style="{'border-color': background_color, 'color': background_color}"
														  min="1000"
														  max="5000"
														  step="100"
														  required
														  ></b-form-spinbutton>
												  </b-input-group>
											  </b-form-group> -->
  
						<!-- =========[Range-Start]=========== -->
						<div class="mainRangeSlide">
						  <div class=" ">
							<div
							  class="d-flex align-items-center justify-content-between mb-3"
							>
							  <div class="min-value numberVal">
								<input
								  type="text"
								  class=""
								  value="900"
								  disabled
								/>
							  </div>
							  <div class="max-value numberVal">
								<input
								  type="text"
								  class="border text-center"
								  value="5,000"
								  disabled
								/>
							  </div>
							</div>
							<div class="range-slider">
							  <div class="progress"></div>
							  <span class="range-min-wrapper">
								<input
								  class="range-min"
								  type="range"
								  min="900"
								  step="100"
								  max="5000"
								  v-model="searchFilter.minPrice"
								/>
								<!-- <span class="range-min-value">0</span> -->
							  </span>
  
							  <span class="range-max-wrapper">
								<input
								  class="range-max"
								  type="range"
								  min="900"
								  step="100"
								  max="5000"
								  v-model="searchFilter.maxPrice"
								/>
								<!-- <span class="range-max-value">100</span> -->
							  </span>
							</div>
						  </div>
						</div>
						<!-- =========[Range-End]=========== -->
						<div class="col-sm-12 text-center submit-btn">
						  <b-icon
							icon="arrow-repeat"
							class="reset-price"
							@click="searchResult('resetPrice', $event)"
						  ></b-icon>
						  <b-button
							variant="primary"
							@click="searchResult('price', $event)"
							:style="{
							  'background-color': divider_and_button_color,
							}"
							>UPDATE</b-button
						  >
						</div>
					  </div>
					</div>
				  </div>
  
				  <!-- Room Type filter -->
				  <div
					class="col-12 col-lg-4 col-xl-2 input-serach-main mb-sm-3 mb-md-0"
				  >
					<div class="filter-item">
					  <div class="filter-item-type text-left mb-2">Room Type</div>
					  <div class="item-wrap text-left text-lg-center">
						<b-button
						  variant="outline-primary"
						  @click="openFilterbox('bathroomType')"
						>
						  {{ resFilter.bathroomType }}, {{ resFilter.forCouples }}
						  <i
							class="fa fa-sort-desc dropdown-icon"
							aria-hidden="true"
						  ></i>
						</b-button>
					  </div>
					  <div
						v-show="filterBox.bathroomType"
						class="box row"
						:style="background"
					  >
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<b-form-select
							  id="room_type"
							  v-model="searchFilter.bathroomType"
							  :options="bathroomTypeOptions"
							  class="form-inputs ct-filter-selector w-100"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							  required
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<b-form-select
							  id="forCouples"
							  v-model="searchFilter.forCouples"
							  :options="forCouplesOptions"
							  class="form-inputs ct-filter-selector w-100"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							  required
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<div class="col-sm-12 text-center submit-btn">
						  <b-button
							variant="primary"
							@click="searchResult('roomType', $event)"
							:style="{
							  'background-color': divider_and_button_color,
							}"
							>UPDATE</b-button
						  >
						</div>
					  </div>
					</div>
				  </div>
  
				  <div
					class="col-12 col-lg-4 col-xl-4 input-serach-main mb-sm-3 mb-md-0 idealFor"
				  >
					<div class="filter-item" id="ideal-for-popover">
					  <div class="filter-item-type text-left mb-2">Ideal For</div>
					  <div class="item-wrap text-left text-lg-center">
						<b-button
						  variant="outline-primary"
						  @click="openFilterbox('idealFor')"
						>
						  <!-- <b-icon-check :style="{'color': divider_and_button_color}"></b-icon-check> -->
						  {{ resFilter.gender }}, {{ resFilter.aboutMe }}, {{ resFilter.ageGroup }},
						  {{ resFilter.nationality }}
						  <i
							class="fa fa-sort-desc dropdown-icon"
							aria-hidden="true"
						  ></i>
						</b-button>
					  </div>
					  <div
						v-show="filterBox.idealFor"
						class="box row"
						:style="background"
					  >
			            <b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<b-form-select
							  id="gender"
							  v-model="searchFilter.gender"
							  :options="genderOptions"
							  autocomplete="true"
							  class="form-inputs"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							  required
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
							<b-input-group
								class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
							>
								<b-form-select
								id="los2"
								v-model="searchFilter.aboutMe"
								:options="aboutMeOptions"
								class="form-inputs"
								:style="{
									'border-color': background_color,
									color: background_color,
								}"
								required
								></b-form-select>
							</b-input-group>
						</b-form-group>
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label"
						  >
							<b-form-select
							  id="ageGroup"
							  v-model="searchFilter.ageGroup"
							  :options="ageGroupOptions"
							  class="form-inputs"
							  :style="{
								'border-color': background_color,
								color: background_color,
							  }"
							  required
							></b-form-select>
						  </b-input-group>
						</b-form-group>
						<b-form-group class="col-lg-12 col-md-12 col-sm-12">
						  <b-input-group
							class="input-group mb-2 mr-sm-2 mb-sm-0 big-label search-ct-imput"
						  >
							<!-- <vue-multiselect
							  v-model="searchFilter.nationality"
							  :options="nationalityOptions"
							  :multiple="false"
							  placeholder="Select nationality"
							  class="form-inputs ct-dropdown-selector"
							  required
							></vue-multiselect> -->
							<!-- <b-form-select
														  filter
														  id="ageGroup"
														  v-model="searchFilter.nationality"
														  :options="nationalityOptions"
														  class="form-inputs"
														  :style="{'border-color': background_color, 'color': background_color}"
														  required>
													  </b-form-select> -->
						  </b-input-group>
						</b-form-group>
						<div class="col-sm-12 text-center submit-btn">
						  <b-button
							variant="primary"
							id="IdealFor"
							@click="searchResult('idealFor', $event)"
							:style="{
							  'background-color': divider_and_button_color,
							}"
							>UPDATE</b-button
						  >
						</div>
					  </div>
					</div>
					
				  </div>
				  
				</div>
				<!-- close_popover -->
				<b-popover target="ideal-for-popover" :show="showPopOver" :disabled="disabledPopOver" placement="top">
					    <div class="d-flex justify-content-end">
                          <i class="fa fa-times ml-3" aria-hidden="true" @click="closeIdealForPopover()"></i>
                        </div>
						<div class="d-flex  mascot-row-idealfor">
						  <span class="col-3 col-lg-3 col-md-3 col-sm-3 p-0"><img class="mascot-image-idealfor ml-1" src="~/public/Butler_Cartoon_Waving.gif" alt="popover_logo"/></span>
						  <span class="pop-text col-9 col-lg-9 col-md-9 col-sm-9 mascot-text">Let us help you find your perfect new home. Click here to start!</span>
					    </div>
					</b-popover>
				<div
				  :class="
					[slice != undefined ? '' : 'row'] + ' row building-card'
				  "
				>
				  <template
					v-if="
					  slice != undefined &&
					  slice.primary.slice_section != undefined &&
					  slice.primary.slice_section == 'similar_cards'
					"
				  >
					<VueHorizontalList
					  :items="newHomeLists"
					  :options="options"
					  class="card-main"
					>
					  <template v-slot:default="{ item }">
						<div class="item">
						  <div class="content-wrap">
							<NuxtLink
							  :to="'/findahome/' + item.homeID"
							  class="card-link"
							  :id="'HomeDetails Card - ' + item.homeID"
							>
							  <div class="room-image">
								<img
								  v-if="item.banner.url == ''"
								  src="~/assets/img/noImageAvailable.png"
								  :alt="item.banner.altText"
								  class="w-100 d-block"
								/>
								<img
								  v-else
								  :data-src="item.banner.url"
								  class="lazyload w-100 d-block"
								  :key="item.banner.url"
								  :alt="item.banner.altText"
								/>
								<div class="overlay">
								  <template
									v-if="
									  (item.availability != null &&
										item.availability == 'Available') ||
									  item.availability == 'Available soon' ||
									  item.availability ==
										'At least a room available'
									"
								  >
									<p
									  :style="{
										'background-color': getclass(
										  item.availability
										),
										'border-color': getclass(
										  item.availability
										),
									  }"
									>
									  {{ item.availability }}
									</p>
								  </template>
								</div>
								<div class="promo-overlay" v-if="item.isPromo">
								  <p>Promotion</p>
								</div>
							  </div>
							  <div class="desc-box">
								<div class="desc">
								  {{
									item.neighborhoodName != undefined
									  ? item.neighborhoodName
									  : ""
								  }}
								</div>
								<div class="name">{{ item.name }}</div>
								<div class="address">
								  <p>{{ item.address }}</p>
								</div>
								<div class="building-bottom-content">
								  <div class="price">
									<p>
									  {{ item.totalBedrooms }} bedrooms available
									</p>
									<p v-if="item.startingPrice != 0">
									  Starting from {{ item.priceCurrency
									  }}{{
										Number(
										  item.startingPrice
										).toLocaleString()
									  }}/mo
									</p>
								  </div>
								</div>
							  </div>
							</NuxtLink>
						  </div>
						</div>
					  </template>
					</VueHorizontalList>
				  </template>
				  <!-- Similar Homes: END--->
				  <template v-else>
					<div
					  v-for="item in currentHomeLists"
					  :key="item.homeID + '' + item.roomID ? item.roomID : ''"
					  :class="
						'card-main ' +
						[
						  defaultFilter.map == true
							? 'card-main-box-content col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12 text-left px-0 px-sm-3 mb-4 pb-lg-2 mb-xl-5 pb-xl-3'
							: 'col-lg-3 col-sm-6 col-xs-12',
						]
					  "
					>
					  <div class="content-wrap h-100">
						<NuxtLink
						  :to="'/findahome/' + item.homeID"
						  class="card-link"
						  :id="'HomeDetails Card - ' + item.homeID"
						>
						  <div class="room-image">
							<nuxt-img
							  v-if="item.banner.url == ''"
							  src="~/assets/img/noImageAvailable.png"
							  :alt="item.banner.altText"
							  class="w-100 d-block"
							  format="webp"
							/>
							<!-- <prismic-image v-else  :field="item.image"  /> -->
							<nuxt-img
							  v-else
							  :src="item.banner.url"
							  :key="item.banner.url"
							  class="lazyload w-100 d-block full-width-image"
							  :alt="item.banner.altText"
							  format="webp"
							/>
							<div
							  class="overlay"
							  v-if="item.listingType == 'whole apartment'"
							>
							  <p
								v-if="
								  item.availability != null &&
								  item.availability != 'Fully booked'
								"
								:style="{
								  'background-color': getclass(item.availability),
								  'border-color': getclass(item.availability),
								}"
							  >
								<span
								  class="changeFormat"
								  style="text-transform: initial !important"
								  >{{ item.availability }}</span
								>
							  </p>
							</div>
							<div
							  class="overlay"
							  v-else-if=" slice.primary.for_students_only !== null || slice.primary.for_students_only !== undefined
							  "
							>
							<p
								v-if="
								  item.availability != null &&
								  item.availability != 'Partially available'
								"
								:style="{
								  'background-color': getclass(item.availability),
								  'border-color': getclass(item.availability),
								}"
							  >
								<span
								  class="changeFormat"
								  style="text-transform: initial !important"
								  >{{ item.availability }}</span
								>
							  </p>
							  <p
								v-else
								style="background-color: rgb(255, 185, 3);border-color:rgb(255, 185, 3)"
							  >
								<span
								  class="changeFormat"
								  style="text-transform: initial !important"
								  >{{ item.availability }}</span
								>
							  </p>
						   </div>
						   
							<div
							  class="overlay"
							  v-else-if="
								isSingaporePage === true &&
								item.availability != 'Fully booked' &&
								item.totalAvailableRooms > 0
							  "
							>
							  <p
								v-if="item.availability != null"
								:style="{
								  'background-color': getclass(item.availability),
								  'border-color': getclass(item.availability),
								}"
								:data-status="item.availability"
							  >
							  <span v-if="resultFor == 'Rooms'">
									<span v-if="item.totalBedsInRoom > 0">
										<span v-if="item.totalBedsInRoom == 1">
											{{ item.totalBedsInRoom }} Bed available
										</span>
										<span v-else>
											{{ item.totalBedsInRoom }} Beds available
										</span>
									</span>
									<span v-else>
										{{ item.availability }}
									</span>
							  </span>
							  <span v-else>
									<span v-if="item.totalAvailableRooms == 1">
										{{ item.totalAvailableRooms }} Room available
									</span>
									<span v-else>
										{{ item.totalAvailableRooms }} Rooms available
									</span>
							  </span>
							  </p>
							  <p v-else>Not Available</p>
							</div>
							<div class="promo-overlay" v-if="item.isPromo">
							  <p>Promotion</p>
							</div>
						  </div>
						  <div class="desc-box">
							<div class="desc mb-1 mb-lg-2">
							  {{
								item.neighborhoodName != undefined
								  ? item.neighborhoodName
								  : ""
							  }}
							</div>
							<h2 class="name mb-2 mb-xl-3">{{ item.name }}</h2>
							<div class="col-4 pl-0">
							 <div v-if="item.forStudents == 1" class="student-logo">
                                <img src="~/public/casamia_forstudents-4@4x.png" alt="student_logo">
                             </div>
							</div>
							<div class="address pb-2 mb-2 pb-xl-4 mb-xl-4">
							  <p>{{ item.address }}</p>
							</div>
							<div class="building-bottom-content">
							  <div
								class="price"
								v-if="
								  item.breakThroughPrice != undefined &&
								  item.isPromo === true
								"
							  >
								<p class="mb-2 mb-xl-1 mb-xl-2" v-if="resultFor !== 'Rooms' && item.rooms !== undefined">
								  {{ item.rooms.length }} bedroom apartment
								</p>
								<p
								  class="mb-1 mb-xl-1 mb-xl-1"
								  v-if="item.idealGender != undefined"
								>
								  Ideal for
								  <img
									v-if="item.idealGender == 'male'"
									title="Male"
									class="idealfor-image"
									src="~/public/male.png"
									:alt="item.idealGender"
									width="25"
									height="25"
								  /><!-- this sets the right image resolution, based on the slice label -->
								  <img
									v-if="item.idealGender == 'female'"
									title="Female"
									class="idealfor-image"
									src="~/public/female.png"
									:alt="item.idealGender"
									width="25"
									height="25"
								  />
								  <span v-if="item.idealGender == 'male and female'">
									<img
									  class="idealfor-image"
									  title="Male"
									  src="~/public/male.png"
									  :alt="item.idealGender"
									  width="25"
									  height="25"
									/>
									or
									<img
									  class="idealfor-image"
									  title="Female"
									  src="~/public/female.png"
									  :alt="item.idealGender"
									  width="25"
									  height="25"
									/>
								  </span>
								  {{ item.idealAge }} years old
								</p>
								<p v-if="item.startingPrice != 0">
								  Starting from {{ item.priceCurrency
								  }}<span style="text-decoration: line-through">{{
									Number(
									  item.breakThroughPrice
									).toLocaleString()
								  }}</span>
								  {{
									Number(item.startingPrice).toLocaleString()
								  }}/mo
								</p>
							  </div>
							  <div class="price" v-else>
								<p v-if="item.totalAvailableRooms">
									<span v-if="resultFor !== 'Rooms' && item.rooms !== undefined">
									{{ item.totalAvailableRooms }} Rooms Available in {{ item.rooms.length }} bedroom apartment
									</span>
								</p>
								<p class="mb-2 mb-xl-1 mb-xl-2" v-else>
									<span v-if="resultFor !== 'Rooms' && item.rooms !== undefined">
									{{ item.rooms.length }} bedroom apartment
									</span>
								</p>
								<p
								  class="mb-1 mb-xl-1 mb-xl-1"
								>
								  Ideal for
								  <img
									v-if="item.idealGender == 'male'"
									title="Male"
									class="idealfor-image"
									src="~/public/male.png"
									:alt="item.idealGender"
									width="25"
									height="25"
								  /><!-- this sets the right image resolution, based on the slice label -->
								  <img
									v-if="item.idealGender == 'female'"
									title="Female"
									class="idealfor-image"
									src="~/public/female.png"
									:alt="item.idealGender"
									width="25"
									height="25"
								  />
								  <span v-if="item.idealGender == 'male and female'">
									<img
									  class="idealfor-image"
									  title="Male"
									  src="~/public/male.png"
									  :alt="item.idealGender"
									  width="25"
									  height="25"
									/>
									or
									<img
									  class="idealfor-image"
									  title="Female"
									  src="~/public/female.png"
									  :alt="item.idealGender"
									  width="25"
									  height="25"
									/>
								  </span>
								  {{ item.idealAge }} years old
								</p>
								<p v-if="item.startingPrice != 0" class="mb-2">
								  Starting from {{ item.priceCurrency
								  }}{{
									Number(item.startingPrice).toLocaleString()
								  }}/mo
								</p>
								<div class="">
									<p>{{ availabilityDate(item.endDate) }}</p>
								</div>
							  </div>
							  <!--  <div class="price">
															  <p>Starting from {{ item.priceCurrency }}{{ Number(item.startingPrice).toLocaleString() }}/mo</p>
														  </div> -->
							</div>
						  </div>
						</NuxtLink>
					  </div>
					</div>
				  </template>
				</div>
			  </div>
			</div>
		  </div>
		</b-col>
		<b-col
		  cols="4 pl-md-0 image-map-col-2"
		  :class="[isMap ? (!isList ? 'col-12' : '') : 'map-hide'] + ' map-outer'"
		  v-if="slice.primary.map === true"
		>
		  <!-- <div class="google-map" :id="mapName"></div> -->
		</b-col>
	  </b-row>
	</div>
  </template>
  
  <script>
//   import dataList from '@/assets/mascot_image/data.json';
//   import LottieAnimation   from "lottie-web-vue";
//   import lottie from 'lottie-web';
  import moment from "moment";
//   import Multiselect from "vue-multiselect";
  import VueHorizontalList from "vue-horizontal-list";
  import axios from "axios";
  import countryList from "./countryList.json";
  //import VueSingleSelect from "vue-single-select";
//   import VueMultiselect from "vue-multiselect";
//   import "vue-multiselect/dist/vue-multiselect.min.css";
  function elementInViewport(el) {
	if (el != null) {
	  var top = el.offsetTop;
	  var height = el.offsetHeight;
  
	  while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	  }
  
	  return (
		top >= window.pageYOffset &&
		top + height <= window.pageYOffset + window.innerHeight
	  );
	}
  }
  export default {
	name: "building-cards",
	// components: {
	//   Multiselect,
	//   VueHorizontalList,
	//   VueMultiselect,
	// },
	props: [
	  "slice",
	  "homeLists",
	  "homeListsCopy",
	  "hideFilter",
	  "defaultFilter",
	  "divider_and_button_color",
	  "isSingaporePage",
	  "isSingaporeMasterPage",
	  "listByHouse",
	  "temp"
	],
	data() {
	  return {
        MODE:'prod',
      PROD_END_POINT:'https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes',
      DEV_END_POINT :'https://asia-east2-colivhq-dev.cloudfunctions.net/apiHomes',
      PROD_COLIV_HQ_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVyYXRvcklkIjoiSGFGNm1iMTlMNkF6V1ZhdlByNXQiLCJjb2xpdmhxIjpmYWxzZSwiaWF0IjoxNTkyOTkwNDc2fQ.m5cUdPaf6TErOJUbmSfG2qusUdwQY4QOnv61o-tY0Zk',
      DEV_COLIV_HQ_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVyYXRvcklkIjoidk9yWkxrY2kyb2lWb1plZlZTWmIiLCJjb2xpdmhxIjp0cnVlLCJpYXQiOjE1OTExMDMyMjh9.qsB8ioqPm197CFxnN-SPAr3UJFHeNhH6fTQ2L652nzA',
		sosOptionsCopy:[],
		immediateLength1:null,
		nextTwoWeeksLength2:null,
		twoWeeksToAmonthlength3:null,
		moreThanAMonthlength4:null,
		disabledPopOver: true,
		showPopOver: false,
		PopOverSos: false,
		boxtype:null,
		filter: "",
		background_color: "#000",
		showToggleButton: false,
		isMap: false,
		isList: true,
		isDisplayMode: true,
		newHomeListsAfterFiltercopy:[],
		markerCoordinatesforStudents: [],
		markerCoordinates: [],
		map: null,
		bounds: null,
		totalResult: null,
		markerIcon: "/mapMarker.png",
		custerIcon: "/cluster",
		mapName: "location-multi-map",
		value: [],
		options: {
		  responsive: [
			{ end: 576, size: 1 },
			{ start: 576, end: 768, size: 2 },
			{ start: 768, end: 992, size: 4 },
			{ size: 4 },
		  ],
		  list: {
			// 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
			//windowed: 1200,
			// Because: #app {padding: 80px 24px;}
			padding: 0,
		  },
		  navigation: {
			// when to show navigation
			start: 359,
		  },
		},
		//newHomeLists: [],
		newHomeLists: this.homeLists,
		cities: [],
		areas: ["Any Area"],
		cityArea: {},
		resFilter: {
		  city: "Any City",
		//   area: ["Any Area"],
		//   sos: "Any",
		  aboutMe: "About Me",
		  price: null,
		//   minPrice: null,
		//   maxPrice: null,
		  roomType: "Any Type",
		//   bathroomType: "Any Type",
		  sortBy: "Availability",
		  sortBy1: "Price",
		//   gender: "Any Gender",
		//   ageGroup: "Any Age",
		//   nationality: "Any",
		//   forCouples: "Any",
		  area: this.$route.query.area !== undefined ? this.$route.query.area:["Any Area"],
		  sos: this.$route.query.startofstay !== undefined ? this.$route.query.startofstay:"Any",
		  bathroomType: this.$route.query.bathroomtype !== undefined ? this.$route.query.bathroomtype:"Any Type",
		  forCouples: this.$route.query.forCouples !== undefined ? this.$route.query.forCouples :"Any",
		  gender: this.$route.query.idealforgender !== undefined ? this.$route.query.idealforgender:"Any Gender",
		  maxPrice: this.$route.query.maxPrice !== undefined ? this.$route.query.maxPrice:null,
		  minPrice: this.$route.query.minPrice !== undefined ? this.$route.query.minPrice:null,
		  ageGroup: this.$route.query.idealforage !== undefined ? this.$route.query.idealforage:"Any Age",
		  nationality: this.$route.query.idealfornationality !== undefined ? this.$route.query.idealfornationality:"Any",
		},
		searchFilter: {
		  city: "",
		  area: ["Any Area"],
		  sos: "Any",
		  aboutMe: "About Me",
		  price: null,
		  minPrice: 900,
		  maxPrice: 5000,
		  roomType: "Any Type",
		  bathroomType: "Any Type",
		  sortBy: "Availability",
		  sortBy1: "Price",
		  gender: "Any Gender",
		  ageGroup: null,
		  nationality: "Any",
		  forCouples: "Any",
		},
		sosOptions: [
		  { text: "Any", value: "Any" },
		  { text: "Immediately", value: "Immediately" },
		  { text: "Next two weeks", value: "Next two weeks" },
		  { text: "Two weeks to a month", value: "Two weeks to a month" },
		  { text: "More than a month", value: "More than a month" },
		  /*{ text: 'Within a month', value: 'Within a month'},
				   { text: 'In 2-3 months', value: 'In 2-3 months'},
				  { text: 'More than 3 months from now', value: 'More than 3 months from now'} */
		],
		aboutMeOptions: [
		  { text: "About Me", value: "About Me" },
		  { text: "I’m a working professional", value: "I’m a working professional" },
		  { text: "I’m a student or intern", value: "I’m a student or intern" },
		  /*{ text: 'Within a month', value: 'Within a month'},
				   { text: 'In 2-3 months', value: 'In 2-3 months'},
				  { text: 'More than 3 months from now', value: 'More than 3 months from now'} */
		],
		// roomTypeOptions: [
		//     { text: 'Any Type', value: 'Any Type'},
		//     { text: 'Whole apartment', value: 'whole'},
		//     { text: 'Master (private bathroom)', value: 'master'},
		//     { text: 'Common (shared bathroom)', value: 'common'}
		// ],
		bathroomTypeOptions: [
		  { text: "Select bathroom type", value: "Any Type" },
		  // { text: 'Whole apartment', value: 'whole'},
		  { text: "Private", value: "Private" },
		  { text: "Shared", value: "Shared" },
		],
		forCouplesOptions: [
		  { text: "Select For couples", value: "Any" },
		  // { text: 'Whole apartment', value: 'whole'},
		  { text: "Yes", value: "Yes" },
		  { text: "No", value: "No" },
		],
		sortByOptions: [
		  { text: "Availability", value: "Availability" },
		  { text: "Price", value: "Price" },
		],
		sortByOptions1: [
		  { text: "", value: null },
		  { text: "Availability", value: "Availability" },
		  { text: "Price", value: "Price" },
		],
		genderOptions: [
		  { text: "Select Gender", value: "Any Gender" },
		  { text: "Male", value: "Male" },
		  { text: "Female", value: "Female" },
		],
		ageGroupOptions: [
		  { text: "Select age group", value: null },
		  { text: "18-22", value: "18-22" },
		  { text: "23-27", value: "23-27" },
		  { text: "28-32", value: "28-32" },
		  { text: "33-37", value: "33-37" },
		  { text: "38+", value: "38+" },
		],
		nationalityOptions: [],
		filterBox: {
		  city: false,
		  sos: false,
		  price: false,
		  roomType: false,
		  bathroomType: false,
		  sortBy: false,
		  idealFor: false,
		  forCouples: false,
		},
		seeByRoomsORHome: false,
		resultFor: "",
		newHomeListsAfterFilter: []
	  };
	},
	computed: {
	  background() {
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test("#f7f7f7")) {
		  // Getting the content after '#',
		  let ret = this.divider_and_button_color.slice(1);
		  // Splitting each character
		  ret = ret.split("");
  
		  // Checking if the length is 3
		  // then make that 6
		  if (ret.length == 3) {
			var ar = [];
			ar.push(ret[0]);
			ar.push(ret[0]);
			ar.push(ret[1]);
			ar.push(ret[1]);
			ar.push(ret[2]);
			ar.push(ret[2]);
			ret = ar;
		  }
  
		  // Starts with '0x'(in hexadecimal)
		  ret = "0x" + ret.join("");
  
		  // Converting the first 2 characters
		  // from hexadecimal to r value
		  var r = (ret >> 16) & 255;
  
		  // Converting the second 2 characters
		  // to hexadecimal to g value
		  var g = (ret >> 8) & 255;
  
		  // Converting the last 2 characters
		  // to hexadecimal to b value
		  var b = ret & 255;
  
		  // Appending all of them to make
		  // the RGBA value
  
		  let color = "rgba(" + [r, g, b].join(",") + "," + 0.5 + ")";
		  return {
			"background-color": "#f7f7f7",
			"border-color": "#f7f7f7",
			color: "#000",
		  };
		} else {
		  return {};
		}
	  },
	  currentHomeLists() {
		return this.resultFor === "Homes" ? this.newHomeLists : this.newHomeListsAfterFilter
	  }
	},
	filters: {
	  strippedContent: function (string) {
		if (string != null) {
		  return string.replace(/<\/?[^>]+>/gi, " ");
		}
		return string;
	  },
	},
	methods: {
	closeIdealForPopover(){
		this.showPopOver = false
	  },
	  closeSosPopover(){
        this.PopOverSos = false
	  },
	  availabilityDate(enddate) {
			if(enddate != '' && enddate != null) {
				var todayDate = moment().format("YYYY-MM-DD");
				var pastDate = moment.unix(enddate._seconds, "YYYY-MM-DD").format("YYYY-MM-DD");
				if (moment(pastDate).isBefore(todayDate)) {
					return 'Available from today';
				} else {
					return 'Available from ' + moment.unix(enddate._seconds, "DD-MM-YYYY").add(1, 'days').format('MMMM Do YYYY');
				}
			}
		},
	  priceChanged(value) {
		this.displayPrice = "$" + value + "/month";
	  },
	  areaChange(e) {
		// For unselect any area option
		var lastSelectedItem = e[e.length - 1];
		if (lastSelectedItem == "Any Area") {
		  this.searchFilter.area = ["Any Area"];
		} else if (e.length > 1 && e.includes("Any Area")) {
		  this.searchFilter.area = e.filter((item, index) => {
			if (item != "Any Area") {
			  return item;
			}
		  });
		}
	  },
	  getclass(status) {
		if (status == "Available") {
		  return "#72bf44";
		} else if (
		  status == "At least a room available" ||
		  status == "At least one room available"
		) {
		  return "#72bf44";
		} else if (status == "Available soon") {
		  return "#FFB903";
		} else if (status == "Fully booked") {
		  return "#F55E61";
		}
	  },
	  cityChange() {
		if (!this.cities.includes(this.searchFilter.city)) {
		  this.searchFilter.city = "";
		  this.searchFilter.area = ["Any Area"];
		} else {
		  this.areas = this.cityArea[this.searchFilter.city] || ["Any Area"];
		}
	  },
	  curFormatter(value) {
		return "$" + value + "/month";
	  },
	  openFilterbox(boxType) {
		for (var key in this.filterBox) {
		  if (this.filterBox.hasOwnProperty(key)) {
			if (key == boxType) {
			  this.filterBox[key] = !this.filterBox[key];
			} else {
			  this.filterBox[key] = false;
			}
		  }
		}
	  },
	  sortHomelist() {
		let filteredarray = [];
			if(this.resultFor === 'Rooms'){
			  filteredarray = this.newHomeListsAfterFilter;
			}
			else if(this.slice.primary.for_students_only == true){
			filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy));
		     }
			else{
			  filteredarray = this.newHomeLists;
			}
			let customOrder = ['Available', 'Partially available', 'Available soon', 'Fully booked'];
		if (this.resFilter["sortBy"] == "Availability") {
		  if (this.resFilter["sortBy1"] == "Price") {
			// const customOrder = ['available', 'partially available', 'available soon', 'fully booked'];
			// filteredarray.sort((a, b) =>
			//   a.availability > b.availability
			// 	? 1
			// 	: a.availability === b.availability
			// 	? parseInt(a.startingPrice) > parseInt(b.startingPrice)
			// 	  ? 1
			// 	  : -1
			// 	: -1
			// );
			 // First sort on availibility status and  then sort based on price
				filteredarray.sort((a, b) => {
				const aStatus = customOrder.indexOf(a.availability);
				const bStatus = customOrder.indexOf(b.availability);
				return  aStatus > bStatus
				? 1
				: aStatus === bStatus
				? parseInt(a.startingPrice) > parseInt(b.startingPrice)
				  ? 1
				  : -1
				: -1
				});
		  } else {
			// filteredarray.sort((a, b) =>
			//   a.availability > b.availability ? 1 : -1
			// );
			filteredarray.sort((a, b) => {
				const aStatus = customOrder.indexOf(a.availability);
				const bStatus = customOrder.indexOf(b.availability);
				return  aStatus > bStatus
				? 1
				: -1
				});
		  }
		  //this.newHomeLists.sort((a, b) => (a.availability > b.availability) ? 1 : -1)
		} else {
		  if (this.resFilter["sortBy1"] == "Availability") {
			// filteredarray.sort((a, b) =>
			//   parseInt(a.startingPrice) > parseInt(b.startingPrice)
			// 	? 1
			// 	: parseInt(a.startingPrice) === parseInt(b.startingPrice)
			// 	? a.availability > b.availability
			// 	  ? 1
			// 	  : -1
			// 	: -1
			// ); 
			filteredarray.sort((a, b) => {
				const aStatus = customOrder.indexOf(a.availability);
				const bStatus = customOrder.indexOf(b.availability);
				return parseInt(a.startingPrice) > parseInt(b.startingPrice)
				? 1
				: parseInt(a.startingPrice) === parseInt(b.startingPrice)
				? aStatus > bStatus
				  ? 1
				  : -1
				: -1
				});
			// First sort on price and  then sort based on availibility status
		  } else {
			filteredarray.sort((a, b) =>
			  parseInt(a.startingPrice) > parseInt(b.startingPrice) ? 1 : -1
			);
		  }
		}
		if(this.resultFor === 'Rooms'){
		  this.newHomeListsAfterFilter = filteredarray;
			}
			else{
			  this.newHomeLists  = filteredarray;
			}
	  },
	  sortResult(boxType, event) {
		event.preventDefault();
		this.openFilterbox(boxType);
		this.resFilter[boxType] = this.searchFilter[boxType];
		this.resFilter["sortBy1"] = this.searchFilter["sortBy1"];
		this.sortHomelist();
	  },
	 changeList() {
		console.log("ok")
		let homeList = []
		const searchResultsFor = this.resultFor === "Homes" ? "Rooms" : "Homes"
		if(this.isSingaporeMasterPage) {
		  if(searchResultsFor === "Homes") {
			  this.listByHouse.forEach(function (appartment) {
			  let roomType = [];
			  let priceCurrency = "";
			  let startingPrice = 99999;
			  let isPromo = false;
			  let totalAvailableRooms = 0;
			  let availability = null;
			  let endDate = null ;
			  let forCouple = null ;
			  if (appartment.rooms != undefined && appartment.rooms.length > 0) {
				// Extract unique room price
				let roomPrice = [];
				appartment.rooms.forEach(function (item, i) {
					 availability = item.availability;
					 endDate = item.endDate; ;
					 forCouple = item.endDate; ;
				  if (
					item.availability == "Available" ||
					item.availability == "Available soon"
				  ) {
					totalAvailableRooms += 1;
					if (item.startingPrice != undefined) {
					  roomPrice.push({
						startingPrice: item.startingPrice,
						priceCurrency: item.priceCurrency,
						promoPrice: false,
					  });
					}
					if (
					  item.priceScales != undefined &&
					  item.priceScales.length > 0
					) {
					  item.priceScales.forEach(function (promoRow) {
						if (promoRow.priceType == "Promo") {
						  isPromo = true;
						  roomPrice.push({
							startingPrice: promoRow.priceAmount,
							priceCurrency: item.priceCurrency,
							promoPrice: true,
						  });
						}
					  });
					}
				  }
				});
  
				// Extract unique room type
				roomType = [
				  ...new Set(appartment.rooms.map((item) => item.type)),
				];
  
				// Sort array in assending order ro extract small price
				roomPrice.sort((a, b) =>
				  parseInt(a.startingPrice) > parseInt(b.startingPrice) ? 1 : -1
				);
				if (roomPrice.length > 0) {
				  roomPrice = roomPrice.slice(0, 1); // Extract 1st element from array as starting price
				  startingPrice = roomPrice[0].startingPrice;
				  priceCurrency = roomPrice[0].priceCurrency;
				}
			  }
  
			  var cardImg = {
				url: "",
				altText: "",
			  };
			  if (
				appartment.picture != undefined &&
				appartment.picture.versions.length > 0
			  ) {
				cardImg.altText = appartment.picture.description;
				appartment.picture.versions.forEach(function (image) {
				  if (image.versionsName == "card") {
					cardImg.url = image.link;
				  }
				});
			  }
			  if (
				appartment.listingType != undefined &&
				appartment.listingType != ""
			  ) {
				roomType.push(appartment.listingType);
			  }
			  if (
				appartment.listingType != undefined &&
				appartment.listingType == "whole apartment"
			  ) {
				if (
				  appartment.availability == "Available" ||
				  appartment.availability == "Available soon"
				) {
				  startingPrice = appartment.startingPrice;
				  priceCurrency = appartment.priceCurrency;
				}
			  }
			  let nationality = [];
			  if (appartment.housemates != undefined) {
				appartment.housemates.forEach(function (hm) {
				  if (hm.nationality != null) {
					nationality.push(hm.nationality);
				  }
				});
			  }
			  homeList.push({
				homeID: appartment.homeId ? appartment.homeId : "",
				banner: cardImg,
				cityName: appartment.cityName,
				name: appartment.name,
				neighborhoodName: appartment.neighborhoodName,
				address: appartment.address,
				description:
				  appartment.description != null &&
				  appartment.description.length > 97
					? appartment.description.substring(0, 97) + "..."
					: appartment.description,
				startingPrice: startingPrice,
				priceCurrency: priceCurrency,
				availability: appartment.availability,
				roomType: roomType,
				listingType: appartment.listingType,
				totalBedrooms: appartment.totalBedrooms,
				mapLocation: appartment.mapLocation,
				isPromo: isPromo,
				totalAvailableRooms: totalAvailableRooms,
				rooms: appartment.rooms,
				idealAge: appartment.idealAge,
				idealFor: appartment.idealFor,
				idealGender: appartment.idealGender,
				nationality: nationality,
				neighborhoodName: appartment.neighborhoodName,
				// nationality: appartment.nationality,
				availability: availability,
				endDate: endDate,
				forCouple: forCouple,
				forStudents: appartment.forStudents,
			  });
			});
			this.newHomeListsAfterFilter = [...homeList]
			this.newHomeListsAfterFiltercopy = this.newHomeListsAfterFilter;
			this.resultFor = "Homes"
		  }
		  if(searchResultsFor === "Rooms") {
			this.newHomeListsAfterFilter = []
			this.resultFor = "Rooms"
		  }
		}
		else {
		  if(searchResultsFor === "Rooms") {
			this.newHomeLists.forEach(function (appartment) {
				const totalAvailableRooms = appartment.rooms.filter((roomDetails) => (roomDetails.availability === "Available" || roomDetails.availability === "Available soon")).length
				if (appartment.rooms != undefined && appartment.rooms.length > 0) {
					appartment.rooms.forEach(function (item) {
					let roomType = [];
					let priceCurrency = "";
					let startingPrice = 0;
					let isPromo = false;
					var cardImg = {
					  url: "",
					  altText: "",
					};
					if (item.roomMainPicture != undefined) {
					  cardImg.altText = appartment.banner.altText;
					  cardImg.url = item.roomMainPicture;
					}
					// Extract unique room price
					let roomPrice = [];
	
					if (item.startingPrice != undefined) {
					  roomPrice.push({
						startingPrice: item.startingPrice,
						priceCurrency: item.priceCurrency,
						promoPrice: false,
					  });
					}
					if (
					  item.priceScales != undefined &&
					  item.priceScales.length > 0
					) {
					  item.priceScales.forEach(function (promoRow) {
						if (promoRow.priceType == "Promo") {
						  isPromo = true;
						  roomPrice.push({
							startingPrice: promoRow.priceAmount,
							priceCurrency: item.priceCurrency,
							promoPrice: true,
						  });
						}
					  });
					}
					// Sort array in assending order ro extract small price
					roomPrice.sort((a, b) =>
					  parseInt(a.startingPrice) > parseInt(b.startingPrice) ? 1 : -1
					);
					if (roomPrice.length > 0) {
					  roomPrice = roomPrice.slice(0, 1); // Extract 1st element from array as starting price
					  startingPrice = roomPrice[0].startingPrice;
					  priceCurrency = roomPrice[0].priceCurrency;
					}
					// Extract unique room type
					roomType.push(item.type);
					if (
					  appartment.listingType != undefined &&
					  appartment.listingType != ""
					) {
					  roomType.push(appartment.listingType);
					}
					if (
					  item.availability == "Available" || item.availability == "Available soon"
					) 
					{
					  homeList.push({
						homeID: appartment.homeID ? appartment.homeID : "",
						roomID: item.roomId ? item.roomId : "",
						banner: cardImg,
						cityName: appartment.cityName,
						name:
						  item.roomName != undefined
							? item.roomName + " at " + appartment.name
							: appartment.name,
						address: appartment.address,
						description:
						  appartment.description &&
						  appartment.description.length > 97
							? appartment.description.substring(0, 97) + "..."
							: appartment.description,
						startingPrice: startingPrice,
						priceCurrency: priceCurrency,
						availability: item.availability,
						roomType: roomType,
						bathroomType: item.bathroomType,
						totalBedrooms: appartment.totalBedrooms,
						mapLocation: appartment.mapLocation,
						idealAge: appartment.idealAge,
						idealFor: appartment.idealFor,
						idealGender: appartment.idealGender,
						isPromo: isPromo,
						breakThroughPrice: isPromo ? item.startingPrice : false,
						rooms: appartment.rooms,
						neighborhoodName: appartment.neighborhoodName,
						nationality: appartment.nationality,
						availability: item.availability,
						endDate: item.endDate,
						forCouple: item.forCouple,
						totalAvailableRooms,
						forStudents: appartment.forStudents,
						totalBedsInRoom:item.totalBedsInRoom
					  });
					  homeList.forEach(function(home, i) { 
						if(homeList[i].startingPrice == 99999 || homeList[i].startingPrice == 99998) { 
						  homeList[i].startingPrice = 0
						}
					  })
					}
				  });
				}
			  });
			  this.newHomeListsAfterFilter = [...homeList]
			  this.newHomeListsAfterFiltercopy = this.newHomeListsAfterFilter;
			  this.resultFor = "Rooms"
		  }
		  if(searchResultsFor === "Homes") {
			this.newHomeListsAfterFilter = []
			this.resultFor = "Homes"
		  }
		}
		this.sosOptions= [
		  { text: "Any", value: "Any" },
		  { text: "Immediately", value: "Immediately" },
		  { text: "Next two weeks", value: "Next two weeks" },
		  { text: "Two weeks to a month", value: "Two weeks to a month" },
		  { text: "More than a month", value: "More than a month" },
	    ]
		this.totalResult = null
		this.openFilterbox(this.boxtype);
		this.searchResult(this.boxtype);
		// this.setCoordinates();
		this.sortHomelist();
	  },
	  routeChange() {
		let query = Object.assign({}, this.$route.query);
		console.log("query",query)
		const searchResultsFor = this.resultFor;
		if(this.resultFor == "Rooms"){
			query = { }
			query.byRooms = "";
		}
		if(this.resultFor == "Homes"){
			query = { }
			query.byHomes = "";	  
		}
		if((this.slice.primary.for_students_only == true || this.slice.primary.for_students_only == false) && this.resultFor !== "Rooms"){
			query.byRooms = "";
			this.resultFor == "Rooms"
			this.changeList();
		}
		// if(this.slice.primary.for_students_only == false && this.resultFor == "Homes"){
		// 	query.byRooms = "";
		// 	this.resultFor == "Rooms"
		// 	this.changeList();
		// }
		if (
		  this.resFilter["area"] != "" &&
		  !this.resFilter["area"].includes("Any Area")
		) {
		  query.area = this.resFilter["area"];
		} else {
		  delete query.area;
		}
  
		if (this.resFilter["sos"] != "" && this.resFilter["sos"] != "Any") {
		  query.startofstay = this.resFilter["sos"];
		} else {
		  delete query.startofstay;
		}
		
		if (
		  this.resFilter["minPrice"] != null &&
		  this.resFilter["maxPrice"] != null
		) {
		  query.minPrice = this.resFilter["minPrice"];
		  query.maxPrice = this.resFilter["maxPrice"];
		window.sessionStorage.setItem("minPrice" , this.resFilter["minPrice"]);
		window.sessionStorage.setItem("maxPrice" , this.resFilter["maxPrice"]);
		} else {
			window.sessionStorage.setItem("minPrice" , null);
			window.sessionStorage.setItem("maxPrice" , null);
		  delete query.minPrice;
		  delete query.maxPrice;
		}
		if (
		  this.resFilter["bathroomType"] != "" &&
		  this.resFilter["bathroomType"] != "Any Type"
		) {
		  query.bathroomtype = this.resFilter["bathroomType"];
		  //   added 
		window.sessionStorage.setItem("bathroomType" , this.resFilter["bathroomType"]);
		} else {
			window.sessionStorage.setItem("bathroomType" , null)
		  delete query.bathroomtype;
		}
  
		if (this.resFilter["forCouples"] != "Any") {
		  query.forCouples = this.resFilter["forCouples"];
		window.sessionStorage.setItem("forCouples" , this.resFilter["forCouples"]);
		} else {
		  window.sessionStorage.setItem("forCouples" , null)
		  delete query.forCouples;
		}
  
		if (
		  this.resFilter["roomType"] != "" &&
		  this.resFilter["roomType"] != "Any Type"
		) {
		  query.roomtype = this.resFilter["roomType"];
		window.sessionStorage.setItem("roomType" , this.resFilter["roomType"]);
		} else {
		  window.sessionStorage.setItem("roomType" , null)
		  delete query.roomtype;
		}
  
		if (
		  this.resFilter["gender"] != "" &&
		  this.resFilter["gender"] != "Any Gender"
		) {
		 query.idealforgender = this.resFilter["gender"];
		window.sessionStorage.setItem("gender" , this.resFilter["gender"]);
		}
		else{
			window.sessionStorage.setItem("gender" , null);
			delete query.gender;
		}
  
		if (
		  this.resFilter["ageGroup"] != "" &&
		  this.resFilter["ageGroup"] != "Any Age"
		) {
		  query.idealforage = this.resFilter["ageGroup"];
		  		  //   added 
		window.sessionStorage.setItem("ageGroup" , this.resFilter["ageGroup"]);
		}
		else{
			window.sessionStorage.setItem("ageGroup" , null);
			delete query.ageGroup;
		}
		if (this.resFilter["aboutMe"] != "" && this.resFilter["aboutMe"] != "About Me") 
		{
		  query.idealforaboutMe = this.resFilter["aboutMe"];
		} 
  
		if (
		  this.resFilter["nationality"] != "" &&
		  this.resFilter["nationality"] != "Any"
		) {
		  query.idealfornationality = this.resFilter["nationality"];
		window.sessionStorage.setItem("nationality" , this.resFilter["nationality"]);
		}
		else{
			window.sessionStorage.setItem("nationality" , "Any");
			delete query["idealfornationality"];
		}
  
		this.$router.replace({ query }).catch((error) => {
		  if (error.name != "NavigationDuplicated") {
			throw error;
		  }
		});
		this.sortHomelist();
	  },
	  searchResult(boxType, event) {
		// event.preventDefault();
		this.showPopOver = false
		this.boxtype = boxType;
		this.openFilterbox(boxType);
		if (boxType == "city") {
		  this.resFilter[boxType] = this.searchFilter[boxType];
		  this.resFilter["area"] = this.searchFilter["area"];
		} else if (boxType == "price") {
		  this.resFilter["minPrice"] = this.searchFilter["minPrice"];
		  this.resFilter["maxPrice"] = this.searchFilter["maxPrice"];
		} else if (boxType == "resetPrice") {
		  var inputVal = document.querySelectorAll(".numberVal input");
		  inputVal[0].value = 900;
		  inputVal[1].value = 5000;
		  this.searchFilter["minPrice"] = 900;
		  this.searchFilter["maxPrice"] = 5000;
		  this.resFilter.minPrice = null;
		  this.resFilter.maxPrice = null;
		  this.reserBudgetColor();
		} else if (boxType == "idealFor") {
		  this.resFilter["gender"] = this.searchFilter["gender"];
		  this.resFilter["ageGroup"] = this.searchFilter["ageGroup"];
		  this.resFilter["nationality"] = this.searchFilter["nationality"];
		  this.resFilter["aboutMe"] = this.searchFilter["aboutMe"];
		} else if (boxType === "roomType") {
		  this.resFilter["bathroomType"] = this.searchFilter["bathroomType"];
		  this.resFilter["forCouples"] = this.searchFilter["forCouples"];
		} else {
		  this.resFilter[boxType] = this.searchFilter[boxType];
		}
		let filteredarray1 = [];
		let filteredarray = [];
		if(this.slice.primary.for_students_only == true || this.slice.primary.for_students_only == false){
			// filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy));
			if(this.resultFor === 'Rooms'){
			  filteredarray1 = JSON.parse(JSON.stringify(this.homeListsCopy))
			}
			else{
				filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy))
			}
			if(this.totalResult == null){
			this.totalResult = JSON.parse(JSON.stringify(this.homeListsCopy)).length;
			}
		}
		else{
			if(this.resultFor === 'Rooms'){
			  filteredarray1 = JSON.parse(JSON.stringify(this.newHomeListsAfterFiltercopy));
			  filteredarray = JSON.parse(JSON.stringify(this.newHomeListsAfterFiltercopy));
			  if(this.totalResult == null){
			  this.totalResult = JSON.parse(JSON.stringify(this.newHomeListsAfterFiltercopy)).length;
			}
			}
			else{
				filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy))
				// const target1 = 'Available';
				// const target2 = "At least one room available";
				// filteredarray = filteredarray.filter(item => item.availability === target1 || item.availability === target2 );
				
			}
		}
		// this.newHomeLists = this.homeListsCopy;
		/* if((this.defaultFilter.query_param != undefined && this.defaultFilter.query_param.startofstay != undefined) && (this.defaultFilter.query_param.startofstay != this.resFilter['sos'])) { 
		  let query = Object.assign({}, this.$route.query);
		  delete query.startofstay;
		  this.$router.replace({ query });
		  this.$emit('sosChange');
		} */
  
		// City filter
		if (
		  this.resFilter["city"] != "" &&
		  this.resFilter["city"] != "Any City"
		) {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) => {
			if (
				room.cityName.toLowerCase() == this.resFilter["city"].toLowerCase()
			) {
			  return room;
			}
		  });
			}
			else{
				filteredarray = filteredarray.filter((home) => {
			if (
				home.cityName.toLowerCase() == this.resFilter["city"].toLowerCase()
			) {
			  return home;
			}
		  });
			}
		} else {
		  this.resFilter["city"] = "Any City";
		}
  
		// Area filter
		if (
		  this.resFilter["area"].length > 0 &&
		  !this.resFilter["area"].includes("Any Area")
		) {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) => {
			if (this.resFilter["area"].includes(room.neighborhoodName)) {
			  return room;
			}
		  });
			}
			else{
				filteredarray = filteredarray.filter((home) => {
			if (this.resFilter["area"].includes(home.neighborhoodName)) {
			  return home;
			}
		  });
			}
		} else {
		  this.resFilter["area"] = ["Any Area"];
		}
		//calculateroom
		
		// }
		
		// Start of stay filter
		if (this.resFilter["sos"] != "" && this.resFilter["sos"] != "Any") {
			this.sosOptions= this.sosOptionsCopy
		  if (this.resFilter["sos"] == "Immediately") {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) =>{
				if (
				  room.availability == "Available"
				) {
					    this.PopOverSos = true
						room.availability ="Available";
					    return room;
				}
		  });
		  if(this.sosOptions.some(obj => obj.value === "Immediately")){
		  this.totalResult = this.totalResult - filteredarray1.length
		  }
		  } else{
			filteredarray = filteredarray.filter((home) => {
			  let rmAvailable = false;
			  home.rooms.filter((room) => {{
				if (
				  room.availability == "Available" ||
				  room.availability == "At least a room available"
				) {
				  rmAvailable = true;
				}
			}
			  });
			  if (rmAvailable) {
				this.PopOverSos = true
				return home;
			  }
			});
		  }
		         const keyName = 'text';
				const valueToDelete = "Immediately";
				this.sosOptions = this.sosOptions.filter(obj => obj[keyName] !== valueToDelete);
		  } else if (this.resFilter["sos"] == "Next two weeks") {
			this.sosOptions= this.sosOptionsCopy
				if(this.resultFor === 'Rooms'){
					filteredarray1 = filteredarray1.filter((room) =>{
					if (room.endDate != "" && room.endDate != null) {
						var today = moment().format("YYYY-MM-DD");
					var next2Week = moment().add(14, "days").format("YYYY-MM-DD");
					var pastDate = moment
						.unix(room.endDate._seconds, "YYYY-MM-DD")
						.format("YYYY-MM-DD");
						if (room.availability == "Available"  || room.availability == "Available soon"){
					        this.PopOverSos = true
				          }
					if (moment(pastDate).isBefore(next2Week) &&
						moment(pastDate).isAfter(today)) {
						    
							return room;
					}
					}
			});
			if(this.sosOptions.some(obj => obj.value === "Next two weeks")){
			this.totalResult = this.totalResult - filteredarray1.length
			}
			}else{
			filteredarray = filteredarray.filter((home) => {
				let rmAvailable = false;
				home.rooms.filter((room) => {
				  if (room.endDate != "" && room.endDate != null) {
				  var today = moment().format("YYYY-MM-DD");
				  var next2Week = moment().add(14, "days").format("YYYY-MM-DD");
				  var pastDate = moment
					  .unix(room.endDate._seconds, "YYYY-MM-DD")
					  .format("YYYY-MM-DD");
				  if (
					moment(pastDate).isBefore(next2Week) &&
					moment(pastDate).isAfter(today)
				  ) {
					rmAvailable = true;
				  }
				}
				});
				if (
					home.availability == "Available" ||
					home.availability == "At least a room available"
				){
					this.PopOverSos = true
				}
				if (rmAvailable) {
				  return home;
				} 
			  });
			}
				const keyName = 'text';
				const valueToDelete = "Next two weeks";
				this.sosOptions = this.sosOptions.filter(obj => obj[keyName] !== valueToDelete);
		  } else if (this.resFilter["sos"] == "Two weeks to a month") {
			this.sosOptions= this.sosOptionsCopy
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) =>{
				if (room.endDate != "" && room.endDate != null) {
					var next2Week = moment().add(14, "days").format("YYYY-MM-DD");
					var nextmonth = moment().add(1, "M").format("YYYY-MM-DD");
					var pastDate = moment
					  .unix(room.endDate._seconds, "YYYY-MM-DD")
					  .format("YYYY-MM-DD");
					  if ( room.availability == "Available"  || room.availability == "Available soon"){
					this.PopOverSos = true
				       }
				  if (moment(pastDate).isAfter(next2Week) &&
					  moment(pastDate).isBefore(nextmonth)) {
					    return room;
				  }
				}
		  });
		  if(this.sosOptions.some(obj => obj.value === "Two weeks to a month")){
		  this.totalResult = this.totalResult - filteredarray1.length
		  }
		//   this.twoWeeksToAmonthlength3 = null;
		  }else{
			  filteredarray = filteredarray.filter((home) => {
				let rmAvailable = false;
				home.rooms.filter((room) => {
				  if (room.endDate != "" && room.endDate != null) {
					var next2Week = moment().add(14, "days").format("YYYY-MM-DD");
					var nextmonth = moment().add(1, "M").format("YYYY-MM-DD");
					var pastDate = moment
					  .unix(room.endDate._seconds, "YYYY-MM-DD")
					  .format("YYYY-MM-DD");
					if (
					  moment(pastDate).isAfter(next2Week) &&
					  moment(pastDate).isBefore(nextmonth)
					) {
					  rmAvailable = true;
					}
				  }
				});
				if (
					home.availability == "Available" ||
					home.availability == "At least one room available"
				){
					this.PopOverSos = true
				}
				if (rmAvailable) {
				  return home;
				}
			  });
			}
				const keyName = 'text';
				const valueToDelete = "Two weeks to a month";
				this.sosOptions = this.sosOptions.filter(obj => obj[keyName] !== valueToDelete);
		  } else if (this.resFilter["sos"] == "More than a month") {
			this.sosOptions= this.sosOptionsCopy
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) =>{
				if (room.endDate != "" && room.endDate != null) {
				  var nextmonth = moment().add(1, "M").format("YYYY-MM-DD");
				  var pastDate = moment
					.unix(room.endDate._seconds, "YYYY-MM-DD")
					.format("YYYY-MM-DD");
					if (room.availability == "Available"  || room.availability == "Available soon"){
					this.PopOverSos = true
				}
				  if (moment(pastDate).isAfter(nextmonth)) {
					return room;
				  }
				}
		  });
		  if(this.sosOptions.some(obj => obj.value === "More than a month")){
		  this.totalResult = this.totalResult - filteredarray1.length
		  }
		  }else{
			filteredarray = filteredarray.filter((home) => {
			  let rmAvailable = false;
			  home.rooms.filter((room) => {
				if (room.endDate != "" && room.endDate != null) {
				  var nextmonth = moment().add(1, "M").format("YYYY-MM-DD");
				  var pastDate = moment
					.unix(room.endDate._seconds, "YYYY-MM-DD")
					.format("YYYY-MM-DD");
				  if (moment(pastDate).isAfter(nextmonth)) {
					rmAvailable = true;
				  }
				}
			  });
			  if (
				home.availability == "Available" ||
				home.availability == "At least a room available"
				){
					this.PopOverSos = true
				}
			  if (rmAvailable) {
				return home;
			  }
			});
		}
				const keyName = 'text';
				const valueToDelete = "More than a month";
				this.sosOptions = this.sosOptions.filter(obj => obj[keyName] !== valueToDelete);
		  }
		  if(!(this.sosOptions.some(obj => obj.value === "More than a month") || this.sosOptions.some(obj => obj.value === "Two weeks to a month") || this.sosOptions.some(obj => obj.value === "Next two weeks") || this.sosOptions.some(obj => obj.value === "Immediately"))){
			this.totalResult = 0
		  };
		}
		else 
			{ 
				this.sosOptions= [
					{ text: "Any", value: "Any" },
					{ text: "Immediately", value: "Immediately" },
					{ text: "Next two weeks", value: "Next two weeks" },
					{ text: "Two weeks to a month", value: "Two weeks to a month" },
					{ text: "More than a month", value: "More than a month" },
                 ]
				this.PopOverSos = false	
				this.totalResult = null	
		  }
  
		// Price filter
		if (
		  this.resFilter["minPrice"] != null &&
		  this.resFilter["maxPrice"] != null
		) {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((home) => {
			//if(home.startingPrice <= this.resFilter['price']) {
			if (
			  home.startingPrice >= this.resFilter["minPrice"] &&
			  home.startingPrice <= this.resFilter["maxPrice"]
			) {
			  return home;
			}
		  });
		} 
			else{
				filteredarray = filteredarray.filter((home) => {
			//if(home.startingPrice <= this.resFilter['price']) {
			if (
			  home.startingPrice >= this.resFilter["minPrice"] &&
			  home.startingPrice <= this.resFilter["maxPrice"]
			) {
			  return home;
			}
		  });
		} 
	   }
		else {
		  this.resFilter["price"] = null;
		}
		//  Bathroom type filter
		if (
		  this.resFilter["bathroomType"] != "" &&
		  this.resFilter["bathroomType"] != "Any Type"
		) {
		  if(this.resultFor === 'Rooms'){
			filteredarray1 = filteredarray1.filter((room) =>{
			  if (room.bathroomType === this.resFilter["bathroomType"]) {
			  return room;
			}});
		  }
		  else{
		  filteredarray = filteredarray.filter((home) => {
			if (
			  home.rooms.findIndex(
				(el) => el.bathroomType === this.resFilter["bathroomType"]
			  ) >= 0 
			) {
				return home;
			  }
		  });
		}
		}
  
		// For Couples Filter
		if (this.resFilter["forCouples"] != "Any") {
		  const checkforCouples =
			this.resFilter["forCouples"] === "Yes" ? true : false;
		  if (this.resFilter["bathroomType"] != "Any Type") {
			
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) =>{
			  if (room.bathroomType === this.resFilter["bathroomType"] && room.forCouple === checkforCouples )  {
			  return room;
			}});
		  }else{
			filteredarray = filteredarray.filter((home) => {
			  if (
				home.rooms.findIndex(
				  (el) => el.bathroomType === this.resFilter["bathroomType"]
				) >= 0 &&
				home.rooms.findIndex(
				  (el) => el.forCouple === checkforCouples && el.bathroomType
				) >= 0 
			  ) {
				return home;
			  }
			});
		}
		  } 
		  else {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) =>{
			  if (room.forCouple === checkforCouples )  {
			  return room;
			}});
		  }
		  else{
			filteredarray = filteredarray.filter((home) => {
			  if (
				home.rooms.findIndex((el) => el.forCouple === checkforCouples) >=
				0
			  ) {
				return home;
			  }
			});
		  } 
		  }
		}
  
		// Room type filter
		if (
		  this.resFilter["roomType"] != "" &&
		  this.resFilter["roomType"] != "Any Type"
		) {
		  if (this.resFilter["roomType"] == "whole") {
			filteredarray = filteredarray.filter((home) => {
			  if (home.availability == "Available") {
				return home;
			  }
			});
		  } else {
			filteredarray = filteredarray.filter((home) => {
			  if (home.roomType.includes(this.resFilter["roomType"])) {
				return home;
			  }
			});
		  }
		} else {
		  this.resFilter["roomType"] = "Any Type";
		}
  
		// Gender filter
		if (
		  this.resFilter["gender"] != "" &&
		  this.resFilter["gender"] != "Any Gender"
		) 
		if(this.resultFor === 'Rooms'){
			filteredarray1 = filteredarray1.filter((room) =>{
			  if (!room.idealGender ||
			  room.idealGender == this.resFilter["gender"].toLowerCase() || room.idealGender === "male and female")  {
			  return room;
			}});
		  }
		  else{
			{
		  filteredarray = filteredarray.filter((home) => {
			if (
			  !home.idealGender ||
			  home.idealGender == this.resFilter["gender"].toLowerCase() || home.idealGender === "male and female"
			) {
			  return home;
			}
		  });
		}
		  }
		 else {
		  this.resFilter["gender"] = "Any Gender";
		}
		// About me filter
		if (this.resFilter["aboutme"] != "" && this.resFilter["aboutme"] != "About Me") {
		  if (this.resFilter["aboutMe"] == "I’m a working professional") {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) =>{
				if (room.forStudents !== 1) {
					    return room;
				}
		  });
		  } else{
			filteredarray = filteredarray.filter((home) => {
			if (home.forStudents !== 1
			) {
			  return home;
			}
		  });
		  }
		  } else if (this.resFilter["aboutMe"] == "I’m a student or intern") {
				if(this.resultFor === 'Rooms'){
					filteredarray1 = filteredarray1.filter((room) =>{
					if (
						room["forStudents"] !== undefined
				) {
					    return room;
				}
			});
			}else{
				filteredarray = filteredarray.filter((home) => {
			if (home["forStudents"] !== undefined
			) {
			  return home;
			}
		  });
			}
		  }
		}
  
		// Age filter
		if (
		  this.resFilter["ageGroup"] != "" &&
		  this.resFilter["ageGroup"] != "Any Age" &&
		  this.resFilter["ageGroup"] != null
		) {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) => {
			if ((!room.idealAge || room.idealAge == this.resFilter["ageGroup"]) && this.resFilter["ageGroup"] !== "38+") {
			  if (this.resFilter["ageGroup"] == "33-37")
				  {
					let rmAvailable = false;
					room.roomType.filter((roomType) => {
					if (
					  roomType == "master" 
					) {
					  rmAvailable = true;
					}
				  });
				  if (rmAvailable) {					
					return room;
				  }
				}
			  else{
				return room;
			  }
			}
		  });
		  }
		  else{
			filteredarray = filteredarray.filter((home) => {
			if ((!home.idealAge || home.idealAge == this.resFilter["ageGroup"]) && this.resFilter["ageGroup"] !== "38+") {
			  if (this.resFilter["ageGroup"] == "33-37")
				  {
					let rmAvailable = false;
				  home.roomType.filter((roomType) => {
					if (
					  roomType == "master" 
					) {
					  rmAvailable = true;
					}
				  });
				  if (rmAvailable) {
					return home;
				  }
				}
			  else{
				return home;
			  }
			}
		  });
		  }	  
		} else {
		  this.resFilter["ageGroup"] = "Any Age";
		}
  
		// Nationality filter
		if (
		  this.resFilter["nationality"] != "" &&
		  this.resFilter["nationality"] != "Any"
		) {
			if(this.resultFor === 'Rooms'){
				filteredarray1 = filteredarray1.filter((room) => {
			if (!room.nationality.includes(this.resFilter["nationality"])) {
			    return room;
			}});
		  }
		  else{
			filteredarray = filteredarray.filter((home) => {
			if (!home.nationality.includes(this.resFilter["nationality"])) {
			  return home;
			}
		  });
		  }		  
		} else {
		  this.resFilter["nationality"] = "Any";
		}
		if(this.resultFor === 'Rooms'){
		  this.newHomeListsAfterFilter = JSON.parse(JSON.stringify(filteredarray1));
			}
			else{
			  this.newHomeLists  = JSON.parse(JSON.stringify(filteredarray));
			}
		// this.setCoordinates();
		this.routeChange();
	  },
	  setArea(selCity) {
		this.area = this.cityArea[selCity];
	  },
	//   getCties() {
	// 	axios
	// 	  .get(
	// 		process.env.proxyUrl +
	// 		  "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
	// 		  this.searchFilter.city +
	// 		  "&types=(cities)&key=" +
	// 		  process.env.mapKey
	// 	  )
	// 	  .then((response) => {
	// 		this.cities = [];
	// 		this.cityLatLong = [];
	// 		for (let value of Object.values(response.data.predictions)) {
	// 		  this.cities.push(value.terms[0].value);
	// 		}
	// 	  });
	//   },
	  showMapOrList() {
		this.isMap = !this.isMap;
		this.isList = !this.isList;
		if (this.isMap) {
		  this.toggleMapButton = "List";
		  this.setZoom();
		} else {
		  this.toggleMapButton = "Map";
		}
		this.scrollToMap("map-block");
	  },
	  setCoordinates() {
		if (this.slice.primary.map) {
		  if (this.newHomeLists.length) {
			this.markers = [];
			this.markerCoordinates = [];
			this.markerCoordinatesforStudents = [];
			let  mapCentre = null;
			let buildings = [];
			if(this.newHomeListsAfterFilter.length){
			  buildings = JSON.parse(JSON.stringify(this.newHomeListsAfterFilter));
			}
			else{
			  buildings = JSON.parse(JSON.stringify(this.newHomeLists));
			}
			for (let item of buildings) {
				if((item.forStudents !== null))
				{
					let link = process.env.baseUrl + "/findahome/" + item.homeID;
				    this.markerCoordinates.push({
					latitude: item.mapLocation._latitude,
					longitude: item.mapLocation._longitude,
					name: item.name,
					link: link,
					homeID: item.homeID,
					image: item.banner.url,
			   });
			        mapCentre = this.markerCoordinates[0]
				}
				else{
					let link = process.env.baseUrl + "/findahome/" + item.homeID;
					this.markerCoordinatesforStudents.push({
					latitude: item.mapLocation._latitude,
					longitude: item.mapLocation._longitude,
					name: item.name,
					link: link,
					homeID: item.homeID,
					image: item.banner.url,
					});
				    mapCentre = this.markerCoordinatesforStudents[0]
				}
			}
			this.bounds = new google.maps.LatLngBounds();
			const element = document.getElementById(this.mapName);
			const options = {
			  center: new google.maps.LatLng(
				mapCentre.latitude,
				mapCentre.longitude
			  ),
			  fullscreenControl: false,
			  zoom: 12,
			  mapId: "4df64ef1b112569a",
			};
			this.map = new google.maps.Map(element, options);
			var infowindow = new google.maps.InfoWindow();
			const that = this;
			this.markerCoordinates.forEach((coord) => {
			  if (
				typeof coord.latitude != "undefined" &&
				typeof coord.longitude != "undefined"
			  ) {
				const position = new google.maps.LatLng(
				  coord.latitude,
				  coord.longitude
				);
				const marker = new google.maps.Marker({
				  position,
				  map: this.map,
				  animation: google.maps.Animation.DROP,
				  url: coord.link,
				  icon: this.markerIcon,
				  title: coord.name,
				  homeID: coord.homeID,
				  image: coord.image,
				});
				marker.addListener("mouseover", function () {
				  //infowindow.setContent(coord.name);
				  infowindow.setContent(
					'<div class="map-popup"><a class="cluster-home-link" href="' +
					  coord.link +
					  '"><img class="map-home-img" data-skip-lazy=""  src="' +
					  coord.image +
					  '"/><span>' +
					  coord.name +
					  "</span></a></div>"
				  );
				  infowindow.open(this.map, marker);
				  that.removeLazyLoad();
				});
				marker.addListener("mouseout", function () {
				  infowindow.close(this.map, marker);
				});
				marker.addListener("click", function () {
				  if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				  } else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				  }
				  window.location.href = marker.url;
				});
				this.markers.push(marker);
				this.map.fitBounds(this.bounds.extend(position));
			  }
			});

			this.markerCoordinatesforStudents.forEach((coord) => {
			  if (
				typeof coord.latitude != "undefined" &&
				typeof coord.longitude != "undefined"
			  ) {
				const position = new google.maps.LatLng(
				  coord.latitude,
				  coord.longitude
				);
				const marker = new google.maps.Marker({
				  position,
				  map: this.map,
				  animation: google.maps.Animation.DROP,
				  url: coord.link,
				  icon: this.markerIcon,
				  title: coord.name,
				  homeID: coord.homeID,
				  image: coord.image,
				});
				marker.addListener("mouseover", function () {
				  //infowindow.setContent(coord.name);
				  infowindow.setContent(
					'<div class="map-popup"><a class="cluster-home-link" href="' +
					  coord.link +
					  '"><img class="map-home-img" data-skip-lazy=""  src="' +
					  coord.image +
					  '"/><span>' +
					  coord.name +
					  "</span></a></div>"
				  );
				  infowindow.open(this.map, marker);
				  that.removeLazyLoad();
				});
				marker.addListener("mouseout", function () {
				  infowindow.close(this.map, marker);
				});
				marker.addListener("click", function () {
				  if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				  } else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				  }
				  window.location.href = marker.url;
				});
				this.markers.push(marker);
				this.map.fitBounds(this.bounds.extend(position));
			  }
			});
			var mc = new MarkerClusterer(this.map, this.markers, {
			  zoomOnClick: false,
			  imagePath: this.custerIcon,
			});
			mc.setStyles(
			  mc.getStyles().map(function (style) {
				//style.textColor = '#fb1a4e';
				style.textColor = "#fff";
				style.textSize = 15;
				style.width = 57;
				style.lineHeight = 55;
				return style;
			  })
			);
			mc.addMarkers(this.markers);
			var infoWin = new google.maps.InfoWindow();
  
			google.maps.event.addListener(mc, "clusterclick", function (cluster) {
			  if (this.map.getZoom() > 17) {
				infoWin.close();
				var content = "";
				content += cluster
				  .getMarkers()
				  .map(
					(cl) =>
					  '<div class="map-popup"><a class="cluster-home-link" href="' +
					  cl.url +
					  '"><img class="map-home-img" data-skip-lazy=""  src="' +
					  cl.image +
					  '"/><span>' +
					  cl.title +
					  "</span></a></div>"
				  );
				content = content.split(",").join("");
				var info = new google.maps.MVCObject();
				info.set("position", cluster.center_);
				infoWin.setContent(content);
				infoWin.open(this.map, info);
				that.removeLazyLoad();
			  } else {
				this.map.setCenter(cluster.getCenter());
				this.map.setZoom(this.map.getZoom() + 1);
			  }
			});
  
			google.maps.event.addListener(
			  this.map,
			  "bounds_changed",
			  function () {
				infoWin.close();
				if (that.currentWidth > 768) {
				  var inBoundHome = [];
				  for (var i = 0; i < that.markers.length; i++) {
					if (
					  that.map.getBounds().contains(that.markers[i].getPosition())
					) {
					  inBoundHome.push(that.markers[i].homeID); // in visible bounds
					}
				  }
				  const isHomeInBound = [];
				  that.homeListsCopy.forEach((home, index) => {
					if (inBoundHome.includes(home.homeID)) {
					  isHomeInBound.push(home);
					}
				  });
				  if(this.newHomeListsAfterFilter){
					this.newHomeListsAfterFilter = isHomeInBound
				  }
				  that.newHomeLists = isHomeInBound;
				} /* else {
							  that.newHomeLists = that.homeListsCopy
						  } */
			  }
			);
		  } else {
			const element = document.getElementById(this.mapName);
			const options = {
			  center: new google.maps.LatLng(
				1.3649170000000002,
				103.82287200000002
			  ), // Default singapore
			  fullscreenControl: false,
			  zoom: 12,
			  mapId: "4df64ef1b112569a",
			};
			this.map = new google.maps.Map(element, options);
		  }
		}
	  },
	  handleResize() {
		if (this.currentWidth != window.innerWidth) {
		  if (window.innerWidth < 768) {
			if (this.isMap == true && this.isList == true) {
			//   this.setCoordinates();
			  this.isList = false;
			  this.showMapOrList();
			}
			this.showToggleButton = true;
		  } else {
			this.isMap = true;
			this.isList = true;
			this.showToggleButton = false;
		  }
		  this.setZoom();
		  this.currentWidth = window.innerWidth;
		}
	  },
	  setZoom() {
		if (window.innerWidth < 768) {
		  if (this.map != null) {
			this.map.setZoom(12);
		  }
		} else {
		  if (this.map != null) {
			this.map.setZoom(14);
		  }
		}
	  },
	  handleScroll() {
		const el = document.getElementById("sticky-map-button");
		if (elementInViewport(el)) {
		  this.isDisplayMode = false;
		} else {
		  this.isDisplayMode = true;
		}
	  },
	  scrollToMap(refName) {
		var element = this.$refs[refName];
		element.scrollIntoView({ behavior: "smooth" });
	  },
	  removeLazyLoad() {
		$("body .map-popup").each(function () {
		  let src = $(this).find("img").attr("data-src");
		  $(this).find("img").removeAttr("data-src");
		  $(this).find("img").attr("src", src);
		});
	  },
	  setFilter() {
		if (
		  this.slice.primary.query_param != undefined &&
		  Object.keys(this.slice.primary.query_param).length != 0
		) {
		  var params = this.slice.primary.query_param;
		  for (var key of Object.keys(params)) {
			if (key === "area") {
				const areaCopy = params[key];
				if( typeof params[key] === 'string'){
					params[key] = [areaCopy];
				}
				if(typeof this.$route.query.area === 'string'){
					this.$route.query.area= [this.$route.query.area]
					}
				if(this.$route.query.area !== undefined){
					this.searchFilter.area = params[key];
				}
				else{
					this.searchFilter.area = params[key];
				}
			} else if (key === "startofstay") {
			  this.searchFilter.sos = params[key];
			  this.resFilter.sos = params[key];
			}else if (key === "minPrice") {
			  this.searchFilter.minPrice = parseInt(params[key]);
			  this.resFilter.minPrice = parseInt(params[key]);
			} else if (key === "maxPrice") {
			  this.searchFilter.maxPrice = parseInt(params[key]);
			  this.resFilter.maxPrice = parseInt(params[key]);
			} else if (key === "roomtype") {
			  this.searchFilter.roomType = params[key];
			  this.resFilter.roomType = params[key];
			} else if (key === "bathroomtype") {
			  this.searchFilter.bathroomType = params[key];
			  this.resFilter.bathroomType = params[key];
			} else if (key === "forCouples") {
			  this.searchFilter.forCouples = params[key];
			  this.resFilter.forCouples = params[key];
			} else if (key === "idealforgender") {
				if(params[key] != "" &&
				params[key]!= "Any Gender"){
					this.hidePopOverDelayed()
				}
			  this.searchFilter.gender = params[key];
			  this.resFilter.gender = params[key];
			} else if (key === "idealforage") {
				if(params[key]  != "" &&
				   params[key]  != "Any Age"){
					this.hidePopOverDelayed()
				}
			  this.searchFilter.ageGroup = params[key];
			  this.resFilter.ageGroup = params[key];
			} 
			else if (key === "idealforaboutMe") {
				if(params[key]  != "" &&
				  params[key]  != "About Me"){
					this.hidePopOverDelayed()
				}
			  this.searchFilter.aboutMe = params[key];
			  this.resFilter.aboutMe = params[key];
			} 
			else if (key === "idealfornationality") {
				if(params[key]  != "" &&
				   params[key] != "Any"){
					this.hidePopOverDelayed()
				}
			  this.searchFilter.nationality = params[key];
			  this.resFilter.nationality = params[key];
			}
		  }
		}
	  },
	  reserBudgetColor() {
		var progress = document.querySelector(".range-slider .progress");
		progress.style.left = "9%";
		progress.style.right = "9%";
	  },
	  getcountryCode() {
		//  this.nationalityOptions.push({ text: 'Select nationality', value: 'Any'}, )
		// 	  countryList.filter((country) => {
		// 		  this.nationalityOptions.push({ text: country.name, value: country.name})
		// 	  }); 
		this.nationalityOptions.push("Any");
		countryList.filter((country) => {
		  this.nationalityOptions.push(country.name);
		});
	  },
	  showPopOverDelayed() {
			setTimeout(() => {
			this.showPopOver = true;
			}, 10000);
		},
	  hidePopOverDelayed() {
			setTimeout(() => {
			this.showPopOver = false;
			}, 10000);
		}
	},
	watch: {
	  "searchFilter.price": function () {
		this.displayPrice = "$" + this.searchFilter.price + "/month";
	  },
	  sosOptions: {
      handler(newOptions) {
        const selectedItem = this.sosOptions.find(option => option.item === this.searchFilter.sos);
        if (!selectedItem) {
			this.searchFilter.sos = "Any";
        }
      },
      deep: true
    },
	  homeLists() {
		this.newHomeLists = this.homeLists;
	  },
	  /*  "searchFilter.area": function(newValue, oldValue){
			  console.log('newValue', newValue)
			  if(newValue.includes('Any Area')) {
				  if(newValue.length > 1) {
					  this.searchFilter.area = this.searchFilter.area.filter(item => item !== 'Any Area')
				  }
			  }
		  } */
	},
	created() {
	  if (process.browser && this.slice.primary.map === true) {
		window.addEventListener("resize", this.handleResize);
		document.addEventListener("scroll", this.handleScroll);
	  }
	},
	mounted() {
		this.routeChange();
		let query = Object.assign({}, this.$route.query);
		console.log("query123",query)
	//   if (this.slice.primary.map === true) this.setCoordinates();
	  // ---- <!-- =========[Range-Start]=========== -->----//
	  const range = document.querySelectorAll(".range-slider span input");
	  var progress = document.querySelector(".range-slider .progress");
	  let gap = 0.1;
	  const inputValue = document.querySelectorAll(".numberVal input");
  
	  range.forEach((input) => {
		input.addEventListener("input", (e) => {
		  let minRange = parseInt(range[0].value);
		  let maxRange = parseInt(range[1].value);
		
		  if (maxRange - minRange < gap) {
			if (e.target.className === "range-min") {
			  range[0].value = maxRange - gap;
			} else {
			  range[1].value = minRange + gap;
			}
		  } else {
			progress.style.left = ((minRange - 450) / range[0].max) * 100 + "%";
			progress.style.right =
			  100 - ((maxRange - 450) / range[1].max) * 100 + "%";
			inputValue[0].value = Number(minRange).toLocaleString();
			inputValue[1].value = Number(maxRange).toLocaleString();
		  }
		});
	  });
	  // ---- <!-- =========[Range-End]=========== -->----//
	  if (this.isSingaporeMasterPage) {
		this.resultFor = "Rooms";
	  }
	//   else {
	// 	this.resultFor = "Homes";
	//   }
	const keyToCheck = 'byRooms'
	  if (Object.keys( this.$route.query).includes(keyToCheck)){
		this.resultFor = "Homes";
	  }
	  if('byHomes' in this.$route.query || 'byRooms' in this.$route.query) {
		this.changeList();
	  }
	  if(this.currentHomeLists.length > 1){
			this.showPopOverDelayed();
		}
	  this.setFilter();
	  this.sosOptionsCopy = this.sosOptions;

	  let filteredarray1 = [];
		let filteredarray = [];
		if(this.slice.primary.for_students_only == true || this.slice.primary.for_students_only == false){
			// filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy));
			if(this.resultFor === 'Rooms'){
			  filteredarray1 = JSON.parse(JSON.stringify(this.homeListsCopy))
			}
			else{
				filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy))
			}
		}
		else{
			if(this.resultFor === 'Rooms' && this.newHomeListsAfterFilter.length){
			  filteredarray1 = JSON.parse(JSON.stringify(this.newHomeListsAfterFiltercopy));
			}
			else{
				filteredarray = JSON.parse(JSON.stringify(this.homeListsCopy))
			}
		}
	  //Immediately
	    this.immediateLength1 = null;
		if(this.resultFor === 'Rooms'){
			let filteredarray1Copy = filteredarray1
			filteredarray1Copy= filteredarray1Copy.filter((room) =>{
				if (
				  room.availability == "Available"
				) {
					    this.PopOverSos = true
						room.availability ="Available";
					    return room;
				}
		  });
		  this.immediateLength1 = filteredarray1Copy.length
		   filteredarray1Copy = [];
		  }
		 
        //Next two weeks

		//   if (this.resFilter["sos"] == "Next two weeks") {
			   this.nextTwoWeeksLength2 =null
				if(this.resultFor === 'Rooms'){
					let filteredarray1Copy = filteredarray1
			     filteredarray1Copy= filteredarray1Copy.filter((room) =>{
					if (room.endDate != "" && room.endDate != null) {
						var today = moment().format("YYYY-MM-DD");
					var next2Week = moment().add(14, "days").format("YYYY-MM-DD");
					var pastDate = moment
						.unix(room.endDate._seconds, "YYYY-MM-DD")
						.format("YYYY-MM-DD");
						if (room.availability == "Available"  || room.availability == "Available soon"){
					        this.PopOverSos = true
				          }
					if (moment(pastDate).isBefore(next2Week) &&
						moment(pastDate).isAfter(today)) {
						    
							return room;
					}
					}
			});
			this.nextTwoWeeksLength2 = filteredarray1Copy.length
			filteredarray1Copy =[]
			}
		//   }
       //Two weeks to a month
		// else if (this.resFilter["sos"] == "Two weeks to a month") {
			this.twoWeeksToAmonthlength3 = null;
			if(this.resultFor === 'Rooms'){
				let filteredarray1Copy = filteredarray1
			filteredarray1Copy= filteredarray1Copy.filter((room) =>{
				if (room.endDate != "" && room.endDate != null) {
					var next2Week = moment().add(14, "days").format("YYYY-MM-DD");
					var nextmonth = moment().add(1, "M").format("YYYY-MM-DD");
					var pastDate = moment
					  .unix(room.endDate._seconds, "YYYY-MM-DD")
					  .format("YYYY-MM-DD");
					  if ( room.availability == "Available"  || room.availability == "Available soon"){
					this.PopOverSos = true
				       }
				  if (moment(pastDate).isAfter(next2Week) &&
					  moment(pastDate).isBefore(nextmonth)) {
					    return room;
				  }
				}
		  });
		  this.twoWeeksToAmonthlength3 = filteredarray1Copy.length
		  filteredarray1Copy = []
		  }
		//   }
		//More than a month
		// else if (this.resFilter["sos"] == "More than a month") {
			this.moreThanAMonthlength4 =null;
			if(this.resultFor === 'Rooms'){
			let filteredarray1Copy = filteredarray1
			filteredarray1Copy= filteredarray1Copy.filter((room) =>{
				if (room.endDate != "" && room.endDate != null) {
				  var nextmonth = moment().add(1, "M").format("YYYY-MM-DD");
				  var pastDate = moment
					.unix(room.endDate._seconds, "YYYY-MM-DD")
					.format("YYYY-MM-DD");
					if (room.availability == "Available"  || room.availability == "Available soon"){
					this.PopOverSos = true
				}
				  if (moment(pastDate).isAfter(nextmonth)) {
					return room;
				  }
				}
		  });
		 this.moreThanAMonthlength4 = filteredarray1Copy.length
		  filteredarray1Copy=[]
		  }
	},
	beforeMount() {
	  this.getcountryCode();
	  if (this.defaultFilter != undefined && this.defaultFilter.cityid == "") {
		this.searchFilter.city = "Any City";
	  }
	  axios
		.post(
		  this.MODE === "prod"
			? this.PROD_END_POINT
			: this.DEV_END_POINT,
		  {},
		  {
			headers: {
			  Authorization:
				process.env.MODE === "prod"
				  ? "Bearer " + this.PROD_COLIV_HQ_KEY
				  : "Bearer " + this.DEV_COLIV_HQ_KEY,
			},
		  }
		)
		.then((response) => {
		  this.cities.push("Any City");
          console.log("response",response)
		  response.data.data.forEach((cittarr) => {
			this.cities.push(cittarr.city);
			let hood = [];
			cittarr.hood.filter(function (obj) {
			  if (obj.name != "Test" && !hood.includes(obj.name)) {
				hood.push(obj.name);
			  }
			  //    return obj.selected;8849667841
			});
			this.cityArea[cittarr.city] = ["Any Area", ...hood];
			if (
			  this.defaultFilter != undefined &&
			  this.defaultFilter.cityid != "" &&
			  this.defaultFilter.cityid == cittarr.cityId
			) {
			  this.areas = this.cityArea[cittarr.city];
			  this.cities = [cittarr.city];
			  this.searchFilter.city = cittarr.city;
			  this.resFilter.city = cittarr.city;
			}
		  });
		  this.setFilter();
		  this.openFilterbox("city");
		  $(".city-filter").trigger("click");
		});
	  if (this.slice.primary.map === true) {
		this.handleResize();
		this.handleScroll();
	  }
	},
	destroyed() {
	  document.removeEventListener("scroll", this.handleScroll);
	},
  };
  </script>
  
  <style scoped>
  @import "../assets/css/filterform.css";
  @import "../assets/css/MultiRangeSliderBlack.css";
  @import "../assets/css/MultiRangeSliderBarOnly.css";
  @import "../assets/css/common.css";
  /* ----------mainRangeSlide-range-start----- */
  .mainRangeSlide {
	width: 100%;
	display: block;
	padding: 0px 20px;
  }
  .mainRangeSlide .numberVal input {
	padding: 10px 10px 10px 20px;
	width: auto;
	border-radius: 10px;
	color: #000;
	border: 1px solid #000 !important;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	width: 100px;
  }
  .mainRangeSlide .numberVal {
	position: relative;
  }
  .mainRangeSlide .numberVal::before {
	content: "$";
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
  }
  .mainRangeSlide input[type="number"]::-webkit-inner-spin-button,
  .mainRangeSlide input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
  }
  .mainRangeSlide .range-slider {
	position: relative;
	width: 100%;
	height: 10px;
	border-radius: 15px;
	background: #898f86;
	margin-bottom: 20px;
  }
  .mainRangeSlide .range-slider .progress {
	position: absolute;
	left: 0;
	right: 0%;
	height: 100%;
	border-radius: 15px;
	background: #77bf45;
  }
  .mainRangeSlide .range-slider input[type="range"] {
	position: absolute;
	width: 100%;
	height: 10px;
	-webkit-appearance: none;
	pointer-events: none;
	background: none;
	outline: none;
	left: 0;
  }
  .mainRangeSlide .range-slider .range-min::-webkit-slider-thumb {
	pointer-events: auto;
	-webkit-appearance: none;
	width: 25px;
	height: 25px;
	background: #fcfcfc;
	border: 1px solid #77bf45;
	border-radius: 20px;
	box-shadow: 0px 0px 5px rgb(119, 191, 69), 0 0 5px rgba(0, 0, 0, 0.5) inset;
  }
  .mainRangeSlide .range-slider .range-max::-webkit-slider-thumb {
	pointer-events: auto;
	-webkit-appearance: none;
	width: 25px;
	height: 25px;
	background: #fcfcfc;
	border: 1px solid #77bf45;
	border-radius: 20px;
	box-shadow: 0px 0px 5px rgb(119, 191, 69), 0 0 5px rgba(0, 0, 0, 0.5) inset;
  }
  
  /* ----------mainRangeSlide-range-end----- */
  
  /*----------Range Slider ---START--------- */
  .custom-range .bar .bar-inner {
	background-color: #77bf45 !important;
  }
  .multi-range-slider-bar-only .thumb .caption * {
	background-color: #77bf45 !important;
  }
  /*----------Range Slider ---END--------- */
  .image-map-section {
	max-width: 1670px;
	margin: auto;
  }
  .form-cms-build ::v-deep(.custom-control-label) {
	/* color: var(--background_color) !important; */
	color: #000 !important;
  }
  .form-cms-build ::v-deep(.custom-checkbox .custom-control-label::before) {
	/* background-color: var(--divider-and-button-color); */
	background-color: #000 !important;
	border: none;
	box-shadow: none;
  }
  @media (max-width: 1199px){
  .building-filter.form-cms-build{
	padding: 0 !important;
  }
  }
  .filter-item #neighbour {
	width: 100%;
	height: 100%;
	padding-top: 10px;
	padding-bottom: 10px;
	border: 0;
	margin-left: 0 !important;
	background-color: #fff;
	padding: 10px;
	text-align: left;
  }
  .map-image-heading :first-child {
	font-size: 28px;
	letter-spacing: normal;
	font-weight: 700;
	line-height: 34px;
	text-transform: uppercase;
	margin-bottom: 0;
  }
  .map-image-subheading {
	font-size: 16px;
	line-height: 19px;
	font-weight: 400;
	letter-spacing: normal;
	color: #8d8d8d;
  }
  .sort-by-filter button {
	min-width: 120px;
	height: 40px;
	line-height: 40px;
	/* border: 1px #8D8D8D solid !important; */
	font-size: 12px;
	font-weight: 700;
	letter-spacing: normal;
	/* color: #8D8D8D !important; */
	padding: 0;
	/* background-color: transparent !important; */
	border-radius: 10px;
	padding: 0 15px;
	outline: 0 !important;
	box-shadow: none !important;
  }
  .sort-by-filter .box.row {
	right: 0px !important;
	left: auto !important;
  }
  .sort-by-filter button .dropdown-icon {
	font-size: 20px;
  }
  .section-main-title .cms-title ::v-deep(:first-child) {
	color: #222222;
	margin-bottom: 40px;
	text-align: left;
  }
  .building-cms {
	text-align: center;
	position: relative;
  }
  .building-cms .building-card .name {
	font-size: 18px;
	color: #000;
	font-weight: 600;
	text-transform: capitalize;
	text-decoration: none;
	display: block;
  }
  .building-cms .left-content {
	position: relative;
	background-color: #fff;
	z-index: 9;
  }
  .building-cms .building-card .title ::v-deep(:first-child),
  .building-cms .building-card .desc ::v-deep(:first-child),
  .building-cms .building-card .price ::v-deep(:first-child),
  .building-cms .building-card .address ::v-deep(:first-child) {
	color: #000;
	margin-bottom: 0;
	line-height: normal;
  }
  .building-cms .building-card .price p,
  .building-cms .building-card .title ::v-deep(:first-child) {
	font-size: 14px;
	letter-spacing: normal;
	line-height: 27px;
	color: #000;
	font-weight: 700;
  }
  .building-cms .building-card .desc ::v-deep(:first-child) {
	margin-top: 20px;
  }
  .building-cms .building-card .room-available-today ::v-deep(:first-child) {
	background-color: #feefef;
	border: 1px solid #ef5357;
	color: #000;
	font-size: 12px;
	font-weight: 600;
	padding: 0 4px;
	margin-bottom: 0;
	display: inline-block;
	vertical-align: middle;
  }
  .building-card .card-main {
	position: relative;
  }
  .building-card .card-main .building-bottom-content .room-available-today {
	left: 0;
	right: 0;
	bottom: 0;
	min-height: 30px;
  }
  .building-bottom-content .price ::v-deep(p) {
	font-weight: bold;
  }
  .building-card .card-main .building-bottom-content .price {
	left: 0;
	right: 0;
	bottom: 30px;
  }
  .building-cms .building-card .content-wrap .room-image {
	position: relative;
  }
  .building-cms .building-card .room-image .overlay {
	position: absolute;
	top: 12px;
	left: 12px;
  }
  
  .building-cms .room-image .overlay :first-child {
	font-size: 11px;
	font-weight: 700;
	color: #fff;
	text-transform: initial;
	letter-spacing: normal;
	/* min-width: 116px; */
	height: 31px;
	border-radius: 4px;
	line-height: 31px;
	padding: 0 4px;
	background-color: rgb(114, 191, 68);
	transition: all 0.5s ease;
  }
  .building-cms .room-image .overlay :first-child:hover {
	background-color: #000 !important;
	color: #fff;
  }
  .student-logo img{
    height: 50% !important;
  }
  .building-cms .building-card .content-wrap {
	background-color: #f7f7f7;
	border-radius: 10px;
  }
  .building-cms .building-card .content-wrap .desc {
	font-size: 12px;
	line-height: 15px;
	letter-spacing: normal;
	color: #8d8d8d;
	text-transform: uppercase;
  }
  .building-cms .building-card .content-wrap .name {
	font-size: 18px;
	font-weight: 700;
	line-height: 27px;
	letter-spacing: normal;
	color: #000;
  }
  .building-cms .building-card .content-wrap .address {
	line-height: 27px;
	font-size: 16px;
	font-weight: 400;
	letter-spacing: normal;
	color: #000;
	border-bottom: 1px #d8d8d8 solid;
  }
  .building-cms .building-card .content-wrap .desc-box {
	transition: 0.3s;
	padding: 30px 20px;
	border-top: none;
	text-align: left !important;
  }
  .building-card .card-main .card-link {
	display: block;
  }
  .building-card .card-main .card-link img {
	width: 100%;
	border-radius: 10px 10px 0 0;
	height: 243px;
	object-fit: cover;
  }
  .see-by-room-btn {
	background-color: #77bf45;
	border: none;
  }
  @media (min-width: 768px) {
	.image-map-col-1 {
	  flex: 0 0 64%;
	  max-width: 64%;
	}
	.image-map-col-2 {
	  flex: 0 0 36%;
	  max-width: 36%;
	}
  }
  @media (max-width: 767px) {
	.building-cms .building-card .col-lg-6.col-md-12 {
	  flex: 0 0 50%;
	  max-width: 50%;
	}
	.building-card {
	  padding-right: 0;
	}
	.build-page .building-card {
	  padding-top: 0;
	}
  }
  @media (max-width: 575px) {
	/* .mascot-text{
	font-size: .8rem !important
  } */
	.building-card {
	  margin: 0;
	}
	.building-cms .building-card .col-lg-6.col-md-12 {
	  flex: 0 0 100%;
	  max-width: 100%;
	}
	.section-main-title .cms-title ::v-deep(:first-child) {
	  font-size: 24px;
	}
	.building-card .card-main .card-link img {
	  max-height: 243px;
	  height: auto;
	}
  }
  /****** building-filter *****/
  .building-filter {
	margin-bottom: 20px;
  }
  .building-filter .box.row {
	width: 300px;
	padding: 20px 0px;
	background-color: rgb(231, 239, 226);
	border-radius: 10px;
	margin: 10px 5px;
	position: absolute;
	top: 100%;
	left: 0px;
	z-index: 9;
	/* border: 1px solid #e6e6e6 !important; */
	/* background-color: #F7F7F7 !important; */
	box-shadow: 0 0 8px 0 rgb(0 0 0 / 10%);
  }
  .filter-item .btn-outline-primary {
	border: 0;
	color: #000 !important;
	font-size: 16px;
	font-weight: 400;
	line-height: 19px;
	padding: 0 15px;
	letter-spacing: normal;
	background-color: #f7f7f7 !important;
	border-radius: 10px;
	max-width: 240px;
	height: 40px;
	text-align: left;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
  }
  .filter-item .filter-item-type {
	font-size: 12px;
	font-weight: 700;
	color: #000;
	line-height: 15px;
	letter-spacing: normal;
  }
  .filter-item .dropdown-icon {
	float: right;
	font-size: 20px;
	margin-bottom: 6px;
  }
  .filter-item .city-dropdown-arrow {
	position: absolute;
	top: 43%;
	transform: translateY(-50%);
	right: 15px;
  }
  .filter-item .btn-outline-primary svg {
	color: #77bf45;
	margin-right: 5px;
  }
  .filter-item .btn-outline-primary.focus,
  .btn-outline-primary:focus {
	box-shadow: none;
  }
  .filter-item .btn-outline-primary:not(:disabled):not(.disabled).active,
  .filter-item .btn-outline-primary:not(:disabled):not(.disabled):active,
  .filter-item .show > .btn-outline-primary.dropdown-toggle,
  .filter-item .btn-outline-primary:hover {
	background: none;
	border-color: #77bf45;
	box-shadow: none;
	color: #777777;
  }
  /****** building-filter *****/
  /* 22/05/20 - DAB */
  /* .building-cms .form-cms-build .input-serach-main {
	  -ms-flex: 0 0 20%;
	  flex: 0 0 20%;
	  max-width: 20%;
  } */
  .building-filter .input-serach-main {
	margin-bottom: 15px !important;
  }
  .form-cms-build .input-serach-main .sort-filter .btn-outline-primary {
	background-color: rgb(231, 239, 226);
	border-radius: 5px;
	border: 1px solid #77bf45;
	text-align: left;
	padding: 12px 6px;
  }
  .filter-item.sort-filter .btn-outline-primary {
	display: block;
  }
  .filter-item.sort-filter .btn-outline-primary svg {
	position: absolute;
	right: 5px;
  }
  .filter-item.sort-filter .btn-outline-primary .sort-label {
	color: #222222;
  }
  .form-cms-build {
	/* display: flex;
	  flex-wrap: wrap; */
	height: 100%;
  }
  .form-cms-build .filter-item {
	height: 100%;
	position: relative;
  }
  .filter-item .item-wrap {
	position: relative;
	height: 100%;
  }
  .pop-text{
	padding-left: 0px !important;
	padding-right: 0px !important;
  }
  
  /* .filter-item .item-wrap .btn-outline-primary{
	  top: 50%;
	  -webkit-transform: translateY(-50%);
	  -moz-transform: translateY(-50%);
	  -ms-transform: translateY(-50%);
	  -o-transform: translateY(-50%);
	  transform: translateY(-50%);
  } */
  @media (max-width: 1299px) {
	.building-filter .sort-filter .box.row {
	  left: auto;
	  right: 10px;
	}
  }
  @media (max-width: 1400px) {
	.form-cms-build {
	  padding: 0;
	}
	.map-image-heading :first-child {
	  font-size: 20px;
	}
	.map-image-subheading {
	  font-size: 14px;
	}
	.filter-item .btn-outline-primary {
	  font-size: 14px;
	}
	.filter-item .dropdown-icon,
	.sort-by-filter button .dropdown-icon {
	  font-size: 16px;
	}
	.building-cms .building-card .content-wrap .desc-box {
	  padding: 15px;
	}
	.building-cms .building-card .content-wrap .desc {
	  font-size: 11px;
	}
	.building-cms .building-card .content-wrap .name {
	  font-size: 16px;
	}
	.building-cms .building-card .content-wrap .address {
	  font-size: 14px;
	}
	.building-cms .building-card .price p,
	.building-cms .building-card .title :first-child {
	  font-size: 13px;
	}
  }
  @media (min-width: 992px) and (max-width: 1199px) {
	.map-image-heading :first-child {
	  font-size: 22px;
	}
	.building-card .card-main .card-link img {
	  max-height: 243px;
	  height: auto;
	}
  }
  @media (min-width: 768px) and (max-width: 991px) {
	.building-card .card-main:nth-child(2n + 1) {
	  padding-right: 7.5px !important;
	}
	.building-card .card-main:nth-child(2n + 2) {
	  padding-left: 7.5px !important;
	}
	.building-card .card-main .card-link img {
	  max-height: 243px;
	  height: auto;
	}
  }
  @media (min-width: 1200px) and (max-width: 1400px) {
	.image-map-col-1 {
	  flex: 0 0 70%;
	  max-width: 70%;
	}
	.image-map-col-2 {
	  flex: 0 0 30%;
	  max-width: 30%;
	}
	.building-cms .building-card .content-wrap .name {
	  margin-bottom: 10px !important;
	}
	.building-cms .building-card .content-wrap .address {
	  margin-bottom: 10px !important;
	  padding-bottom: 10px !important;
	}
	.building-card .card-main {
	  margin-bottom: 30px !important;
	}
	.map-image-heading :first-child {
	  font-size: 25px;
	}
	.map-image-subheading {
	  font-size: 15px;
	}
	.building-card .card-main .card-link img {
	  height: 200px;
	}
  }
  @media (min-width: 1401px) and (max-width: 1700px) {
	.building-card .card-main .card-link img {
	  height: 230px;
	}
  }
  /**** R: MobileCard START */
  /* @media (min-width: 711px) and (max-width: 991px) { 
	  .building-card .card-main {
		  max-width: 330px;
		  margin: 0 auto;
	  }
  } */
  /**** R: MobileCard END */
  @media (max-width: 767px) {
	.building-filter .sort-filter .box.row {
	  left: 0;
	  right: auto;
	}
	.building-filter .input-serach-main:nth-child(3) .box.row {
	  right: 10px;
	  left: auto;
	}
  }
  @media (max-width: 575px) {
	/* .building-cms .form-cms-build .input-serach-main {
		  flex: 0 0 50%;
		  max-width: 50%;
	  } */
	  .popover.b-popover:has(.mascot-row) {
	  max-width: 18rem !important;
    }
	.building-filter .input-serach-main:nth-child(3) .box.row {
	  left: 0;
	  right: auto;
	}
	.building-filter .input-serach-main:nth-child(even) .box.row {
	  right: auto;
	  left: auto;
	}
	.building-filter .sort-filter .box.row {
	  margin: 0;
	  width: 100%;
	}
	.building-cms .form-cms-build .input-serach-main:nth-child(n + 3) {
	  margin-top: 20px;
	}
  }
  @media (max-width: 400px) {
	/* .building-cms .form-cms-build .input-serach-main {
		  flex: 0 0 100%;
		  max-width: 100%;
	  } */
	/* .building-cms .form-cms-build .input-serach-main:nth-child(n+2) {
		  margin-top: 20px;
	  } */
	.building-filter .box.row {
	  margin-left: 0;
	  margin-right: 0;
	  left: 0 !important;
	  right: auto !important;
	}
  }
  .remove-right-padding {
	padding-right: 0px;
  }
  .building-cms .building-card .room-image .promo-overlay ::v-deep(:first-child) {
	background-color: #f55e61;
	border: 1px solid #f55e61;
	color: #ffffff;
	padding: 0 10px;
	margin-bottom: 0;
	display: inline-block;
	vertical-align: middle;
	border-radius: 5px;
  }
  .building-cms .building-card .room-image .promo-overlay {
	position: absolute;
	bottom: 10px;
	right: 10px;
  }
  .reset-price {
	float: left;
	font-size: 25px;
	margin-left: 10px;
	margin-top: 5px;
  }
  img.idealfor-image {
	max-height: 25px !important;
	max-width: 25px !important;
	vertical-align: top;
  }
  img.mascot-image {
	height: 8rem !important;
    width: 6.5rem !important;
	margin-left: 0.25rem;
  }
  img.mascot-image-idealfor {
	height: 6rem !important;
    width: 6.5rem !important;
	margin-left: 0.25rem;
  }
  .idealFor .form-inputs {
	width: auto;
	border-radius: 10px !important;
	color: #000;
	border: 1px solid #000 !important;
	width: 100px;
	background: none;
  }
  .building-filter.form-cms-build .input-group {
	position: relative;
  }
  .building-filter.form-cms-build .input-group:before {
	content: "\f0dd";
	position: absolute;
	right: 12px;
	top: 50%;
	font: normal normal normal 14px/1 FontAwesome;
	transform: translateY(-50%);
	line-height: normal;
	height: 26px;
	font-size: 18px;
  }
  .ct-filter-selector {
	border-radius: 10px !important;
	color: #000 !important;
	border: 1px solid #000 !important;
	width: 100px;
	background: none;
  }
  .ct-filter-selector::-webkit-calendar-picker-indicator {
	opacity: 0;
  }
  .city-list-main::before {
	display: none;
  }
  @media (max-width: 520px) {
	.filter-item .btn-outline-primary {
	  max-width: 100%;
	}
	.idealFor .form-inputs {
	  width: 100%;
	}
	.building-filter .box.row {
	  width: 100%;
	}
	.building-filter.form-cms-build .input-group:before {
	  height: 25px;
	  font-size: 16px;
	}
  }
  :deep(.popover-body) {
	padding:  .2rem 0.3rem 0 .3rem !important;
    font-size: 1rem;
	margin-bottom: .5rem;
  }
  :deep(.arrow::after){
    border-top-color: #72bf44 !important;
	border-bottom-color: #72bf44 !important;
  }
  .popover.b-popover {
    position: absolute !important;
    left: 1em !important;
	border: 2px solid #72bf44;
	z-index: 9999;
	box-shadow:0px 0px 12px rgb(119, 191, 69), 0 0 5px rgba(0, 0, 0, 0.5) inset
  }
  .popover.b-popover:has(.mascot-row) {
	max-width: 25rem;
  }
  .mascot-row-idealfor{
	height: 6rem
  }
   /* .mascot-text{
	padding-right: 8px!important;
	padding-top: 2px!important;
   } */
   .close_popover{
	height: 0.1rem;
    width: 0.1rem;
    position: absolute;
    right: 1.15rem;
    top: -0.1rem;
   }
   
  /* img.mascot-image[data-v-ec3e968a] {
    height: 3.5rem !important;
    width: 4rem !important;
  } */
  .idealFor .form-group:nth-child(even) {
	padding-left: 15px !important;
	padding-right: 15px !important;
  }
  /* ================ */
  </style>
  