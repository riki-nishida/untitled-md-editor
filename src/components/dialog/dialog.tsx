import {
	Dialog as ArkDialog,
	type DialogRootProps,
} from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import styles from "./styles.module.css";

type Props = Pick<DialogRootProps, "open" | "onOpenChange" | "children"> & {
	title: string;
};

export const Dialog = ({ title, open, onOpenChange, children }: Props) => {
	return (
		<ArkDialog.Root open={open} onOpenChange={onOpenChange}>
			<Portal>
				<ArkDialog.Backdrop className={styles.backdrop} />
				<ArkDialog.Positioner className={styles.positioner}>
					<ArkDialog.Content className={styles.content}>
						<div className={styles.header}>
							<ArkDialog.Title className={styles.title}>
								{title}
							</ArkDialog.Title>
							<ArkDialog.CloseTrigger className={styles["close-btn"]}>
								<X size={16} />
							</ArkDialog.CloseTrigger>
						</div>
						<div className={styles.body}>{children}</div>
					</ArkDialog.Content>
				</ArkDialog.Positioner>
			</Portal>
		</ArkDialog.Root>
	);
};
