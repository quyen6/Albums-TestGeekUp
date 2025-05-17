import { Breadcrumb, Layout, theme } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./DetailLayout.module.scss";

const cx = classNames.bind(styles);

const { Content } = Layout;

function DetailLayout({
  icon,
  backTitle = "Back",
  breadcrumbLink = "/",
  breadcrumbText = "Items",

  user,
  children,
}) {
  const navigate = useNavigate();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content>
        {/* Breadcrumb */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className={cx("breadcrumb")}>
              {icon}
              <Link to={breadcrumbLink} style={{ display: "inline-flex" }}>
                {breadcrumbText}
              </Link>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Show</Breadcrumb.Item>
        </Breadcrumb>

        {/* Back */}
        <div className={cx("go-back")}>
          <div className={cx("go-back-main")}>
            <button className={cx("go-back-icon")} onClick={() => navigate(-1)}>
              <ArrowLeftOutlined style={{ fontSize: 16 }} />
            </button>
            <span className={cx("go-back-title")}>
              <p>{backTitle}</p>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={cx("show-detail")}>
          <div
            style={{
              paddingTop: 12,
              minHeight: 360,
              background: "#f5f5f5",
              borderRadius: borderRadiusLG,
            }}
          >
            <Content
              style={{ backgroundColor: "white", borderRadius: borderRadiusLG }}
            >
              <div style={{ padding: 24, minHeight: 360 }}>
                <div styles={{}}>
                  <div className={cx("content")}>
                    <div className={cx("card-user")}>
                      <div className={cx("card-user-avatar")}>
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                          )}&background=random`}
                          alt={user.name}
                          className={cx("avatar")}
                        />
                      </div>
                      <div className={cx("card-user-info")}>
                        {user && (
                          <h2 className={cx("card-user-name")}>{user.name}</h2>
                        )}
                        <a
                          href={`mailto:${user.email}`}
                          target="_blank"
                          style={{ color: "#0958d9" }}
                          rel="noopener noreferrer"
                        >
                          {user.email}
                        </a>
                      </div>
                    </div>
                    <div className={cx("space")}></div>
                    {children}
                  </div>
                </div>
              </div>
            </Content>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default DetailLayout;
