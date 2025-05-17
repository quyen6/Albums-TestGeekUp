import { Layout } from "antd";
import { useState } from "react";
import Aside from "./layout/Aside/Aside";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ContentLayout from "./layout/ContentLayout";
import Users from "./components/Users/Users";
import UserDetail from "./components/Users/UserDetail";
import Albums from "./components/Albums/Albums";
import AlbumDetail from "./components/Albums/AlbumDetail";
const { Header } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Aside collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          {/* Header */}
          <Header
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0px 24px",
              height: 64,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          />

          {/* Main content */}
          <ContentLayout collapsed={collapsed}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/albums?pageSize=20&current=1" />}
              />
              <Route path="/albums" element={<Albums />} />
              <Route path="/users" element={<Users />} />
              <Route path="/albums/:albumId" element={<AlbumDetail />} />
              <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
          </ContentLayout>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;
