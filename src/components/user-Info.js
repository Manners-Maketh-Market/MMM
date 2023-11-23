import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import MannerTemperature from "./manner-temperature";
import defaultProfile from "../images/defaultProfile.jpg";

const UserInfo = ({ user, temp }) => {
  return (
    <Wrapper>
      <User>
        <Profile src={user.profileUrl ? user.profileUrl : defaultProfile} />
        <Text>
          <NickName>{user.nickName}</NickName>
          {/* <Location>{user.region}</Location> */}
        </Text>
      </User>
      <MannerTemperature temp={temp} />
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
