import MMMButton from "components/button";
import MMMInput from "components/input";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Script from "react-load-script";

/* global kakao */

const Location = () => {
  // 스크립트로 kakao maps api를 심어서 가져오면 window 전역 객체에 들어가게 됩
  const { kakao } = window;

  // TypeError: properties of undefined (reading 'maps')
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementsByClassName("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  });

  // react-load-script 사용
  const handleScriptLoad = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
    });
  };

  // 초기 지도 설정
  const [currentAddress, setCurrentAddress] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    isPanto: true, // 지도 위치 변경시 부드러운 이동
  });

  const [searchAddress, SetSearchAddress] = useState();

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const searchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setCurrentAddress({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    geocoder.addressSearch(`${searchAddress}`, callback);
  };

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };

  return (
    <Wrapper>
      <OneRow>
        <MMMInput
          label="지역선택"
          name="location"
          type="text"
          placeholder="검색 버튼을 눌러주세요."
          size={"large"}
          onChange={handleSearchAddress}
        />
        <MMMButton size={"confirm"} onClick={searchMap}>
          검색
        </MMMButton>
      </OneRow>
      <Map
        id="myMap"
        className="map"
        center={currentAddress.center}
        isPanto={currentAddress.isPanto}
        style={{ width: "920px", height: "400px", border: "1px solid gray" }}
        level={3}
      >
        <MapMarker position={{ lat: 127.0354, lng: 37.4999782 }}>
          코리아IT 아카데미
        </MapMarker>
      </Map>
      <Script
        url="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6b6beb973270d87c1d12fe2bd9162e58&libraries=services,drawing&autoload=false"
        onLoad={handleScriptLoad}
      />
    </Wrapper>
  );
};

export default Location;

const Wrapper = styled.div``;
const OneRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  & > button {
    border: 1px solid #282190;
    background-color: #fff;
    color: #282190;
    font-weight: 600;
    margin-top: 20px;
  }
`;
