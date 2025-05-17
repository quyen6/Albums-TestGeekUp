import { Layout, theme } from "antd";

const { Content } = Layout;

function ContentLayout({ children, styles, collapsed }) {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        padding: "24px",
        marginLeft: collapsed ? 80 : 200,
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </Content>
  );
}

export default ContentLayout;
