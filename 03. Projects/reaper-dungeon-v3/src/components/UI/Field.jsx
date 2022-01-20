import classes from "./Field.module.scss";

const Field = (props) => {
    return <div className={`${props.className} ${classes.field}`}>{props.children}</div>;
};

export default Field;