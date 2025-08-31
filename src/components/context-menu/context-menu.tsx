import { Menu, type MenuRootProps } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type ContextMenuItem = {
	value: string;
	label: string;
	icon?: ReactNode;
	separator?: boolean;
};

type Props = Pick<MenuRootProps, "onSelect" | "children"> & {
	items: ContextMenuItem[];
};

export const ContextMenu = ({ children, items, onSelect }: Props) => {
	return (
		<Menu.Root onSelect={onSelect}>
			<Menu.ContextTrigger className={styles["context-trigger"]}>
				{children}
			</Menu.ContextTrigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content className={styles["context-menu"]}>
						{items.map((item) =>
							item.separator ? (
								<Menu.Separator
									key={item.value}
									className={styles["context-menu-separator"]}
								/>
							) : (
								<Menu.Item
									key={item.value}
									value={item.value}
									className={styles["context-menu-item"]}
								>
									{item.icon && (
										<span className={styles["context-menu-icon"]}>
											{item.icon}
										</span>
									)}
									{item.label}
								</Menu.Item>
							),
						)}
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
