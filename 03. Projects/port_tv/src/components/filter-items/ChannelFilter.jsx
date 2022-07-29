import classes from "./ChannelFilter.module.css";

const ChannelFilter = ({ categories, onSelectChange }) => {
    return (
        <select
            className={classes.select}
            name="selectList"
            id="selectList"
            onChange={(e) => onSelectChange(e)}
          >
            <option value="0">Összes csatorna</option>
            {categories.length > 0 &&
              categories.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
          </select>
    )
};

export default ChannelFilter;