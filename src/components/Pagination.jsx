import PropTypes from "prop-types";

const Pagination = ({ handlePrev, handleNext, pageNumber }) => {
  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center">
      <div
        className="px-8 hover:cursor-pointer hover:scale-110 duration:300"
        onClick={handlePrev}
      >
        {pageNumber > 1 ? (
          <i className="fa-solid fa-angles-left"></i>
        ) : (
          <i className="fa-solid fa-minus"></i>
        )}
      </div>
      <div className="font-bold">{pageNumber}</div>
      <div
        className="px-8 hover:cursor-pointer hover:scale-110 duration:300"
        onClick={handleNext}
      >
        <i className="fa-solid fa-angles-right"></i>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default Pagination;
