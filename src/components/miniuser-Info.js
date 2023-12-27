import { MockUserData } from "__mock__/faker-data";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import defaultProfile from "../images/defaultProfile.jpg";

const MiniUserInfo = ({ user }) => {
  return (
    <Wrapper>
      <User>
        <Profile src={user.profileUrl ? user.profileUrl : defaultProfile} />
        <Text>
          <NickName>{user.nickName}</NickName>
        </Text>
      </User>
    </Wrapper>
  );
};

export default MiniUserInfo;

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
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-position: center;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const NickName = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE["larger"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  color: ${({ theme }) => theme.COLORS.primary["navy"]};
  margin-bottom: 4px;
`;
