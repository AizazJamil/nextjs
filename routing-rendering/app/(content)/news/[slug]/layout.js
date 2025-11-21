const NewsDetailsLayout = ({ children, modal }) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default NewsDetailsLayout;
