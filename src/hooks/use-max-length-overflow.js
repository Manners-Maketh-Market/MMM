const useMaxLength = () => {
  const MAX_TITLE_LENGTH = 10;
  const MAX_OVERVIEW_LENGTH = 80;

  const skipTitleView = (title) => {
    if (title.length > MAX_TITLE_LENGTH) {
      return title.substring(0, MAX_TITLE_LENGTH) + "...";
    }
    return title;
  };
  const skipOverView = (overview) => {
    if (overview.length > MAX_OVERVIEW_LENGTH) {
      return overview.substring(0, MAX_OVERVIEW_LENGTH) + "...";
    }
    return overview;
  };

  return { skipTitleView, skipOverView };
};

export default useMaxLength;
