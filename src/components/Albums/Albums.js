import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import usePaginationParams from "../../hook/usePaginationParams";
import "./pagination.css";

const columns = (usersMap, handleShowAlbum, navigate) => [
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
    title: "User",
    dataIndex: "userId",
    key: "userId",
    render: (userId) => {
      //
      const user = usersMap[userId];
      const name = user?.name || "Unknown User";

      const avatar =
        user?.avatar ||
        `https://ui-avatars.com/api/?name=Unknown&background=random`;

      return (
        // Display user avatar and name
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            color: "#0958d9",
          }}
          onClick={() => navigate(`/users/${userId}`)}
        >
          <img
            src={avatar}
            alt={name}
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div>
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleShowAlbum(record.id)}
        >
          Show
        </Button>
      </div>
    ),
  },
];

function Albums() {
  const [data, setData] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchAlbumsAndUsers = async () => {
      const [albumsRes, usersRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/albums"),
        fetch("https://jsonplaceholder.typicode.com/users"),
      ]);

      const albums = await albumsRes.json();
      const users = await usersRes.json();

      const map = {};
      users.forEach((user) => {
        map[user.id] = {
          name: user.name,
          email: user.email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=random`,
        };
      });

      setUsersMap(map);
      setData(albums);
      setLoading(false);
    };

    fetchAlbumsAndUsers();
  }, []);

  // config show album when click Show button
  const handleShowAlbum = (albumId) => {
    const album = data.find((album) => album.id === albumId);
    const user = usersMap[album?.userId];
    navigate(`/albums/${albumId}`, {
      state: {
        user: user, // state: user to AlbumDetail
        album: album, // state: album to AlbumDetail
      },
    });
  };

  // pagination
  const { currentPage, pageSize, handleTableChange } = usePaginationParams();
  return (
    <Table
      columns={columns(usersMap, handleShowAlbum, navigate)}
      dataSource={data}
      style={{ minWidth: "100%" }}
      loading={loading}
      pagination={{
        pageSize: pageSize,
        current: currentPage,
        total: data.length,
        showSizeChanger: true,
        className: "custom-ant-pagination",
      }}
      onChange={handleTableChange}
      rowKey="id"
    />
  );
}

export default Albums;
