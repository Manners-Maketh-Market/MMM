import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import Sold from "./sold";
import Shared from "./shared";
import Purchased from "./purchased";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import useInputs from "hooks/use-inputs";
import { useMutation } from "react-query";
import MMMButton from "components/button";

const AccountBook = () => {
  const { data: myPageData } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PAGE_DATA],
    () => Api.getMyPageData()
  );

  const { mutateAsync } = useMutation((Data) =>
    Api.getMyHousekeepingBook(Data)
  );

  const { data: getMyHousekeepingBook } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_HOUSEKEEPING_BOOK],
    () => Api.getMyHousekeepingBook(1, UserType.SELLER, firstDay, lastDay)
  );

  const UserType = {
    SELLER: "seller",
    BUYER: "buyer",
  };
  Object.freeze(UserType);
  console.log(UserType.BUYER);

  const today = new Date();

  function formattedDate(today, dash = "-") {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return [year, month, date].join(dash);
  }
  const firstDay = formattedDate(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const lastDay = formattedDate(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  );

  console.log("firstDay", firstDay);

  const [{ category }, onChangeInputs] = useInputs({
    category: "",
    // 날짜추가
  });

  const onSelectCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", e.target.category.value);

    try {
      await mutateAsync(formData);
      alert("선택이 완료되었습니다.");
    } catch (error) {
      error && alert("선택이 되지않았습니다.");
    }
  };

  return (
    // getMyHousekeepingBook &&
    myPageData && (
      <Wrapper>
        <Title>{myPageData.User.nickName}님의 10월 가계부 입니다.</Title>
        <form onSubmit={onSelectCategory}>
          <Box>
            <select name="category">
              <option value="태그를 선택해주세요">태그를 선택해주세요</option>
              <option value="UserType.SELLER">판매목록</option>
              <option value="UserType.BUYER">구매목록</option>
            </select>
          </Box>
          {/* <Box>
          <select name="start">
            <option value="태그를 선택해주세요">태그를 선택해주세요</option>
            <option value={Number("0")}>시작일</option>
            <option value={Number("1")}>종료일</option>
          </select>
        </Box> */}
          <MMMButton
            shape={"shape"}
            size={"full"}
            variant={"secondary"}
            type="submit"
          >
            선택
          </MMMButton>
        </form>
        <Contents>
          <Sold
            // page={1}
            // category={getMyHousekeepingBook.userCategory1}
            user={myPageData.User}
          />
          <Purchased
          // page={1} /* category={getMyHousekeepingBook.userCategory2} */
          />
          {/* <Shared /> */}
        </Contents>
      </Wrapper>
    )
  );
};
export default AccountBook;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 80px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    margin-left: 0;
    ${flexCenter}
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    margin-left: 0;
    ${flexCenter}
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    margin-left: 0;
    ${flexCenter}
  }
`;
const Title = styled.h1`
  padding: 80px 0 50px;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    padding: 50px 0;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    padding: 60px 0;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    padding: 60px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  }
`;
const Contents = styled.form`
  ${flexAlignCenter}
  flex-direction: column;
  margin-left: 40px;
  & > input {
    width: 780px;
  }
  & > button {
    margin: 60px 0 100px;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & > select {
    width: 100px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    padding: 0 10px;
  }
`;
