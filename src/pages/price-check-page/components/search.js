import { Api } from "apis";
import MMMInput from "components/input";
import { PRODUCT_QUERY_KEY } from "consts";
import useMaxLength from "hooks/use-max-length-overflow";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SearchIconImage from "../../../images/icon/search.png";
import { useNavigate } from "react-router-dom";

const PriceSearch = () => {
  const [titles, setTitles] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);

  const { skipTitleView } = useMaxLength();

  //const { skipTitleView } = useMaxLength();
  const navigate = useNavigate();

  //삭제내용
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onArrowKeyPress = (e) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > -1 ? prevIndex - 1 : filter.length - 1
      );
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < filter.length - 1 ? prevIndex + 1 : -1
      );
    } else if (e.key === "Enter" && selectedIndex > -1) {
      navigate(`/pricecheckpage/${filter[selectedIndex].title}`);
      e.target.blur();
    } else if (e.key === "Enter") {
      navigate(`/pricecheckpage/${e.target.value}`);
      e.target.blur();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);
  //삭제내용

  const { data: UsedProductList } = useQuery(
    [PRODUCT_QUERY_KEY.FREE_PRODUCT_LIST],
    () => Api.getUsedProduct()
  );

  const filter = UsedProductList[0]
    .slice(0, 10)
    .filter((list) =>
      list.title.toLocaleLowerCase().includes(titles.toLocaleLowerCase())
    );

  const onTitleChange = (e) => {
    setTitles(e.target.value);
    setSelectedIndex(-1);
  };

  // 포커스시 검색목록 띄우는 모달
  const onSearchListModal = () => {
    setSearchModal(true);
  };

  // 포커스아웃시 검색목록 사라지게 하는 모달
  const onNoneSearchListModal = () => {
    if (!isMouseHover) setSearchModal(false);
  };

  // 연관검색어 클릭시 해당 상품 시세페이지로 이동
  const onRelatedSearchWord = (title) => {
    navigate(`/pricecheckpage/${title}`);
    window.scrollTo({ top: 0 });
    setSearchModal(false);
  };

  // 마우스가 검색어 위에 올라가있으면 검색창이 닫히지 않게
  const onMouseHoverEvent = () => {
    setIsMouseHover(true);
  };

  const onMouseLeaveEvent = () => {
    setIsMouseHover(false);
  };

  return (
    <Wrapper>
      <Title>시세조회</Title>
      <Text>원하시는 상품이 얼마에 거래되고 있는지 확인해보세요</Text>
      {searchModal ? (
        <MMMInput
          onFocus={onSearchListModal}
          onBlur={onNoneSearchListModal}
          onChange={onTitleChange}
          onKeyDown={onArrowKeyPress}
          size={"searchPriceFocus"}
          placeholder="어떤 시세 정보가 궁금하세요?"
          style={{
            border: "1px solid #f1f1f1",
            boxShadow: " 1px 1px 6px 0 rgba(0, 0, 0, 0.6)",
          }}
          value={titles}
        />
      ) : (
        <MMMInput
          onFocus={onSearchListModal}
          onBlur={onNoneSearchListModal}
          onChange={onTitleChange}
          size={"searchPrice"}
          placeholder="어떤 시세 정보가 궁금하세요?"
          style={{ border: "2px solid #282190" }}
          value={titles}
        />
      )}
      {searchModal && (
        <SearchList>
          {filter.length >= 1 ? (
            <div>
              {filter.map((list, index) => (
                <ListWrap
                  style={{
                    backgroundColor:
                      selectedIndex === index ? "aliceblue" : "transparent",
                  }}
                  onClick={() => onRelatedSearchWord(list.title)}
                  onMouseEnter={() => onMouseHoverEvent()}
                  onMouseLeave={() => onMouseLeaveEvent()}
                >
                  <SearchIconWrap>
                    <SearchIcon src={SearchIconImage} />
                  </SearchIconWrap>
                  {skipTitleView(list.title)}
                </ListWrap>
              ))}
            </div>
          ) : (
            <SearchListResult>연관검색어가 없습니다.</SearchListResult>
          )}
        </SearchList>
      )}
    </Wrapper>
  );
};

export default PriceSearch;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;

  position: relative;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    padding-top: 80px;
  }
`;

const Title = styled.div`
  height: 70px;
  // padding-bottom: 40px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100%;
    padding-bottom: 0px;
    /* height: 40px; */
    font-size: 24px;
    ${flexCenter}
  }
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: none;
  }
`;

const SearchList = styled.div`
  width: 450px;
  text-align: left;
  position: relative;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 300px;
  }

  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 400px;
    top: 30px;
  }

  & > div {
    width: 100%;
    min-height: 30px;
    top: -40px;
    z-index: 10;
    background-color: #fff;
    position: absolute;
    border: 1px solid #f1f1f1;
    border-top: none;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding-top: 15px;
    padding-bottom: 30px;
    box-shadow: 1px 5px 5px 0px rgba(0, 0, 0, 0.6);

    //
    line-height: 40px;
  }
`;
const SearchIcon = styled.img`
  width: 15px;
`;

const SearchIconWrap = styled.div`
  ${flexCenter}
  margin-right: 15px;
  width: 25px;
  height: 25px;
  background-color: #f1f1f1;
  border-radius: 50%;
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 30px;
  transition: background-color 0.3s;
`;

const SearchListResult = styled.div`
  ${flexCenter}
`;
