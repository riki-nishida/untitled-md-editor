import type { ComponentProps } from "react";
import styles from "./styles.module.css";

type Props = ComponentProps<"button">;

export const IconButton = (props: Props) => {
	return <button type="button" className={styles["icon-button"]} {...props} />;
};
