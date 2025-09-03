import { Menu as ArkMenu, type MenuRootProps } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type Item = {
	value: string;
	label: string;
	icon?: ReactNode;
	description?: string;
};

type Props = Pick<MenuRootProps, "children" | "onSelect"> & {
	items: Item[];
};

export const Menu = ({ children, items, onSelect }: Props) => {
	return (
		<ArkMenu.Root onSelect={onSelect}>
			<ArkMenu.Trigger className={styles.trigger}>{children}</ArkMenu.Trigger>
			<Portal>
				<ArkMenu.Positioner>
					<ArkMenu.Content className={styles.content}>
						<ArkMenu.ItemGroup>
							{items.map((item) => (
								<ArkMenu.Item
									key={item.value}
									value={item.value}
									className={styles.item}
								>
									{item.icon && (
										<span className={styles["item-icon"]}>{item.icon}</span>
									)}
									<div className={styles["item-content"]}>
										<span className={styles["item-label"]}>{item.label}</span>
										{item.description && (
											<span className={styles["item-description"]}>
												{item.description}
											</span>
										)}
									</div>
								</ArkMenu.Item>
							))}
						</ArkMenu.ItemGroup>
					</ArkMenu.Content>
				</ArkMenu.Positioner>
			</Portal>
		</ArkMenu.Root>
	);
};
