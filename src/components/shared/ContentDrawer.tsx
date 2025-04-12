import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDrawerStore } from "../../states/drawer-store";
export default function ContentDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleDrawer, isOpen } = useDrawerStore();

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="custom-drawer"
    >
      {children}
    </Drawer>
  );
}
