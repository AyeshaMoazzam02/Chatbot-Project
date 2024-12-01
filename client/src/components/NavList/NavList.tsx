import "@/App.scss";

interface NavItem {
  label: string;
  href: string;
  icon?: JSX.Element;
}

interface NavListProps {
  items: NavItem[];
}

const NavList: React.FC<NavListProps> = ({ items }) => {
  return (
    <div className="nav-list">
      {items.map((item, index) => (
        <a className="nav-list-items" key={index} href={item.href}>
          {item.label}
          {item.icon && <span style={{ marginLeft: "8px" }}>{item.icon}</span>}
        </a>
      ))}
    </div>
  );
};

export default NavList;
