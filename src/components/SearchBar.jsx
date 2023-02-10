import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = () => {
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search or start a new chat..."
      />
    </div>
  );
};
