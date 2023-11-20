<template>
  <div>
    <div ref="container">
      <div id="map" style="width:800px;height:400px;"></div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  selectGu: String,
  selectBank: String
})

const markers = ref([])

const loadScript = () => {
  const key = '6e11f641595abffec43b82a5c9cbc391'
  const script = document.createElement('script')

  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${key}&libraries=services`
  // kakaomap script loading 후 initMap 실행
  script.addEventListener('load', () => window.kakao.maps.load(initMap))
  document.head.appendChild(script)
}

// let map = ref(null)
const container = ref(null)

const initMap = () => {
  const options = {
    center: new window.kakao.maps.LatLng(37.5013068, 127.0396597),
    level: 3
  }
  map.value = new window.kakao.maps.Map(container.value, options)

  const geocoder = new window.kakao.maps.services.Geocoder()

  const infowindow = new window.kakao.maps.InfoWindow({zIndex:1})

  const ps = new window.kakao.maps.services.Places()


    // 지도에 마커를 표시하는 함수입니다
    const displayMarker = function (place) {
        
        // 마커를 생성하고 지도에 표시합니다
        const marker = new window.kakao.maps.Marker({
            map: map.value,
            position: new window.kakao.maps.LatLng(place.y, place.x)
        });
  
        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map.value, marker)
        });

        markers.value.push(marker, infowindow)
    }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  const placesSearchCB = function (data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new window.kakao.maps.LatLngBounds()

      for (let i=0; i<data.length; i++) {
        displayMarker(data[i])
        const extender = new window.kakao.maps.LatLng(data[i].y, data[i].x)
        bounds.extend(extender)
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.value.setBounds(bounds)
    } 
  }
  ps.keywordSearch('서울특별시 강남구' + props.selectBank, placesSearchCB)

  const bankWatcher = watch(() => props.selectBank, (newValue, old) => {
    markers.value.forEach(element => {
      element.setMap(null)
    });
    if (props.selectGu === null) {
      ps.keywordSearch('서울특별시 강남구' + newValue, placesSearchCB)
    } else {
      ps.keywordSearch(props.selectGu + newValue, placesSearchCB)
    }
  })

  const search = watch(() => props.selectGu, (newValue, old) => {
    if (newValue !== null) {
      geocoder.addressSearch(newValue, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          // const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

          const options = {
            center: new window.kakao.maps.LatLng(result[0].y, result[0].x),
            level: 3
          }
          map.value = new window.kakao.maps.Map(container.value, options)
          ps.keywordSearch(newValue + props.selectBank, placesSearchCB)
        }
      })
    }
  })
}

onMounted(() => {
  if (window.kakao?.maps) {
    // console.log(`KakaoMapComp.vue - 이미 map 있음`, window.kakao.maps)
    initMap()
  } else {
    // console.log(`KakaoMapComp.vue - map script loading 필요`)
    loadScript()
  }
})




</script>

<style scoped>

</style>