import { getUserInfoData } from "__mock__/msw-api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const UserInfo = () => {
  // userInfo data

  return (
    <Wrapper>
      <User>
        <Profile />
        <Text>
          <NickName>user_id_012</NickName>
          <Location>서울시 강남구 역삼동</Location>
        </Text>
      </User>
      <Manner>
        <Rate>
          <Celsius>
            <p>50.0</p>
            <img src="../../assets/icon/celsius.png" />
          </Celsius>
          <Indicator>
            <Ratio></Ratio>
          </Indicator>
        </Rate>
        <img src="../../assets/icon/smile.png" />
      </Manner>
    </Wrapper>
  );
};

export default UserInfo;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const User = styled.div`
  ${flexCenter}
  flex-direction: row;
`;
const Profile = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: navy; // temporary color
  background-position: center;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;
const NickName = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE["larger"]};
  color: ${({ theme }) => theme.COLORS["black"]};
  margin-bottom: 4px;
`;
const Location = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  color: ${({ theme }) => theme.COLORS.gray[400]};
`;
const Manner = styled.div`
  ${flexCenter}
  flex-direction: row;
  color: ${({ theme }) => theme.COLORS.primary["navy"]};

  & > img {
    margin-left: 12px;
  }
`;
const Rate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Indicator = styled.div`
  width: 140px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.gray[200]};
`;
const Ratio = styled.div`
  width: 50%; // 변경 필요: 매너온도가 일단 고정되어 있습니다.
  height: 8px;
  border-radius: 4px;
  background-color: navy;
  padding: 0;
`;
const Celsius = styled.div`
  display: flex;
  margin-bottom: 8px;

  & > p {
    font-size: ${({ theme }) => theme.FONT_SIZE["medium"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
    color: ${({ theme }) => theme.COLORS.primary["navy"]};
  }

  & > img {
    margin-left: 4px;
  }
`;
