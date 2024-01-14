import { useNavigate } from "react-router-dom";

const UseNavigation = () => {
  const navigate = useNavigate();

  const goToDetailPage = (id) => {
    navigate(`/MMM/products/detail/${id}`);
  };

  const goToMyPage = () => {
    navigate(`/MMM/my-page`);
  };

  const goToChatPage = () => {
    navigate("/MMM/chat");
  };

  const goToProductsListPage = (saleStatus) => {
    navigate(`/MMM/products/${saleStatus}`);
  };

  const goToMainPage = () => {
    navigate(`/MMM/home`);
  };

  const goToPriceCheckPage = () => {
    navigate("/MMM/pricecheckpage");
  };

  const goToMarketPricePage = (data) => {
    navigate(`/MMM/pricecheckpage/${data}`);
  };

  const goToRegisterProductPage = () => {
    navigate("/MMM/my-page/registerProductForm");
  };

  const goToSearchItemPage = (inputValue) => {
    navigate(`products/search/${inputValue}`);
  };

  const goToSignIn = () => {
    navigate("/sign-in");
  };

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  const goToLoginPage = () => {
    navigate("/");
  };

  const goToEditPost = (dataId) => {
    navigate(`/MMM/edit-post/${dataId}`);
  };

  return {
    goToDetailPage,
    goToMyPage,
    goToChatPage,
    goToProductsListPage,
    goToMainPage,
    goToPriceCheckPage,
    goToMarketPricePage,
    goToRegisterProductPage,
    goToSearchItemPage,
    goToSignIn,
    goToSignUp,
    goToLoginPage,
    goToEditPost,
  };
};

export default UseNavigation;
