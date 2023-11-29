import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { flexCenter } from "styles/common.style";

const Maps = ({ region }) => {
  const { kakao } = window;

  const [state, setState] = useState({
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
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
          name="region"
          type="text"
          placeholder="검색 버튼을 눌러주세요."
          size={"large"}
          onChange={handleSearchAddress}
          defaultValue={region}
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

export default Maps;

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

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;

    & > div {
      & > input {
        min-width: 150px;
        min-height: 38px;
        border-radius: 4px;
        font-size: 10px;
      }
      & > label,
      & > p {
        font-size: 10px;
      }
    }
    & > button {
      min-width: 38px;
      min-height: 38px;
      font-size: 10px;
      margin-left: 6px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 400px;

    & > div {
      & > input {
        min-width: 240px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
      }
      & > label,
      & > p {
        font-size: 12px;
      }
    }
    & > button {
      min-width: 70px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    max-width: 700px;

    & > div {
      & > input {
        min-width: 466px;
        min-height: 48px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > label,
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
    & > button {
      min-width: 140px;
      margin-left: 10px;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }
`;
