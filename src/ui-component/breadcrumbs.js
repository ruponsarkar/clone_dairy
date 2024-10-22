import React from 'react';
import { styled, emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

// const Breadcrumb = ({label, home}) => {
const Breadcrumb = ({labels}) => {
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">

    {labels && labels.map((e)=>(
        <>
        <StyledBreadcrumb
                component="a"
                href={e.href}
                label={e.label}
                icon={e?.icon}
              />
              {/* <StyledBreadcrumb label={e.label1} /> */}
        </>
    ))}



              {/* <StyledBreadcrumb
                component="a"
                href="/#/admin/dashboard"
                label={props.home}
                icon={<HomeIcon fontSize="small" />} */}
              {/* /> */}
              {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
              {/* <StyledBreadcrumb label={props.label} />
              <StyledBreadcrumb label={props.label1} /> */}
            </Breadcrumbs>
        </>
  );
};

export default Breadcrumb;
