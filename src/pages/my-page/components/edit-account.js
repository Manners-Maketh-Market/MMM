import { MockUserData } from "__mock__/faker-data";
import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexAlignCenter } from "styles/common.style";

const EditAccountInfo = ({ user }) => {
  return (
    <Wrapper>
      <Title>개인정보 수정</Title>
      <Contents>
        <Profile>
          <Image src={user[0].profileImg} />
          <EditButton />
        </Profile>
        <MMMInput
          label={"닉네임"}
          size={"editInfo"}
          placeholder={user[0].nickName}
        />
        <MMMInput
          label={"이메일 주소"}
          size={"editInfo"}
          placeholder={user[0].email}
        />
        <MMMInput
          label={"핸드폰 번호"}
          size={"editInfo"}
          placeholder={user[0].phoneNumber}
        />
        <MMMInput
          label={"우리 동네"}
          size={"editInfo"}
          placeholder={user[0].location}
        />
        <MMMButton size={"small"}>변경사항 저장</MMMButton>
      </Contents>
    </Wrapper>
  );
};
export default EditAccountInfo;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 80px;
  display: flex;
  align-items: flex-start;
`;
const Title = styled.h1`
  padding: 80px 0;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
`;
const Contents = styled.form`
  ${flexAlignCenter}
  flex-direction: column;
  margin-top: 28%;
  margin-left: 40px;

  & > input {
    width: 780px;
  }

  & > button {
    margin: 60px 0 100px;
  }
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 80px;
  position: absolute;
  top: 60%;
  left: 30%;

  & > input {
    width: 540px;
  }
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.primary["blue"]};
`;
const EditButton = styled.button`
  position: absolute;
  right: 0;
  bottom: -5%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url("../../assets/icon/pencil.png");
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(138, 138, 138, 0.7);
  transition: all 0.5s;
  z-index: 10;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.gray[400]};
  }
`;
