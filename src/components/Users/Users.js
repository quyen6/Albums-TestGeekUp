import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const columns = (handleShowUser, navigate) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (_, record) => (
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          record.name
        )}&background=random`}
        alt={record.name}
        style={{ width: 30, height: 30, borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => (
      <a
        href={`mailto:${email}`}
        target="_blank"
        style={{ color: "#0958d9" }}
        rel="noopener noreferrer"
      >
        {email}
      </a>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (phone) => (
      <a
        href={`tel:${phone}`}
        target="_blank"
        style={{ color: "#0958d9" }}
        rel="noopener noreferrer"
      >
        {phone}
      </a>
    ),
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (url) => (
      <a
        href={`http://${url}`}
        target="_blank"
        style={{ color: "#0958d9" }}
        rel="noopener noreferrer"
      >
        {url}
      </a>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <div>
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleShowUser(record)}
        >
          Show
        </Button>
      </div>
    ),
  },
];

function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetch users data from API
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // config show user when click Show button
  const handleShowUser = (user) => {
    navigate(`/users/${user.id}`, { state: { user } }); // state : user to UserDetail
  };

  return (
    <>
      <div
        style={{
          fontSize: 20,
          backgroundColor: "#f5f5f5 ",
        }}
      >
        <p style={{ fontWeight: 500, margin: "4px 0" }}>Users</p>
        <div
          style={{
            paddingTop: 12,
            minHeight: 360,
            background: "#f5f5f5",
            borderRadius: 8,
          }}
        >
          <Content style={{ backgroundColor: "white", borderRadius: 8 }}>
            <Table
              columns={columns(handleShowUser, navigate)}
              dataSource={data}
              rowKey="id"
              loading={loading}
              pagination={false}
            />
          </Content>
        </div>
      </div>
    </>
  );
}

export default Users;
