import { ArrowLeftIcon, Button } from "evergreen-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

export const BackLink: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(-1)} appearance="minimal">
            <ArrowLeftIcon />
        </Button>
    );
};
