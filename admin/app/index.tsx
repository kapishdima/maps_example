import React from "react";

import { AppRouter } from "pages";
import { withProviders } from "./providers";

import "./index.scss";

const App: React.FC = () => {
    return <AppRouter />;
};

export default React.memo(withProviders(App));
