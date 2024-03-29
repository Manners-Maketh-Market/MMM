import { Api } from "apis";
import MMMInput from "components/input";
import { PRODUCT_QUERY_KEY } from "consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { flexCenter } from "styles/common.style";
import SearchIconImage from "../../../images/icon/search.png";
import { useParams } from "react-router-dom";
import MMMAlert from "components/mmm-alert";
import MaxLength from "utils/max-length-overflow";
import UseNavigation from "hooks/use-navigation";

const PriceSearch = () => {
  const param = useParams();
  const datatitle = param.title;
  const today = new Date();
  const aWeekAgo = new Date(today);
  aWeekAgo.setDate(today.getDate() - 4);
  // 5일간의 시세를 구하기 위한 오늘 날짜와 4일전 날짜

  const [titles, setTitles] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const { skipTitleView } = MaxLength();

  const { goToMarketPricePage } = UseNavigation();

  const { data: SearchProductList, refetch } = useQuery(
    [PRODUCT_QUERY_KEY.SEARCH_PRODUCT_LIST],
    () => Api.getSearchProduct(0, titles, 1)
  );

  // 판매완료된 상품 리스트
  const SearchSellProductList =
    SearchProductList &&
    SearchProductList.product.filter((list) => list.status === "판매완료");

  // 키워드는 title(제목) description(내용)안에 키워드랑 같은 문자가 들어가있으면 데이터를 가져옴 / 비어놨을 때 전부가져옴
  // 1페이지 데이터 20개 묶음으로 구분, 2 20~ 39
  // 53~56 내용은 0(중고물품), 키워드(titles)=> 검색창에 입력하는 내용, 1(20개 묶음 페이지의 첫번째 페이지 즉 인덱스0~19번째)

  useEffect(() => {
    refetch();
  }, [titles]);

  useEffect(() => {
    if (datatitle) {
      setTitles(datatitle);
    }
  }, [datatitle]);

  const onArrowKeyPress = (e) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > -1 ? prevIndex - 1 : SearchSellProductList.length - 1
      );
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < SearchSellProductList.length - 1 ? prevIndex + 1 : -1
      );
    } else if (e.key === "Enter" && selectedIndex > -1) {
      goToMarketPricePage(SearchSellProductList[selectedIndex].title);
      setSearchModal(false);
      e.target.blur();
    } else if (e.key === "Enter") {
      if (SearchSellProductList.length < 1) {
        setOpen(true);
      } else {
        goToMarketPricePage(e.target.value);
        setSearchModal(false);
        e.target.blur();
      }
    }
  };

  const onTitleChange = (e) => {
    setTitles(e.target.value);
    setSelectedIndex(-1);
  };

  // 포커스아웃시 검색목록 사라지게 하는 모달
  const onNoneSearchListModal = () => {
    if (!isMouseHover) setSearchModal(false);
  };

  // 연관검색어 클릭시 해당 상품 시세페이지로 이동
  const onRelatedSearchWord = (title) => {
    goToMarketPricePage(title);
    window.scrollTo({ top: 0 });
    setSearchModal(false);
  };

  // 마우스가 검색어 위에 올라가있으면 검색창이 닫히지 않게
  const onMouseHoverEvent = (index) => {
    setIsMouseHover(true);
    setSelectedIndex(index);
  };

  return (
    <Wrapper>
      <Title>시세조회</Title>
      <Text>원하시는 상품이 얼마에 거래되고 있는지 확인해보세요</Text>
      {searchModal ? (
        <MMMInput
          onFocus={() => setSearchModal(true)}
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
          onFocus={() => setSearchModal(true)}
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
          {SearchProductList.product.length >= 1 ? (
            <div>
              {SearchSellProductList.slice(0, 10).map((list, index) => (
                <ListWrap
                  style={{
                    backgroundColor: selectedIndex === index && "aliceblue",
                  }}
                  onClick={() => onRelatedSearchWord(list.title)}
                  onMouseEnter={() => onMouseHoverEvent(index)}
                  onMouseLeave={() => setIsMouseHover(false)}
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
      {datatitle ? (
        <TitleInform>
          <span>"{datatitle}"</span> 의 시세정보입니다.
        </TitleInform>
      ) : (
        <MinHeight>
          <span>시세를 알아보고 싶은 물품을 입력해주세요.</span>
        </MinHeight>
      )}
      <AlertPosition open={open}>
        <MMMAlert
          size={"md"}
          color={"warning"}
          severity={"warning"}
          MessageTitle={"No Product"}
          AlertMessage={"시세를 알 수 없는 상품입니다!"}
          open={open}
          setOpen={setOpen}
        />
      </AlertPosition>
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
  ${(props) =>
    props.isSelected &&
    css`
      background-color: aliceblue;
    `}
  &:hover {
    background-color: aliceblue;
  }
  // 글자색은 바뀐다.그러네! 어 됬다
`;

const SearchListResult = styled.div`
  ${flexCenter}
`;

const TitleInform = styled.div`
  height: 30px;
  ${flexCenter}
  margin-bottom: 20px;
  & > span {
    font-weight: 700;
    color: burlywood;
  }
`;
//

const MinHeight = styled.div`
  min-height: 500px;
  ${flexCenter}
`;

const AlertPosition = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  z-index: ${({ open }) => (open ? 100 : -100)};
  position: absolute;
  top: 8%;
`;
