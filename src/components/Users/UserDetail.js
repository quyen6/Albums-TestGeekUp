import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { EyeOutlined } from "@ant-design/icons";
import { Button, Table, Spin } from "antd";

import DetailLayout from "../../layout/DetailLayout";
import { UsersIcon } from "../../assets/Icons";

import classNames from "classnames/bind";
import styles from "./UserDetail.module.scss";

const cx = classNames.bind(styles);

function UserDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(location.state?.user || null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user data when accessing directly from URL
  useEffect(() => {
    if (!user) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => navigate("/users"));
    }
  }, [user, id, navigate]);

  // Fetch data albums when have user data
  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setAlbums(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() =>
            navigate(`/albums/${record.id}`, {
              state: { user },
            })
          }
        >
          Show
        </Button>
      ),
    },
  ];

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin />
      </div>
    );
  }

  return (
    <DetailLayout
      icon={<UsersIcon />}
      breadcrumbLink="/users"
      breadcrumbText="Users"
      breadcrumbCurrent="User Detail"
      backTitle="Show User"
      user={user}
    >
      <div className={cx("user-detail")}>
        <h4 className={cx("user-detail-header")}>Albums</h4>
        <div className={cx("user-detail-content")}>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Spin />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={albums}
              rowKey="id"
              pagination={false}
            />
          )}
        </div>
      </div>
    </DetailLayout>
  );
}

export default UserDetail;
