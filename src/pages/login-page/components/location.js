import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const Location = () => {
  const { kakao } = window;

  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState();

  // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
  const SearchMap = (e) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
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
        <MMMButton size={"confirm"} onClick={SearchMap}>
          검색
        </MMMButton>
      </OneRow>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
      ></Map>
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