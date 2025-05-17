import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { Image, Spin } from "antd";

import classNames from "classnames/bind";
import styles from "./AlbumDetail.module.scss";
import { AlbumsIcon } from "../../assets/Icons";
import DetailLayout from "../../layout/DetailLayout";

const cx = classNames.bind(styles);

const AlbumDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [album, setAlbum] = useState(location.state?.album || null);
  const [user, setUser] = useState(location.state?.user || null);

  const [isImagesLoading, setIsImagesLoading] = useState(true);

  // Fetch album
  useEffect(() => {
    if (!album) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAlbum(data);
        })
        .catch(() => {
          throw new Error("Album not found");
        });
    }
  }, [album, id, navigate]);

  // Fetch user nếu chưa có
  useEffect(() => {
    if (album && !user) {
      fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          throw new Error("User not found");
        });
    }
  }, [album, user]);

  if (!album) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin />
      </div>
    );
  }

  return (
    <DetailLayout
      icon={<AlbumsIcon />}
      breadcrumbLink="/albums?pageSize=20&current=1"
      breadcrumbText="Albums"
      breadcrumbCurrent={`Album`}
      backTitle="Show Album"
      user={user}
    >
      <div className={cx("album-detail")}>
        <h4 className={cx("album-detail-header")}>{album?.title}</h4>

        <div
          className={cx("album-detail-content")}
          style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
        >
          <Image.PreviewGroup>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {isImagesLoading && (
                <div
                  style={{ textAlign: "center", width: "100%", marginTop: 20 }}
                >
                  <Spin />
                </div>
              )}
              {Array.from({ length: 10 }).map((_, index) => {
                const size = 150;
                const imageUrl = `https://dummyjson.com/image/600?random=${index}`;
                const thumbUrl = `https://dummyjson.com/image/${size}?random=${index}`;

                return (
                  <Image
                    key={index}
                    width={150}
                    height={150}
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    src={thumbUrl}
                    preview={{
                      src: imageUrl,
                    }}
                    alt={`Album image ${index + 1}`}
                    onLoad={() => {
                      if (isImagesLoading) setIsImagesLoading(false);
                    }}
                  />
                );
              })}
            </div>
          </Image.PreviewGroup>
        </div>
      </div>
    </DetailLayout>
  );
};

export default AlbumDetail;
