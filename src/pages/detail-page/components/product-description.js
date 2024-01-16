import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Api } from "apis";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const Description = ({ product, userInfoData, dataId }) => {
  const [moreContent, _] = useState(true);
  const navigate = useNavigate();

  const { mutateAsync: deleteMyPost } = useMutation((id) =>
    Api.deleteMyPost(id)
  );

  // delete & edit post
  const onDeletePost = async () => {
    await deleteMyPost(dataId);
    alert("게시글이 삭제되었습니다.");
    navigate("/MMM/home");
  };

  const onEditPost = () => {
    navigate(`/MMM/edit-post/${dataId}`);
  };

  return (
    <Container isMore={moreContent}>
      {product.User.nick_name === userInfoData.nick_name && (
        <ButtonWrapper>
          <button onClick={onEditPost}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={onDeletePost}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </ButtonWrapper>
      )}
      <span>상품정보</span>
      <p>{product.description}</p>
    </Container>
  );
};
export default Description;

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  border-top: 1px solid #e1e1e1;
  padding-top: 70px;
  min-height: 484px;

  ${(props) =>
    props.isMore &&
    css`
      min-height: 484px;
      max-height: 600px;
      overflow: hidden;
    `}

  & > span {
    font-size: 32px;
    font-weight: 600;
  }

  & > p {
    padding-top: 30px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    margin-top: 0;
    padding-top: 30px;
    min-height: 124px;
    & > span {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 5%;
  right: 0;

  & > button {
    ${flexCenter}
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    transition: all 0.4s;

    &:nth-of-type(2) {
      margin-left: 10px;
    }
    &:hover {
      background-color: #e3e3e3;
    }

    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;
