import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Navigation } from "shared/ui";
import { Dashboard, LoginPage } from "pages";
import {
    WineryCreatePage,
    WineryEditPage,
    WineriesViewPage,
} from "pages/Wineries";
import { WaysViewPage, WayCreatePage, WayEditPage } from "pages/Ways";

import { Protected } from "./Protected";
import {
    HorecaCreatePage,
    HorecaEditPage,
    HorecasViewPage,
} from "pages/Horecas";
import {
    AttractionCreatePage,
    AttractionEditPage,
    AttractionsViewPage,
} from "pages/Attractions";
import {
    AgenciesViewPage,
    AgencyCreatePage,
    AgencyEditPage,
} from "pages/Agencies";
import { EventCreatePage, EventEditPage, EventsViewPage } from "pages/Events";
import { GrapeCreatePage, GrapeEditPage, GrapesViewPage } from "pages/Grapes";
import {
    ReviewCreatePage,
    ReviewEditPage,
    ReviewsViewPage,
} from "pages/Reviews";
import { CountriesViewPage, CountryEditPage } from "pages/Countries";
import { SettingsEditPage } from "pages/Settings";
import {
    ArticleCreatePage,
    ArticleEditPage,
    ArticlesViewPage,
} from "pages/Articles";
import {
    SeodataCreatePage,
    SeodataEditPage,
    SeodatasViewPage,
} from "pages/Seodatas";
import { AdminCreatePage, AdminEditPage, AdminsViewPage } from "pages/Admins";
import { BlackSeaEditPage } from "pages/BlackSea";
import {
    RegionsCreatePage,
    RegionsEditPage,
    RegionsViewPage,
} from "pages/Regions";

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Navigation />}>
                <Route
                    path="/"
                    element={
                        <Protected>
                            <Navigate to="/wineries" replace />
                        </Protected>
                    }
                />
                <Route
                    path="wineries"
                    element={
                        <Protected>
                            <WineriesViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="wineries/create"
                    element={
                        <Protected>
                            <WineryCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="wineries/:id"
                    element={
                        <Protected>
                            <WineryEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="ways"
                    element={
                        <Protected>
                            <WaysViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="ways/create"
                    element={
                        <Protected>
                            <WayCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="ways/:id"
                    element={
                        <Protected>
                            <WayEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="horecas"
                    element={
                        <Protected>
                            <HorecasViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="horecas/create"
                    element={
                        <Protected>
                            <HorecaCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="horecas/:id"
                    element={
                        <Protected>
                            <HorecaEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="attractions"
                    element={
                        <Protected>
                            <AttractionsViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="attractions/create"
                    element={
                        <Protected>
                            <AttractionCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="attractions/:id"
                    element={
                        <Protected>
                            <AttractionEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="agencies"
                    element={
                        <Protected>
                            <AgenciesViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="agencies/create"
                    element={
                        <Protected>
                            <AgencyCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="agencies/:id"
                    element={
                        <Protected>
                            <AgencyEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="events"
                    element={
                        <Protected>
                            <EventsViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="events/create"
                    element={
                        <Protected>
                            <EventCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="events/:id"
                    element={
                        <Protected>
                            <EventEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="articles"
                    element={
                        <Protected>
                            <ArticlesViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="articles/create"
                    element={
                        <Protected>
                            <ArticleCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="articles/:id"
                    element={
                        <Protected>
                            <ArticleEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="regions"
                    element={
                        <Protected>
                            <RegionsViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="regions/create"
                    element={
                        <Protected>
                            <RegionsCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="regions/:id"
                    element={
                        <Protected>
                            <RegionsEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="seodatas"
                    element={
                        <Protected>
                            <SeodatasViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="seodatas/create"
                    element={
                        <Protected>
                            <SeodataCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="seodatas/:id"
                    element={
                        <Protected>
                            <SeodataEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="grapeVarieties"
                    element={
                        <Protected>
                            <GrapesViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="grapeVarieties/create"
                    element={
                        <Protected>
                            <GrapeCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="grapeVarieties/:id"
                    element={
                        <Protected>
                            <GrapeEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="reviews"
                    element={
                        <Protected>
                            <ReviewsViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="reviews/create"
                    element={
                        <Protected>
                            <ReviewCreatePage />
                        </Protected>
                    }
                />
                <Route
                    path="reviews/:id"
                    element={
                        <Protected>
                            <ReviewEditPage />
                        </Protected>
                    }
                />

                <Route
                    path="settings/:id"
                    element={
                        <Protected>
                            <SettingsEditPage />
                        </Protected>
                    }
                />

                <Route
                    path="countries"
                    element={
                        <Protected>
                            <CountriesViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="countries/:id"
                    element={
                        <Protected>
                            <CountryEditPage />
                        </Protected>
                    }
                />

                <Route
                    path="admins"
                    element={
                        <Protected>
                            <AdminsViewPage />
                        </Protected>
                    }
                />
                <Route
                    path="admins/:id"
                    element={
                        <Protected>
                            <AdminEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="black-sea"
                    element={
                        <Protected>
                            <BlackSeaEditPage />
                        </Protected>
                    }
                />
                <Route
                    path="admins/create"
                    element={
                        <Protected>
                            <AdminCreatePage />
                        </Protected>
                    }
                />
            </Route>
        </Routes>
    );
};
