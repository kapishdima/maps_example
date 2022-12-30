import compose from "app/compose";

import { withErrors } from "./with-errors";
import { withAxios } from "./with-axios";
import { withQuery } from "./with-query";
import { withRouter } from "./with-router";
import { withTheme } from "./with-theme";
import { withAuth } from "./with-auth";
import { withCommonData } from "./with-common-data";

export const withProviders = compose(
    withErrors,
    withAxios,
    withTheme,
    withQuery,
    withRouter,
    withAuth,
    withCommonData
);
