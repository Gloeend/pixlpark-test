import "./styles/_reset.css";
import "./styles/index.css";
import {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import "@splidejs/react-splide/css";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Layout} from "antd";

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

const Home = lazy(() => import("@pages/home/home.tsx"));
const Item = lazy(() => import("@pages/item/item.tsx"));
const { Header, Content } = Layout;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
        <BrowserRouter>
            <Layout>
                <Header>
                    <Link to="/">Home</Link>
                </Header>
                <Content>
                    <Suspense fallback={<div>loading...</div>}>
                        <Routes>
                            <Route path="/" Component={Home} />
                            <Route path="/item/:id" Component={Item} />
                        </Routes>
                    </Suspense>
                </Content>
            </Layout>
        </BrowserRouter>
)